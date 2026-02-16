import { useDeadlines } from "@/hooks/use-deadlines";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeadlineRow } from "@/components/DeadlineRow";
import { cn } from "@/lib/utils";
import { AlertTriangle, TrendingUp, CheckCircle2, Flame } from "lucide-react";
import { SUBJECT_LABELS, Subject } from "@/types/deadline";

const Index = () => {
  const {
    nextCritical,
    redZone,
    orangeZone,
    overdue,
    upcoming7,
    completedThisWeek,
    completionRate,
    atRisk,
    streak,
    toggleComplete,
  } = useDeadlines();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Command Center</h1>

      {/* Hero Countdown */}
      {nextCritical && (
        <Card className={cn(
          "overflow-hidden",
          nextCritical.daysLeft <= 3 && "border-destructive/40 animate-pulse-urgency",
          nextCritical.daysLeft <= 5 && nextCritical.daysLeft > 3 && "border-urgency-red/30",
        )}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Next Critical</p>
                <h2 className="text-xl font-bold">{nextCritical.title}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {SUBJECT_LABELS[nextCritical.subject as Subject | 'ALL']} · {new Date(nextCritical.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="text-right">
                <span className={cn(
                  "text-5xl font-mono font-bold tabular-nums",
                  nextCritical.daysLeft <= 3 && "text-destructive",
                  nextCritical.daysLeft <= 5 && nextCritical.daysLeft > 3 && "text-urgency-red",
                  nextCritical.daysLeft <= 10 && nextCritical.daysLeft > 5 && "text-urgency-orange",
                  nextCritical.daysLeft > 10 && "text-urgency-green",
                )}>
                  {nextCritical.daysLeft}
                </span>
                <p className="text-xs text-muted-foreground">days left</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="h-4 w-4 text-urgency-green shrink-0" />
            <div>
              <p className="text-2xl font-mono font-bold">{completedThisWeek}</p>
              <p className="text-[10px] text-muted-foreground">Done this week</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <TrendingUp className="h-4 w-4 text-steel shrink-0" />
            <div>
              <p className="text-2xl font-mono font-bold">{completionRate}%</p>
              <p className="text-[10px] text-muted-foreground">Completion rate</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Flame className="h-4 w-4 text-amber shrink-0" />
            <div>
              <p className="text-2xl font-mono font-bold">{streak}</p>
              <p className="text-[10px] text-muted-foreground">Day streak</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            {atRisk ? <AlertTriangle className="h-4 w-4 text-urgency-red shrink-0" /> : <div className="h-4 w-4" />}
            <div>
              <Badge variant={atRisk ? "destructive" : "secondary"} className="text-[10px]">
                {atRisk ? 'AT RISK' : 'CLEAR'}
              </Badge>
              <p className="text-[10px] text-muted-foreground mt-0.5">7-day load</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue */}
      {overdue.length > 0 && (
        <Card className="border-destructive/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-destructive flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Overdue ({overdue.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {overdue.map((item) => (
              <DeadlineRow key={item.id} item={item} onToggle={toggleComplete} />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Red Zone */}
      {redZone.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-urgency-red">
              Red Zone — Due within 5 days ({redZone.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {redZone.map((item) => (
              <DeadlineRow key={item.id} item={item} onToggle={toggleComplete} />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Orange Zone */}
      {orangeZone.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-urgency-orange">
              Warning — Due within 10 days ({orangeZone.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {orangeZone.map((item) => (
              <DeadlineRow key={item.id} item={item} onToggle={toggleComplete} />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Upcoming 7 days */}
      {upcoming7.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Upcoming 7 Days ({upcoming7.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {upcoming7.map((item) => (
              <DeadlineRow key={item.id} item={item} onToggle={toggleComplete} />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;
