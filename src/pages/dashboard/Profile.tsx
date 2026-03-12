import { User, Mail, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Profile = () => (
  <div className="space-y-6 max-w-2xl">
    <h1 className="text-2xl font-heading text-foreground">Profile</h1>

    <Card className="glass">
      <CardHeader><CardTitle className="text-lg font-heading">Personal Information</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <Button variant="outline" size="sm">Change Avatar</Button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
            <Input defaultValue="Researcher" className="bg-card-elevated border-border" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Email</label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Input defaultValue="researcher@example.com" className="bg-card-elevated border-border" />
            </div>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Organization</label>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <Input defaultValue="" placeholder="Your institution" className="bg-card-elevated border-border" />
            </div>
          </div>
        </div>
        <Button className="glow-button mt-2">Save Changes</Button>
      </CardContent>
    </Card>
  </div>
);

export default Profile;
