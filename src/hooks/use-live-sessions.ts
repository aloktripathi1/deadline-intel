import { useState, useCallback } from 'react';
import { COURSE_CALENDAR_IDS } from '@/data/course-calendars';

export interface LiveSession {
  id: string;
  title: string;
  start: string;    // ISO datetime or YYYY-MM-DD (all-day)
  end?: string;
  description?: string;
  location?: string;
  calendarName?: string;
  isAllDay?: boolean;
}

export type SyncStatus = 'idle' | 'loading' | 'success' | 'error';

const STORAGE_KEY = 'deadline-intel-live-sessions';
const SYNC_KEY = 'deadline-intel-sync-status';

// ── ICS parser ────────────────────────────────────────────────────────────────
export function parseICS(content: string): { sessions: LiveSession[]; calendarName: string } {
  // Unfold line continuations (RFC 5545 §3.1)
  const unfolded = content.replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '');
  const lines = unfolded.split(/\r\n|\r|\n/);

  let calendarName = '';
  let inEvent = false;
  let cur: Record<string, string> = {};
  const sessions: LiveSession[] = [];

  const unescape = (s: string) =>
    s.replace(/\\n/g, '\n').replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\\\/g, '\\');

  const parseDate = (v: string): string => {
    const clean = v.replace('Z', '');
    // Date-only: 20260306
    if (clean.length === 8) {
      return `${clean.slice(0, 4)}-${clean.slice(4, 6)}-${clean.slice(6, 8)}`;
    }
    // Date-time: 20260306T140000[Z]
    const yr = clean.slice(0, 4), mo = clean.slice(4, 6), dy = clean.slice(6, 8);
    const hr = clean.slice(9, 11) || '00', mi = clean.slice(11, 13) || '00';
    if (v.endsWith('Z')) {
      return new Date(`${yr}-${mo}-${dy}T${hr}:${mi}:00Z`).toISOString();
    }
    return `${yr}-${mo}-${dy}T${hr}:${mi}`;
  };

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      inEvent = true;
      cur = {};
    } else if (line === 'END:VEVENT') {
      inEvent = false;
      const dtRaw = cur['DTSTART'];
      if (!dtRaw || !cur['SUMMARY']) continue;
      sessions.push({
        id: cur['UID'] ?? `ls-${sessions.length}-${Date.now()}`,
        title: unescape(cur['SUMMARY']),
        start: parseDate(dtRaw),
        end: cur['DTEND'] ? parseDate(cur['DTEND']) : undefined,
        description: cur['DESCRIPTION'] ? unescape(cur['DESCRIPTION']) : undefined,
        location: cur['LOCATION'] ? unescape(cur['LOCATION']) : undefined,
        calendarName: calendarName || undefined,
        isAllDay: dtRaw.length === 8,
      });
    } else if (inEvent) {
      const colonIdx = line.indexOf(':');
      if (colonIdx < 0) continue;
      const rawKey = line.slice(0, colonIdx);
      const val = line.slice(colonIdx + 1);
      // Strip TZID / VALUE params from property name
      const key = rawKey.includes(';') ? rawKey.slice(0, rawKey.indexOf(';')) : rawKey;
      if (!(key in cur)) cur[key] = val; // first occurrence wins
    } else if (line.startsWith('X-WR-CALNAME:')) {
      calendarName = line.slice(13);
    }
  }

  return { sessions, calendarName };
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useLiveSessions() {
  const [sessions, setSessions] = useState<LiveSession[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [syncStatuses, setSyncStatuses] = useState<Record<string, SyncStatus>>(() => {
    try {
      const raw = localStorage.getItem(SYNC_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const importSessions = useCallback((newSessions: LiveSession[]) => {
    setSessions(prev => {
      const existingIds = new Set(prev.map(s => s.id));
      const toAdd = newSessions.filter(s => !existingIds.has(s.id));
      const merged = [...prev, ...toAdd].sort((a, b) => a.start.localeCompare(b.start));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    });
  }, []);

  /** Fetch a single course calendar via the /api/ics proxy */
  const syncCourse = useCallback(async (courseId: string): Promise<{ added: number } | { error: string }> => {
    const calId = COURSE_CALENDAR_IDS[courseId];
    if (!calId) return { error: 'No calendar linked for this course' };

    setSyncStatuses(prev => {
      const next = { ...prev, [courseId]: 'loading' as SyncStatus };
      localStorage.setItem(SYNC_KEY, JSON.stringify(next));
      return next;
    });

    try {
      const res = await fetch(`/api/ics?calId=${encodeURIComponent(calId)}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      const icsText = await res.text();
      const { sessions: fetched } = parseICS(icsText);

      let added = 0;
      setSessions(prev => {
        const existingIds = new Set(prev.map(s => s.id));
        const toAdd = fetched.filter(s => !existingIds.has(s.id));
        added = toAdd.length;
        const merged = [...prev, ...toAdd].sort((a, b) => a.start.localeCompare(b.start));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return merged;
      });

      setSyncStatuses(prev => {
        const next = { ...prev, [courseId]: 'success' as SyncStatus };
        localStorage.setItem(SYNC_KEY, JSON.stringify(next));
        return next;
      });
      return { added };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setSyncStatuses(prev => {
        const next = { ...prev, [courseId]: 'error' as SyncStatus };
        localStorage.setItem(SYNC_KEY, JSON.stringify(next));
        return next;
      });
      return { error: msg };
    }
  }, []);

  /** Sync all provided courses sequentially */
  const syncAllCourses = useCallback(async (courseIds: string[]) => {
    const supported = courseIds.filter(id => !!COURSE_CALENDAR_IDS[id]);
    for (const id of supported) {
      await syncCourse(id);
    }
  }, [syncCourse]);

  const clearSessions = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SYNC_KEY);
    setSessions([]);
    setSyncStatuses({});
  }, []);

  return { sessions, syncStatuses, importSessions, syncCourse, syncAllCourses, clearSessions };
}
