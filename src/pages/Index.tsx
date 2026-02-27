import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDeadlines } from "@/hooks/use-deadlines";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DeadlineRow } from "@/components/DeadlineRow";
import { cn } from "@/lib/utils";
import {
  AlertTriangle, TrendingUp, CheckCircle2, Flame, Zap, Clock,
  Settings2, CalendarCheck, ListTodo, Target, ChevronDown, ChevronUp,
  BookOpen, FolderGit2,
} from "lucide-react";
import { SUBJECT_LABELS, Subject, getPriorityLabel, DeadlineType } from "@/types/deadline";

const THEORY_TYPES: DeadlineType[] = ['ga', 'quiz', 'endterm', 'oppe', 'nppe', 'roe', 'bpt', 'extra_activity'];
const PROJECT_TYPES: DeadlineType[] = ['milestone', 'kaggle', 'kaggle_review', 'form', 'project'];

// Semester bounds: Jan 13 – May 10, 2026
const TERM_START = new Date('2026-01-13');
const TERM_END = new Date('2026-05-10');

function termProgress() {
  const now = new Date();
  const total = TERM_END.getTime() - TERM_START.getTime();
  const elapsed = Math.max(0, Math.min(now.getTime() - TERM_START.getTime(), total));
  return Math.round((elapsed / total) * 100);
}

