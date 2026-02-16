import { useDeadlines } from "@/hooks/use-deadlines";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeadlineRow } from "@/components/DeadlineRow";
import { cn } from "@/lib/utils";
import { AlertTriangle, TrendingUp, CheckCircle2, Flame, Zap, Clock } from "lucide-react";
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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
        <p className="text-sm text-muted-foreground">Your academic intelligence at a glance</p>
      </div>

      {/* Hero Countdown */}
      {nextCritical && (
        <Card className={cn(
          "overflow-hidden glass-card relative group",
          nextCritical.daysLeft <= 3 && "border-destructive/40 animate-pulse-urgency",
          nextCritical.daysLeft <= 5 && nextCritical.daysLeft > 3 && "border-urgency-red/30",
        )}>
          <div className="absolute inset-0 animate-shimmer pointer-events-none" />
          <CardContent className="p-8 relative">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">Next Critical</p>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">{nextCritical.title}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline" className="text-[10px] px-2 py-0 h-5">
                    {SUBJECT_LABELS[nextCritical.subject as Subject | 'ALL']}
                  </Badge>
                  <span className="text-xs">
                    {new Date(nextCritical.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className={cn(
                  "text-7xl font-mono font-bold tabular-nums leading-none tracking-tighter",
                  nextCritical.daysLeft <= 3 && "text-destructive",
                  nextCritical.daysLeft <= 5 && nextCritical.daysLeft > 3 && "text-urgency-red",
                  nextCritical.daysLeft <= 10 && nextCritical.daysLeft > 5 && "text-urgency-orange",
                  nextCritical.daysLeft > 10 && "text-urgency-green",
                )}>
                  {nextCritical.daysLeft}
                </span>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">days left</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: CheckCircle2, iconClass: "text-urgency-green", value: completedThisWeek, label: "Done this week", delay: "stagger-1" },
          { icon: TrendingUp, iconClass: "text-steel", value: `${completionRate}%`, label: "Completion rate", delay: "stagger-2" },
          { icon: Flame, iconClass: "text-amber", value: streak, label: "Day streak", delay: "stagger-3" },
        ].map(({ icon: Icon, iconClass, value, label, delay }) => (
          <Card key={label} className={cn("glass-card-hover animate-float-in", delay)}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center bg-muted/50")}>
                  <Icon className={cn("h-4 w-4", iconClass)} />
                </div>
                <div>
                  <p className="stat-value">{value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <Card className={cn("glass-card-hover animate-float-in stagger-4", atRisk && "border-urgency-red/20")}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", atRisk ? "bg-destructive/10" : "bg-muted/50")}>
                {atRisk ? <AlertTriangle className="h-4 w-4 text-urgency-red" /> : <Clock className="h-4 w-4 text-muted-foreground" />}
              </div>
              <div>
                <Badge variant={atRisk ? "destructive" : "secondary"} className="text-[10px] font-bold">
                  {atRisk ? 'AT RISK' : 'ON TRACK'}
                </Badge>
                <p className="text-[10px] text-muted-foreground mt-0.5">7-day load</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue */}
      {overdue.length > 0 && (
        <DeadlineSection
          title={`Overdue (${overdue.length})`}
          titleClass="text-destructive"
          icon={<AlertTriangle className="h-4 w-4" />}
          cardClass="border-destructive/20 bg-destructive/[0.02]"
          items={overdue}
          onToggle={toggleComplete}
        />
      )}

      {/* Red Zone */}
      {redZone.length > 0 && (
        <DeadlineSection
          title={`Red Zone — Due within 5 days (${redZone.length})`}
          titleClass="text-urgency-red"
          cardClass="border-urgency-red/10"
          items={redZone}
          onToggle={toggleComplete}
        />
      )}

      {/* Orange Zone */}
      {orangeZone.length > 0 && (
        <DeadlineSection
          title={`Warning — Due within 10 days (${orangeZone.length})`}
          titleClass="text-urgency-orange"
          items={orangeZone}
          onToggle={toggleComplete}
        />
      )}

      {/* Upcoming 7 days */}
      {upcoming7.length > 0 && (
        <DeadlineSection
          title={`Upcoming 7 Days (${upcoming7.length})`}
          items={upcoming7}
          onToggle={toggleComplete}
        />
      )}
    </div>
  );
};

function DeadlineSection({
  title,
  titleClass,
  icon,
  cardClass,
  items,
  onToggle,
}: {
  title: string;
  titleClass?: string;
  icon?: React.ReactNode;
  cardClass?: string;
  items: any[];
  onToggle: (id: string) => void;
}) {
  return (
    <Card className={cn("glass-card", cardClass)}>
      <CardHeader className="pb-3">
        <CardTitle className={cn("section-header", titleClass)}>
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {items.map((item) => (
          <DeadlineRow key={item.id} item={item} onToggle={onToggle} />
        ))}
      </CardContent>
    </Card>
  );
}

export default Index;
