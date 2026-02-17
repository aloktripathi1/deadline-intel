import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DeadlineItem, getDaysLeft, getUrgencyZone, SUBJECT_LABELS, getPriorityLabel, Subject } from "@/types/deadline";

interface DeadlineRowProps {
  item: DeadlineItem & { completed: boolean; daysLeft: number };
  onToggle: (id: string) => void;
  showSubject?: boolean;
}

const subjectColorMap: Record<string, string> = {
  MLP: 'bg-steel/10 text-steel border-steel/25',
  DL_GENAI: 'bg-amber/10 text-amber border-amber/25',
  TDS: 'bg-emerald/10 text-emerald border-emerald/25',
  ALL: 'bg-muted text-muted-foreground border-border',
};

export function DeadlineRow({ item, onToggle, showSubject = true }: DeadlineRowProps) {
  const urgency = getUrgencyZone(item.daysLeft);
  const isOverdue = urgency === 'overdue';
  const isCritical = urgency === 'red' && item.daysLeft <= 3 && !item.completed;

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group hover:bg-accent/40",
        item.completed && "opacity-45",
        isOverdue && !item.completed && "bg-destructive/[0.06] border border-destructive/15",
        urgency === 'red' && !item.completed && !isOverdue && "bg-destructive/[0.03]",
        isCritical && "animate-pulse-urgency",
      )}
    >
      <Checkbox
        checked={item.completed}
        onCheckedChange={() => onToggle(item.id)}
        className="shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-medium truncate", item.completed && "line-through text-muted-foreground")}>
            {item.title}
          </span>
          {showSubject && (
            <Badge variant="outline" className={cn("text-xs px-2 py-0.5 h-5 shrink-0 font-medium", subjectColorMap[item.subject])}>
              {SUBJECT_LABELS[item.subject as Subject | 'ALL']}
            </Badge>
          )}
        </div>
        <span className="text-[10px] text-muted-foreground/70">{getPriorityLabel(item.type)}</span>
      </div>

      <div className="shrink-0 text-right">
        <span className={cn(
          "text-xs font-mono font-bold tabular-nums",
          isOverdue && "text-destructive",
          urgency === 'red' && !isOverdue && "text-urgency-red",
          urgency === 'orange' && "text-urgency-orange",
          urgency === 'green' && "text-urgency-green",
          item.completed && "text-muted-foreground",
        )}>
          {item.completed ? 'Done' : isOverdue ? `${Math.abs(item.daysLeft)}d overdue` : item.daysLeft === 0 ? 'Today' : `${item.daysLeft}d`}
        </span>
        <div className="text-[10px] text-muted-foreground/60">
          {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      </div>
    </div>
  );
}
