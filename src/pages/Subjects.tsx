import { useDeadlines } from "@/hooks/use-deadlines";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DeadlineRow } from "@/components/DeadlineRow";
import { Subject, SUBJECT_LABELS } from "@/types/deadline";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const subjectAccent: Record<Subject, string> = {
  MLP: 'border-l-steel',
  DL_GENAI: 'border-l-amber',
  TDS: 'border-l-emerald',
};

const subjectBadge: Record<Subject, string> = {
  MLP: 'bg-steel/10 text-steel',
  DL_GENAI: 'bg-amber/10 text-amber',
  TDS: 'bg-emerald/10 text-emerald',
};

const Subjects = () => {
  const { getSubjectItems, toggleComplete } = useDeadlines();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Subjects</h1>
        <p className="text-sm text-muted-foreground">Track progress per course</p>
      </div>
      {(['MLP', 'DL_GENAI', 'TDS'] as Subject[]).map((subject, i) => (
        <div key={subject} className={cn("animate-float-in", `stagger-${i + 1}`)}>
          <SubjectCard subject={subject} items={getSubjectItems(subject)} onToggle={toggleComplete} />
        </div>
      ))}
    </div>
  );
};

function SubjectCard({
  subject,
  items,
  onToggle,
}: {
  subject: Subject;
  items: ReturnType<ReturnType<typeof useDeadlines>['getSubjectItems']>;
  onToggle: (id: string) => void;
}) {
  const [showCompleted, setShowCompleted] = useState(false);

  const enriched = items.map((i) => ({
    ...i,
    completed: ('completed' in i) ? (i as any).completed : false,
    daysLeft: ('daysLeft' in i) ? (i as any).daysLeft : 0,
  }));

  const completed = enriched.filter((i) => i.completed);
  const pending = enriched.filter((i) => !i.completed);
  const upcoming = pending.filter((i) => i.daysLeft >= 0).sort((a, b) => a.daysLeft - b.daysLeft).slice(0, 5);
  const total = enriched.length;
  const pct = total > 0 ? Math.round((completed.length / total) * 100) : 0;

  const dueIn7 = pending.filter((i) => i.daysLeft >= 0 && i.daysLeft <= 7).length;
  const risk = dueIn7 >= 3 ? 'red' : dueIn7 >= 2 ? 'yellow' : 'green';

  return (
    <Card className={cn("glass-card border-l-4", subjectAccent[subject])}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{SUBJECT_LABELS[subject]}</CardTitle>
          <div className="flex items-center gap-2.5">
            <Badge className={cn("text-[10px] font-medium", subjectBadge[subject])} variant="outline">
              {completed.length}/{total}
            </Badge>
            <div className={cn(
              "h-2 w-2 rounded-full ring-2 ring-background",
              risk === 'red' && 'bg-urgency-red',
              risk === 'yellow' && 'bg-urgency-orange',
              risk === 'green' && 'bg-urgency-green',
            )} title={`${dueIn7} due in 7 days`} />
          </div>
        </div>
        <Progress value={pct} className="h-1 mt-2" />
      </CardHeader>
      <CardContent className="space-y-3">
        {upcoming.length > 0 && (
          <div className="space-y-1">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">Upcoming</p>
            {upcoming.map((item) => (
              <DeadlineRow key={item.id} item={item} onToggle={onToggle} showSubject={false} />
            ))}
          </div>
        )}

        {completed.length > 0 && (
          <Collapsible open={showCompleted} onOpenChange={setShowCompleted}>
            <CollapsibleTrigger className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
              <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", showCompleted && "rotate-180")} />
              Completed ({completed.length})
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 mt-1.5">
              {completed.map((item) => (
                <DeadlineRow key={item.id} item={item} onToggle={onToggle} showSubject={false} />
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}

export default Subjects;
