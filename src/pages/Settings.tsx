import { useDeadlines } from "@/hooks/use-deadlines";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const Settings = () => {
  const { theme, setTheme, resetData, streak, completionRate } = useDeadlines();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Preferences & data management</p>
      </div>

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

      <Card className="glass-card animate-float-in stagger-2">
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

      <Card className={cn("glass-card border-destructive/20 animate-float-in stagger-3")}>
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
