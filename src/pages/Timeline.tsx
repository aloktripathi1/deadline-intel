import { useMemo, useRef } from "react";
import { useDeadlines } from "@/hooks/use-deadlines";
import { cn } from "@/lib/utils";
import { SUBJECT_LABELS, Subject } from "@/types/deadline";
import { Badge } from "@/components/ui/badge";

const MONTHS = [
  { label: 'Feb', start: '2026-02-01', end: '2026-02-28' },
  { label: 'Mar', start: '2026-03-01', end: '2026-03-31' },
  { label: 'Apr', start: '2026-04-01', end: '2026-04-30' },
  { label: 'May', start: '2026-05-01', end: '2026-05-31' },
];

const TOTAL_DAYS = 120;

const subjectBg: Record<string, string> = {
  MLP: 'bg-steel',
  DL_GENAI: 'bg-amber',
  TDS: 'bg-emerald',
  ALL: 'bg-foreground',
};

function dateToDayOffset(dateStr: string): number {
  const start = new Date('2026-02-01').getTime();
  const d = new Date(dateStr).getTime();
  return Math.max(0, Math.min(TOTAL_DAYS, Math.round((d - start) / (1000 * 60 * 60 * 24))));
}

const Timeline = () => {
  const { items } = useDeadlines();
  const scrollRef = useRef<HTMLDivElement>(null);

  const clusters = useMemo(() => {
    const pending = items.filter((i) => !i.completed);
    const result: { start: number; end: number }[] = [];
    for (let day = 0; day < TOTAL_DAYS - 3; day++) {
      const count = pending.filter((i) => {
        const offset = dateToDayOffset(i.date);
        return offset >= day && offset <= day + 3;
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
  }, [items]);

  const exams = items.filter((i) => i.type === 'exam');
  const nonExams = items.filter((i) => i.type !== 'exam');

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Academic Timeline</h1>
        <p className="text-sm text-muted-foreground">February — May 2026 · Scroll horizontally to explore</p>
      </div>

      <div ref={scrollRef} className="overflow-x-auto pb-4 glass-card rounded-xl p-4">
        <div className="relative" style={{ width: `${TOTAL_DAYS * 12}px`, minHeight: '320px' }}>
          {/* Month markers */}
          <div className="flex border-b border-border/50">
            {MONTHS.map((m) => {
              const startOff = dateToDayOffset(m.start);
              const endOff = dateToDayOffset(m.end);
              const width = (endOff - startOff) * 12;
              return (
                <div key={m.label} style={{ width: `${width}px` }} className="text-xs font-semibold text-muted-foreground px-2 py-2.5 border-r border-border/30">
                  {m.label} 2026
                </div>
              );
            })}
          </div>

          {/* Cluster zones */}
          {clusters.map((c, i) => (
            <div
              key={i}
              className="absolute top-12 bottom-0 bg-urgency-red/[0.06] border-l border-r border-urgency-red/15 z-0 rounded-sm"
              style={{ left: `${c.start * 12}px`, width: `${(c.end - c.start) * 12}px` }}
            >
              <span className="text-[8px] font-bold text-urgency-red/70 px-1 absolute top-1 tracking-wider">CRUNCH</span>
            </div>
          ))}

          {/* Exam pillars */}
          {exams.map((exam) => {
            const offset = dateToDayOffset(exam.date);
            return (
              <div
                key={exam.id}
                className="absolute top-12 bottom-0 w-px bg-destructive/40 z-10"
                style={{ left: `${offset * 12}px` }}
              >
                <Badge variant="destructive" className="absolute -top-0.5 -translate-x-1/2 text-[9px] px-1.5 py-0 whitespace-nowrap shadow-sm">
                  {exam.title}
                </Badge>
              </div>
            );
          })}

          {/* Events */}
          {nonExams.map((item) => {
            const offset = dateToDayOffset(item.date);
            const subjectIdx = item.subject === 'MLP' ? 0 : item.subject === 'DL_GENAI' ? 1 : 2;
            const row = subjectIdx;
            const typeOffset = item.type === 'ga' ? 0 : item.type === 'milestone' ? 16 : 32;
            return (
              <div
                key={item.id}
                className={cn(
                  "absolute rounded-full z-20 cursor-default transition-transform duration-200 hover:scale-150",
                  item.type === 'ga' ? "h-2.5 w-2.5" : "h-3.5 w-3.5",
                  subjectBg[item.subject],
                  item.completed && "opacity-25",
                )}
                style={{ left: `${offset * 12 - 5}px`, top: `${60 + row * 70 + typeOffset}px` }}
                title={`${item.title} — ${SUBJECT_LABELS[item.subject as Subject | 'ALL']} — ${new Date(item.date).toLocaleDateString()}`}
              />
            );
          })}

          {/* Subject lanes */}
          {(['MLP', 'DL_GENAI', 'TDS'] as Subject[]).map((subject, idx) => (
            <div
              key={subject}
              className="absolute left-0 text-[10px] font-medium text-muted-foreground/70"
              style={{ top: `${60 + idx * 70 - 12}px` }}
            >
              {SUBJECT_LABELS[subject]}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-steel" /> MLP</div>
        <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-amber" /> DL GenAI</div>
        <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-emerald" /> TDS</div>
        <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-full bg-muted-foreground/20" /> Milestone</div>
        <div className="flex items-center gap-1.5 text-urgency-red font-medium">■ Crunch Zone</div>
      </div>
    </div>
  );
};

export default Timeline;
