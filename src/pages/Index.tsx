import { useState } from "react";
import { useDeadlines } from "@/hooks/use-deadlines";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeadlineRow } from "@/components/DeadlineRow";
import { cn } from "@/lib/utils";
import { AlertTriangle, TrendingUp, CheckCircle2, Flame, Zap, Clock, BookOpen, FolderGit2, Settings2, X, CalendarCheck } from "lucide-react";
import { SUBJECT_LABELS, Subject, DeadlineType } from "@/types/deadline";
import { useNavigate } from "react-router-dom";

const THEORY_TYPES: DeadlineType[] = ['ga', 'exam', 'oppe', 'roe'];
const PROJECT_TYPES: DeadlineType[] = ['milestone', 'kaggle', 'kaggle_review', 'form', 'project'];

const Index = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'theory' | 'projects'>('theory');

  const [dismissedBanner, setDismissedBanner] = useState(false);
  const navigate = useNavigate();

  const {
    items,
    nextCritical,
    redZone,
    orangeZone,
    overdue,
    upcoming7,
    todayDeadlines,
    completedThisWeek,
    completionRate,
    atRisk,
    streak,
    toggleComplete,
    hasConfiguredCourses,
  } = useDeadlines();

  // Filter helpers
  const filterByCategory = (arr: typeof items, cat: 'all' | 'theory' | 'projects') => {
    if (cat === 'theory') return arr.filter(i => THEORY_TYPES.includes(i.type));
    if (cat === 'projects') return arr.filter(i => PROJECT_TYPES.includes(i.type));
    return arr;
  };

  const filteredOverdue = filterByCategory(overdue, activeTab);
  const filteredRed = filterByCategory(redZone, activeTab);
  const filteredOrange = filterByCategory(orangeZone, activeTab);
  const filteredUpcoming = filterByCategory(upcoming7, activeTab);
  const filteredToday = filterByCategory(todayDeadlines, activeTab);

  const tabs = [
    { key: 'theory' as const, label: 'Theory', icon: BookOpen },
    { key: 'projects' as const, label: 'Projects', icon: FolderGit2 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Course Configuration Banner */}
      {!hasConfiguredCourses && !dismissedBanner && (
        <div className="relative flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 animate-float-in">
          <Settings2 className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">Select your courses for Jan 2026 Term</p>
            <p className="text-xs text-muted-foreground">Currently showing deadlines for all courses. Configure your dashboard to only see what matters.</p>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
          >
            Select Courses
          </button>
          <button
            onClick={() => setDismissedBanner(true)}
            className="shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Jan 2026 — Deadlines</h1>
        <p className="text-sm text-muted-foreground">Your academic intelligence at a glance</p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted/40 border border-border/50 w-fit">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              "flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === key
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {label}
          </button>
        ))}
      </div>

      {/* Hero Countdown */}
      {nextCritical && (
        <Card className={cn(
          "overflow-hidden glass-card relative group",
          nextCritical.daysLeft <= 3 && "border-destructive/30",
          nextCritical.daysLeft <= 5 && nextCritical.daysLeft > 3 && "border-urgency-red/25",
        )}>
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
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-muted/50">
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

      {/* Today's Deadlines */}
      <Card className="glass-card border-primary/20 bg-primary/[0.03]">
        <CardHeader className="pb-3">
          <CardTitle className="section-header text-primary">
            <CalendarCheck className="h-4 w-4" />
            Today&apos;s Deadlines
            <span className="ml-auto text-[10px] font-normal text-muted-foreground uppercase tracking-widest">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredToday.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No deadlines today.</p>
          ) : (
            <div className="space-y-1">
              {filteredToday.map((item) => (
                <DeadlineRow key={item.id} item={item} onToggle={toggleComplete} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Empty state for filtered view */}
      {filteredOverdue.length === 0 && filteredRed.length === 0 && filteredOrange.length === 0 && filteredUpcoming.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No pending deadlines in this category.
        </div>
      )}

      {/* Overdue */}
      {filteredOverdue.length > 0 && (
        <DeadlineSection
          title={`Overdue (${filteredOverdue.length})`}
          titleClass="text-destructive"
          icon={<AlertTriangle className="h-4 w-4" />}
          cardClass="border-destructive/15 bg-destructive/[0.025]"
          items={filteredOverdue}
          onToggle={toggleComplete}
        />
      )}

      {/* Red Zone */}
      {filteredRed.length > 0 && (
        <DeadlineSection
          title={`Due within 5 days (${filteredRed.length})`}
          titleClass="text-urgency-red"
          cardClass="border-urgency-red/10"
          items={filteredRed}
          onToggle={toggleComplete}
        />
      )}

      {/* Orange Zone */}
      {filteredOrange.length > 0 && (
        <DeadlineSection
          title={`Due within 10 days (${filteredOrange.length})`}
          titleClass="text-urgency-orange"
          items={filteredOrange}
          onToggle={toggleComplete}
        />
      )}

      {/* Upcoming 7 days */}
      {filteredUpcoming.length > 0 && (
        <DeadlineSection
          title={`Upcoming 7 Days (${filteredUpcoming.length})`}
          items={filteredUpcoming}
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