const Index = () => {
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<'all' | 'theory' | 'projects'>('all');
  const navigate = useNavigate();

  const {
    items,
    pending,
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
    selectedCourses,
  } = useDeadlines();

  const toggleSection = (key: string) =>
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  // Category filter helper
  const applyFilter = <T extends { type: DeadlineType }>(arr: T[]) => {
    if (activeFilter === 'theory') return arr.filter(i => THEORY_TYPES.includes(i.type));
    if (activeFilter === 'projects') return arr.filter(i => PROJECT_TYPES.includes(i.type));
    return arr;
  };

  // Group pending items beyond upcoming7 into "later"
  const later = useMemo(() =>
    pending.filter(i => i.daysLeft > 7).sort((a, b) => a.daysLeft - b.daysLeft),
  [pending]);

  const progress = termProgress();
  const pendingCount = pending.length;

  // ── Empty / Not configured ──────────────────────────────────────────────────
  if (!hasConfiguredCourses) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Welcome to Deadline Intel</h1>
            <p className="text-muted-foreground max-w-sm">
              Select your Jan 2026 courses to see your personalised deadline dashboard.
            </p>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <Settings2 className="h-4 w-4" />
            Select Your Courses
          </button>
        </div>
      </div>
    );
  }

  // ── Main dashboard ──────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Jan 2026 Term</p>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <div className="text-right space-y-1">
          <p className="text-xs text-muted-foreground">{selectedCourses.length} courses · {pendingCount} pending</p>
          <p className="text-xs text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Term Progress */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Term Progress</span>
            <span className="text-xs font-mono font-bold text-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-1.5 text-[10px] text-muted-foreground/60">
            <span>Jan 13</span>
            <span>May 10</span>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: ListTodo, iconClass: "text-steel", bg: "bg-steel/10", value: pendingCount, label: "Pending" },
          { icon: CheckCircle2, iconClass: "text-urgency-green", bg: "bg-urgency-green/10", value: completedThisWeek, label: "Done this week" },
          { icon: TrendingUp, iconClass: "text-primary", bg: "bg-primary/10", value: `${completionRate}%`, label: "Completion" },
          { icon: Flame, iconClass: "text-amber", bg: "bg-amber/10", value: streak, label: "Day streak" },
        ].map(({ icon: Icon, iconClass, bg, value, label }, i) => (
          <Card key={label} className={cn("glass-card-hover animate-float-in", `stagger-${i + 1}`)}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0", bg)}>
                  <Icon className={cn("h-4 w-4", iconClass)} />
                </div>
                <div className="min-w-0">
                  <p className="text-xl font-bold leading-none tabular-nums">{value}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 truncate">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Critical */}
      {nextCritical && (
        <Card className={cn(
          "glass-card overflow-hidden",
          nextCritical.daysLeft <= 3 && "border-destructive/30 bg-destructive/[0.02]",
          nextCritical.daysLeft <= 5 && nextCritical.daysLeft > 3 && "border-urgency-red/25",
          nextCritical.daysLeft <= 10 && nextCritical.daysLeft > 5 && "border-urgency-orange/20",
        )}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Zap className="h-3 w-3 text-muted-foreground shrink-0" />
                  <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Next Critical</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight leading-tight">{nextCritical.title}</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-[10px] px-2 py-0 h-4.5">
                    {SUBJECT_LABELS[nextCritical.subject as Subject | 'ALL']}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-2 py-0 h-4.5 text-muted-foreground">
                    {getPriorityLabel(nextCritical.type)}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">
                    {new Date(nextCritical.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                {nextCritical.description && (
                  <p className="text-[11px] text-muted-foreground/70 truncate">{nextCritical.description}</p>
                )}
              </div>
              <div className="text-right shrink-0">
                <span className={cn(
                  "text-6xl font-mono font-black tabular-nums leading-none",
                  nextCritical.daysLeft === 0 && "text-destructive",
                  nextCritical.daysLeft <= 3 && nextCritical.daysLeft > 0 && "text-destructive",
                  nextCritical.daysLeft <= 5 && nextCritical.daysLeft > 3 && "text-urgency-red",
                  nextCritical.daysLeft <= 10 && nextCritical.daysLeft > 5 && "text-urgency-orange",
                  nextCritical.daysLeft > 10 && "text-urgency-green",
                )}>
                  {nextCritical.daysLeft === 0 ? "!" : nextCritical.daysLeft}
                </span>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                  {nextCritical.daysLeft === 0 ? "due today" : "days left"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Theory / Projects filter */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-muted/50 border border-border/50">
          {([
            { key: 'all', label: 'All' },
            { key: 'theory', label: 'Theory', icon: BookOpen },
            { key: 'projects', label: 'Projects', icon: FolderGit2 },
          ] as { key: 'all' | 'theory' | 'projects'; label: string; icon?: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200",
                activeFilter === key
                  ? "bg-background text-foreground shadow-sm border border-border/60"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {Icon && <Icon className="h-3 w-3" />}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Status pill row */}
      <div className="flex items-center gap-2 flex-wrap">
        {overdue.length > 0 && (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold">
            <AlertTriangle className="h-3 w-3" />
            {overdue.length} overdue
          </span>
        )}
        {redZone.length > 0 && (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-urgency-red/10 border border-urgency-red/20 text-urgency-red text-xs font-semibold">
            <Clock className="h-3 w-3" />
            {redZone.length} due in 5d
          </span>
        )}
        {orangeZone.length > 0 && (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-urgency-orange/10 border border-urgency-orange/20 text-urgency-orange text-xs font-semibold">
            <Clock className="h-3 w-3" />
            {orangeZone.length} due in 10d
          </span>
        )}
        {atRisk && (
          <span className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold">
            <AlertTriangle className="h-3 w-3" /> At Risk
          </span>
        )}
      </div>

      {/* Today */}
      {(() => { const f = applyFilter(todayDeadlines); return (
      <CollapsibleSection
        id="today"
        title="Today"
        icon={<CalendarCheck className="h-4 w-4 text-primary" />}
        count={f.length}
        titleClass="text-primary"
        cardClass="border-primary/20 bg-primary/[0.02]"
        collapsed={collapsedSections['today']}
        onToggle={() => toggleSection('today')}
        emptyText="Nothing due today — enjoy the breathing room."
        items={f}
        onItemToggle={toggleComplete}
      />); })()}

      {/* Overdue */}
      {(() => { const f = applyFilter(overdue); return f.length > 0 && (
        <CollapsibleSection
          id="overdue"
          title="Overdue"
          icon={<AlertTriangle className="h-4 w-4" />}
          count={f.length}
          titleClass="text-destructive"
          cardClass="border-destructive/15 bg-destructive/[0.02]"
          collapsed={collapsedSections['overdue']}
          onToggle={() => toggleSection('overdue')}
          items={f}
          onItemToggle={toggleComplete}
        />); })()}

      {/* Due within 5 days */}
      {(() => { const f = applyFilter(redZone); return f.length > 0 && (
        <CollapsibleSection
          id="red"
          title="Due within 5 days"
          icon={<Clock className="h-4 w-4" />}
          count={f.length}
          titleClass="text-urgency-red"
          cardClass="border-urgency-red/15"
          collapsed={collapsedSections['red']}
          onToggle={() => toggleSection('red')}
          items={f}
          onItemToggle={toggleComplete}
        />); })()}

      {/* Due within 10 days */}
      {(() => { const f = applyFilter(orangeZone); return f.length > 0 && (
        <CollapsibleSection
          id="orange"
          title="Due within 10 days"
          icon={<Clock className="h-4 w-4" />}
          count={f.length}
          titleClass="text-urgency-orange"
          cardClass="border-urgency-orange/15"
          collapsed={collapsedSections['orange']}
          onToggle={() => toggleSection('orange')}
          items={f}
          onItemToggle={toggleComplete}
        />); })()}

      {/* Coming up */}
      {(() => { const f = applyFilter(later); return f.length > 0 && (
        <CollapsibleSection
          id="later"
          title="Coming Up"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          count={f.length}
          collapsed={collapsedSections['later'] ?? true}
          onToggle={() => toggleSection('later')}
          items={f}
          onItemToggle={toggleComplete}
        />); })()}

      {/* All clear */}
      {pendingCount === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <div className="h-14 w-14 rounded-2xl bg-urgency-green/10 flex items-center justify-center">
            <CheckCircle2 className="h-7 w-7 text-urgency-green" />
          </div>
          <p className="font-semibold text-foreground">All caught up!</p>
          <p className="text-sm text-muted-foreground">No pending deadlines. Great work.</p>
        </div>
      )}
    </div>
  );
};

// ── Collapsible section component ────────────────────────────────────────────
function CollapsibleSection({
  id: _id,
  title,
  icon,
  count,
  titleClass,
  cardClass,
  collapsed,
  onToggle,
  emptyText,
  items,
  onItemToggle,
}: {
  id: string;
  title: string;
  icon?: React.ReactNode;
  count: number;
  titleClass?: string;
  cardClass?: string;
  collapsed: boolean;
  onToggle: () => void;
  emptyText?: string;
  items: any[];
  onItemToggle: (id: string) => void;
}) {
  return (
    <Card className={cn("glass-card overflow-hidden", cardClass)}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-4 group"
        style={{ height: '56px', minHeight: '56px', maxHeight: '56px', lineHeight: '1' }}
      >
        {icon && <span className={cn("shrink-0 flex items-center", titleClass)}>{icon}</span>}
        <span className={cn("flex-1 text-left text-sm font-semibold leading-none truncate", titleClass)}>
          {title}
        </span>
        <Badge variant="secondary" className="shrink-0 text-[10px] px-1.5 py-0 h-4 font-bold">
          {count}
        </Badge>
        <span className="shrink-0 flex items-center text-muted-foreground group-hover:text-foreground transition-colors">
          {collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </span>
      </button>
      {!collapsed && (
        <CardContent className="pt-2 pb-2 px-4">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">{emptyText ?? "Nothing here."}</p>
          ) : (
            <div className="space-y-0.5">
              {items.map((item) => (
                <DeadlineRow key={item.id} item={item} onToggle={onItemToggle} />
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default Index;
