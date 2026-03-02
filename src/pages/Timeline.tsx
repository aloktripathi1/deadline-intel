import { useMemo, useRef } from "react";
import { useDeadlines } from "@/hooks/use-deadlines";
import { cn } from "@/lib/utils";
import { SUBJECT_LABELS, Subject, COURSE_CATALOG } from "@/types/deadline";
import { Badge } from "@/components/ui/badge";
import { AddCustomDeadlineDialog } from "@/components/AddCustomDeadlineDialog";

const MONTHS = [
  { label: 'Feb', start: '2026-02-01', end: '2026-02-28' },
  { label: 'Mar', start: '2026-03-01', end: '2026-03-31' },
  { label: 'Apr', start: '2026-04-01', end: '2026-04-30' },
  { label: 'May', start: '2026-05-01', end: '2026-05-31' },
];

const TOTAL_DAYS = 120;
const TIMELINE_START = '2026-02-01';
const TIMELINE_END   = '2026-05-31';

// Rotating colour palette — one per selected course
const LANE_COLORS = [
  'bg-steel',
  'bg-amber',
  'bg-emerald',
  'bg-blue-400',
  'bg-purple-400',
  'bg-pink-400',
  'bg-orange-400',
  'bg-cyan-400',
];

function dateToDayOffset(dateStr: string): number {
  const start = new Date(TIMELINE_START).getTime();
  const d = new Date(dateStr).getTime();
  return Math.max(0, Math.min(TOTAL_DAYS, Math.round((d - start) / (1000 * 60 * 60 * 24))));
}

