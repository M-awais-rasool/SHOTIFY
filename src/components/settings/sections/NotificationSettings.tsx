import { useState } from "react";
import { SettingsHeader } from "../SettingsHeader";
import { SettingsSection } from "../SettingsSection";
import { SettingsRow } from "../SettingsRow";
import { Bell, Mail, Megaphone, Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function NotificationSettings() {
  const [emailExports, setEmailExports] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [inAppNotifs, setInAppNotifs] = useState(true);
  const [productAlerts, setProductAlerts] = useState(true);

  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Notifications" 
        description="Control how and when you receive notifications"
      />

      <SettingsSection title="Email Notifications" description="Notifications sent to your email">
        <SettingsRow 
          label="Export Completed" 
          description="Get notified when large exports finish processing"
        >
          <Switch checked={emailExports} onCheckedChange={setEmailExports} />
        </SettingsRow>
        <SettingsRow 
          label="Weekly Digest" 
          description="Summary of your project activity"
        >
          <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
        </SettingsRow>
        <SettingsRow 
          label="Account & Security" 
          description="Important account-related notifications"
        >
          <Switch defaultChecked disabled />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="In-App Notifications" description="Notifications shown inside AppLens">
        <SettingsRow 
          label="Show Notifications" 
          description="Enable in-app notification popups"
        >
          <Switch checked={inAppNotifs} onCheckedChange={setInAppNotifs} />
        </SettingsRow>
        <SettingsRow 
          label="Sound Effects" 
          description="Play sounds for notifications"
        >
          <Switch />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Product Updates">
        <SettingsRow 
          label="Feature Announcements" 
          description="Get notified about new features and improvements"
        >
          <Switch checked={productAlerts} onCheckedChange={setProductAlerts} />
        </SettingsRow>
        <SettingsRow 
          label="Tips & Tutorials" 
          description="Helpful tips to get the most out of AppLens"
        >
          <Switch defaultChecked />
        </SettingsRow>
        <SettingsRow 
          label="Community Highlights" 
          description="Featured templates and designs from the community"
        >
          <Switch />
        </SettingsRow>
      </SettingsSection>

      <div className="rounded-xl border border-border bg-gradient-to-r from-primary/10 to-emerald-600/10 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">Stay in the loop</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              We'll only send you important updates about your projects and new features. 
              No spam, ever.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
