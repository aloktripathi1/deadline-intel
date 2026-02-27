import { useState, useCallback, useMemo } from 'react';
import { ALL_DEADLINES } from '@/data/deadlines';
import { DeadlineItem, DeadlineState, getDaysLeft, getUrgencyZone, Subject, COURSE_CATALOG } from '@/types/deadline';

const STORAGE_KEY = 'deadline-intel-state';

// Default: MLP, DL_GENAI, TDS (original 3)
const DEFAULT_COURSES: Subject[] = [];

function loadState(): DeadlineState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...parsed,
        selectedCourses: Array.isArray(parsed.selectedCourses) ? parsed.selectedCourses : DEFAULT_COURSES,
        hasConfiguredCourses: parsed.hasConfiguredCourses === true,
      };
    }
  } catch {}
  return { completedIds: [], streak: 0, lastCompletionDate: null, theme: 'dark', selectedCourses: DEFAULT_COURSES, hasConfiguredCourses: false };
}

function saveState(state: DeadlineState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useDeadlines() {
  const [state, setState] = useState<DeadlineState>(loadState);

  const toggleComplete = useCallback((id: string) => {
    setState((prev) => {
      const isCompleted = prev.completedIds.includes(id);
      const completedIds = isCompleted
        ? prev.completedIds.filter((cid) => cid !== id)
        : [...prev.completedIds, id];
      const today = new Date().toISOString().split('T')[0];
      const newState: DeadlineState = {
        ...prev,
        completedIds,
        lastCompletionDate: isCompleted ? prev.lastCompletionDate : today,
        streak: isCompleted ? prev.streak : (prev.lastCompletionDate === today ? prev.streak : prev.streak + 1),
      };
      saveState(newState);
      return newState;
    });
  }, []);

  const resetData = useCallback(() => {
    const newState: DeadlineState = { completedIds: [], streak: 0, lastCompletionDate: null, theme: state.theme, selectedCourses: state.selectedCourses, hasConfiguredCourses: state.hasConfiguredCourses };
    saveState(newState);
    setState(newState);
  }, [state.theme, state.selectedCourses, state.hasConfiguredCourses]);

  const setTheme = useCallback((theme: 'dark' | 'light') => {
    setState((prev) => {
      const newState = { ...prev, theme };
      saveState(newState);
      return newState;
    });
  }, []);

  const setSelectedCourses = useCallback((courses: Subject[]) => {
    setState((prev) => {
      const newState = { ...prev, selectedCourses: courses, hasConfiguredCourses: true };
      saveState(newState);
      return newState;
    });
  }, []);

  // Filter deadlines: show ALL courses for first-time users, otherwise selected courses
  const selectedCourses = Array.isArray(state.selectedCourses) ? state.selectedCourses : DEFAULT_COURSES;
  const hasConfiguredCourses = state.hasConfiguredCourses === true;

  const filteredDeadlines = useMemo(() => {
    if (!hasConfiguredCourses) return []; // Show nothing until user picks courses
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return ALL_DEADLINES.filter(item => {
      if (item.subject !== 'ALL' && !selectedCourses.includes(item.subject as Subject)) return false;
      return new Date(item.date) >= today; // hide past deadlines
    });
  }, [selectedCourses, hasConfiguredCourses]);

  const items = useMemo(() => {
    return filteredDeadlines.map((item) => ({
      ...item,
      completed: state.completedIds.includes(item.id),
      daysLeft: getDaysLeft(item.date),
      urgency: getUrgencyZone(getDaysLeft(item.date)),
    }));
  }, [state.completedIds, filteredDeadlines]);

  const pending = useMemo(() => items.filter((i) => !i.completed), [items]);
  const completed = useMemo(() => items.filter((i) => i.completed), [items]);

  const nextCritical = useMemo(() => {
    return pending
      .filter((i) => i.daysLeft >= 0)
      .sort((a, b) => a.daysLeft - b.daysLeft || a.priority - b.priority)[0] || null;
  }, [pending]);

  const redZone = useMemo(() => pending.filter((i) => i.urgency === 'red').sort((a, b) => a.daysLeft - b.daysLeft), [pending]);
  const orangeZone = useMemo(() => pending.filter((i) => i.urgency === 'orange').sort((a, b) => a.daysLeft - b.daysLeft), [pending]);
  const overdue = useMemo(() => pending.filter((i) => i.urgency === 'overdue').sort((a, b) => a.daysLeft - b.daysLeft), [pending]);
  const upcoming7 = useMemo(() => pending.filter((i) => i.daysLeft >= 0 && i.daysLeft <= 7).sort((a, b) => a.daysLeft - b.daysLeft), [pending]);

  const todayDeadlines = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return items.filter((i) => i.date === today).sort((a, b) => a.priority - b.priority);
  }, [items]);

  const completedThisWeek = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    return completed.filter((i) => new Date(i.date) >= startOfWeek).length;
  }, [completed]);

  const completionRate = useMemo(() => {
    const pastItems = items.filter((i) => i.daysLeft < 0 || i.completed);
    if (pastItems.length === 0) return 100;
    const doneCount = pastItems.filter((i) => i.completed).length;
    return Math.round((doneCount / pastItems.length) * 100);
  }, [items]);

  const atRisk = useMemo(() => {
    return pending.filter((i) => i.daysLeft >= 0 && i.daysLeft <= 7).length >= 3;
  }, [pending]);

  const getSubjectItems = useCallback((subject: Subject) => {
    return items.filter((i) => i.subject === subject || i.subject === 'ALL');
  }, [items]);

  return {
    items,
    pending,
    completed,
    nextCritical,
    redZone,
    orangeZone,
    overdue,
    upcoming7,
    todayDeadlines,
    completedThisWeek,
    completionRate,
    atRisk,
    streak: state.streak,
    theme: state.theme,
    selectedCourses,
    hasConfiguredCourses,
    toggleComplete,
    resetData,
    setTheme,
    setSelectedCourses,
    getSubjectItems,
  };
}
