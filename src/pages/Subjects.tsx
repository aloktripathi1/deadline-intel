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
  MLP: 'border-steel/40',
  DL_GENAI: 'border-amber/40',
  TDS: 'border-emerald/40',
};

const subjectBadge: Record<Subject, string> = {
  MLP: 'bg-steel/15 text-steel',
  DL_GENAI: 'bg-amber/15 text-amber',
  TDS: 'bg-emerald/15 text-emerald',
};

const Subjects = () => {
  const { getSubjectItems, toggleComplete } = useDeadlines();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Subjects</h1>
      {(['MLP', 'DL_GENAI', 'TDS'] as Subject[]).map((subject) => (
        <SubjectCard key={subject} subject={subject} items={getSubjectItems(subject)} onToggle={toggleComplete} />
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

  // Risk: red if 3+ in 7 days, yellow if 2, green otherwise
  const dueIn7 = pending.filter((i) => i.daysLeft >= 0 && i.daysLeft <= 7).length;
  const risk = dueIn7 >= 3 ? 'red' : dueIn7 >= 2 ? 'yellow' : 'green';

  return (
    <Card className={cn("border-l-4", subjectAccent[subject])}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{SUBJECT_LABELS[subject]}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={cn("text-[10px]", subjectBadge[subject])} variant="outline">
              {completed.length}/{total}
            </Badge>
            <div className={cn(
              "h-2.5 w-2.5 rounded-full",
              risk === 'red' && 'bg-urgency-red',
              risk === 'yellow' && 'bg-urgency-orange',
              risk === 'green' && 'bg-urgency-green',
            )} title={`${dueIn7} due in 7 days`} />
          </div>
        </div>
        <Progress value={pct} className="h-1.5 mt-2" />
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground mb-1">Upcoming</p>
            {upcoming.map((item) => (
              <DeadlineRow key={item.id} item={item} onToggle={onToggle} showSubject={false} />
            ))}
          </div>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <Collapsible open={showCompleted} onOpenChange={setShowCompleted}>
            <CollapsibleTrigger className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ChevronDown className={cn("h-3 w-3 transition-transform", showCompleted && "rotate-180")} />
              Completed ({completed.length})
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 mt-1">
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
