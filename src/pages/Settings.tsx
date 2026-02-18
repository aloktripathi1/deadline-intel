import { useDeadlines } from "@/hooks/use-deadlines";
import { useNotifications } from "@/hooks/use-notifications";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Bell, BellOff, BellRing } from "lucide-react";

const LEAD_OPTIONS = [
  { label: '1 hour before', value: 1 },
  { label: '6 hours before', value: 6 },
  { label: '12 hours before', value: 12 },
  { label: '24 hours before', value: 24 },
  { label: '48 hours before', value: 48 },
];

const Settings = () => {
  const { theme, setTheme, resetData, streak, completionRate, pending } = useDeadlines();
  const {
    notifEnabled,
    notifPermission,
    leadHours,
    setEnabled,
    setLeadHours,
  } = useNotifications(pending);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Preferences & data management</p>
      </div>

      {/* Appearance */}
      <Card className="glass-card animate-float-in stagger-1">
        <CardHeader>
          <CardTitle className="text-base">Appearance</CardTitle>
          <CardDescription>Toggle between dark and light mode</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="text-sm">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="glass-card animate-float-in stagger-2">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            {notifEnabled ? <BellRing className="h-4 w-4 text-urgency-green" /> : <BellOff className="h-4 w-4 text-muted-foreground" />}
            Deadline Notifications
          </CardTitle>
          <CardDescription>
            Get browser alerts before deadlines are due.
            {notifPermission === 'denied' && (
              <span className="text-destructive block mt-1">
                Notifications are blocked. Please allow them in your browser settings.
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <Label htmlFor="notif-toggle" className="text-sm">Enable notifications</Label>
            <Switch
              id="notif-toggle"
              checked={notifEnabled}
              disabled={notifPermission === 'denied'}
              onCheckedChange={setEnabled}
            />
          </div>

          {notifEnabled && (
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Remind me</Label>
              <div className="flex flex-wrap gap-2">
                {LEAD_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setLeadHours(opt.value)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150",
                      leadHours === opt.value
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground pt-1">
                Notifications fire when you open the app and a deadline is within the selected window.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="glass-card animate-float-in stagger-3">
        <CardHeader>
          <CardTitle className="text-base">Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Current streak</span>
            <span className="font-mono font-bold tabular-nums text-base">{streak} days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Completion rate</span>
            <span className="font-mono font-bold tabular-nums text-base">{completionRate}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className={cn("glass-card border-destructive/20 animate-float-in stagger-4")}>
        <CardHeader>
          <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
          <CardDescription>Reset all completion data. This cannot be undone.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" size="sm" onClick={resetData}>
            Reset All Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;