const Timeline = () => {
  const { allItems, selectedCourses, hasConfiguredCourses, addCustomDeadline, customDeadlines } = useDeadlines();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Only non-project courses get a dedicated visual lane
  const laneCourses = useMemo(
    () => selectedCourses.filter(s => !COURSE_CATALOG.find(c => c.id === s)?.isProject),
    [selectedCourses],
  );

  // Whether we have any custom deadlines in this timeline window
  const hasCustomInWindow = useMemo(
    () => customDeadlines.some(d => {
      const date = new Date(d.date);
      return date >= new Date(TIMELINE_START) && date <= new Date(TIMELINE_END);
    }),
    [customDeadlines],
  );

  // Index of the custom lane (after all course lanes)
  const customLaneIdx = laneCourses.length;

  // Build subject → tailwind colour lookup from lane order
  const subjectColorMap = useMemo(() => {
    const map: Record<string, string> = { ALL: 'bg-foreground', CUSTOM: 'bg-violet-400' };
    laneCourses.forEach((s, i) => { map[s] = LANE_COLORS[i % LANE_COLORS.length]; });
    return map;
  }, [laneCourses]);

  // Restrict to the Feb–May 2026 window
  const timelineItems = useMemo(
    () => allItems.filter(item => {
      const d = new Date(item.date);
      return d >= new Date(TIMELINE_START) && d <= new Date(TIMELINE_END);
    }),
    [allItems],
  );

  // Crunch zones: 3+ pending deadlines within any 3-day window
  const clusters = useMemo(() => {
    const pending = timelineItems.filter(i => !i.completed);
    const result: { start: number; end: number }[] = [];
    for (let day = 0; day < TOTAL_DAYS - 3; day++) {
      const count = pending.filter(i => {
        const off = dateToDayOffset(i.date);
        return off >= day && off <= day + 3;
      }).length;
      if (count >= 3) {
        if (result.length > 0 && result[result.length - 1].end >= day - 1) {
          result[result.length - 1].end = day + 3;
        } else {
          result.push({ start: day, end: day + 3 });
        }
      }
    }
    return result;
  }, [timelineItems]);

  const examPillars = timelineItems.filter(i => i.type === 'exam' || i.type === 'quiz' || i.type === 'endterm');
  const events      = timelineItems.filter(i => i.type !== 'exam' && i.type !== 'quiz' && i.type !== 'endterm');

  // ── Empty state ────────────────────────────────────────────────────────────
  if (!hasConfiguredCourses || selectedCourses.length === 0) {
    return (
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Academic Timeline</h1>
          <p className="text-sm text-muted-foreground">February — May 2026 · Scroll horizontally to explore</p>
        </div>
        <div className="glass-card rounded-xl p-12 flex flex-col items-center justify-center gap-3 text-center min-h-[220px]">
          <p className="text-lg font-semibold">No courses selected for this term</p>
          <p className="text-sm text-muted-foreground">
            Head to <span className="font-medium text-foreground">Subjects</span> to pick your courses and unlock the timeline.
          </p>
        </div>
      </div>
    );
  }

  const totalLanes = laneCourses.length + (hasCustomInWindow ? 1 : 0);
  const laneHeight = Math.max(320, 80 + totalLanes * 70);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Academic Timeline</h1>
          <p className="text-sm text-muted-foreground">February — May 2026 · Scroll horizontally to explore</p>
        </div>
        <AddCustomDeadlineDialog onAdd={addCustomDeadline} />
      </div>

      <div ref={scrollRef} className="overflow-x-auto pb-4 glass-card rounded-xl p-4">
        <div className="relative" style={{ width: `${TOTAL_DAYS * 12}px`, minHeight: `${laneHeight}px` }}>

          {/* Month markers */}
          <div className="flex border-b border-border/50">
            {MONTHS.map((m) => {
              const startOff = dateToDayOffset(m.start);
              const endOff   = dateToDayOffset(m.end);
              return (
                <div
                  key={m.label}
                  style={{ width: `${(endOff - startOff) * 12}px` }}
                  className="text-xs font-semibold text-muted-foreground px-2 py-2.5 border-r border-border/30"
                >
                  {m.label} 2026
                </div>
              );
            })}
          </div>

          {/* Crunch zones */}
          {clusters.map((c, i) => (
            <div
              key={i}
              className="absolute top-12 bottom-0 bg-urgency-red/[0.06] border-l border-r border-urgency-red/15 z-0 rounded-sm"
              style={{ left: `${c.start * 12}px`, width: `${(c.end - c.start) * 12}px` }}
            >
              <span className="text-[8px] font-bold text-urgency-red/70 px-1 absolute top-1 tracking-wider">CRUNCH</span>
            </div>
          ))}

          {/* Exam / quiz / end-term pillars */}
          {examPillars.map((exam) => {
            const offset = dateToDayOffset(exam.date);
            return (
              <div
                key={exam.id}
                className="absolute top-12 bottom-0 w-px bg-destructive/40 z-10"
                style={{ left: `${offset * 12}px` }}
              >
                <Badge
                  variant="destructive"
                  className="absolute -top-0.5 -translate-x-1/2 text-[9px] px-1.5 py-0 whitespace-nowrap shadow-sm"
                >
                  {exam.title}
                </Badge>
              </div>
            );
          })}

          {/* Events (GAs, milestones, OPPEs, custom, etc.) */}
          {events.map((item) => {
            // Custom deadlines go to their own lane
            let laneIdx: number;
            if (item.isCustom) {
              if (!hasCustomInWindow) return null;
              laneIdx = customLaneIdx;
            } else if (item.subject === 'ALL') {
              laneIdx = 0;
            } else {
              laneIdx = laneCourses.indexOf(item.subject as Subject);
            }

            if (laneIdx === -1) return null; // not in this user's selection

            const offset     = dateToDayOffset(item.date);
            const typeOffset = item.isCustom ? 16 : item.type === 'ga' ? 0 : item.type === 'milestone' ? 16 : 32;

            return (
              <div
                key={item.id}
                className={cn(
                  "absolute rounded-full z-20 cursor-default transition-transform duration-200 hover:scale-150",
                  item.isCustom ? "h-3.5 w-3.5 bg-violet-400 ring-2 ring-violet-400/30" : item.type === 'ga' ? "h-2.5 w-2.5" : "h-3.5 w-3.5",
                  !item.isCustom && (subjectColorMap[item.subject] ?? 'bg-muted-foreground'),
                  item.completed && "opacity-25",
                )}
                style={{ left: `${offset * 12 - 5}px`, top: `${60 + laneIdx * 70 + typeOffset}px` }}
                title={item.isCustom
                  ? `[Custom] ${item.title} — ${new Date(item.date).toLocaleDateString()}`
                  : `${item.title} — ${SUBJECT_LABELS[item.subject as Subject | 'ALL'] ?? item.subject} — ${new Date(item.date).toLocaleDateString()}`
                }
              />
            );
          })}

          {/* Subject lane labels */}
          {laneCourses.map((subject, idx) => (
            <div
              key={subject}
              className="absolute left-0 text-[10px] font-medium text-muted-foreground/70"
              style={{ top: `${60 + idx * 70 - 12}px` }}
            >
              {SUBJECT_LABELS[subject] ?? subject}
            </div>
          ))}
          {/* Custom lane label */}
          {hasCustomInWindow && (
            <div
              className="absolute left-0 text-[10px] font-medium text-violet-400/80"
              style={{ top: `${60 + customLaneIdx * 70 - 12}px` }}
            >
              Custom
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-5 text-[10px] text-muted-foreground">
        {laneCourses.map((subject, idx) => (
          <div key={subject} className="flex items-center gap-1.5">
            <div className={cn("h-2.5 w-2.5 rounded-full", LANE_COLORS[idx % LANE_COLORS.length])} />
            {SUBJECT_LABELS[subject] ?? subject}
          </div>
        ))}
        {hasCustomInWindow && (
          <div className="flex items-center gap-1.5 text-violet-400 font-medium">
            <div className="h-3 w-3 rounded-full bg-violet-400" />
            Custom
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
          Milestone / OPPE
        </div>
        <div className="flex items-center gap-1.5 text-urgency-red font-medium">■ Crunch Zone</div>
      </div>
    </div>
  );
};

export default Timeline;
