import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SettingsPage = () => (
  <div className="space-y-6 max-w-2xl">
    <h1 className="text-2xl font-heading text-foreground">Settings</h1>

    <Card className="glass">
      <CardHeader><CardTitle className="text-lg font-heading">Notifications</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {[
          ["Email notifications", "Receive research updates via email"],
          ["Hypothesis alerts", "Get notified when new hypotheses are generated"],
          ["Weekly digest", "Summary of your research activity"],
        ].map(([title, desc]) => (
          <div key={title} className="flex items-center justify-between">
            <div>
              <Label className="text-sm text-foreground">{title}</Label>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            <Switch />
          </div>
        ))}
      </CardContent>
    </Card>

    <Card className="glass">
      <CardHeader><CardTitle className="text-lg font-heading">API & Integrations</CardTitle></CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">API access and third-party integrations coming soon.</p>
      </CardContent>
    </Card>
  </div>
);

export default SettingsPage;
