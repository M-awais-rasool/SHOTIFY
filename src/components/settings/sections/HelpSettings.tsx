import { SettingsHeader } from "../SettingsHeader";
import { SettingsSection } from "../SettingsSection";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Bug, 
  ExternalLink, 
  FileText, 
  Keyboard, 
  Lightbulb, 
  MessageSquare,
  Sparkles
} from "lucide-react";

const shortcuts = [
  { keys: ["⌘", "S"], action: "Save project" },
  { keys: ["⌘", "Z"], action: "Undo" },
  { keys: ["⌘", "⇧", "Z"], action: "Redo" },
  { keys: ["⌘", "D"], action: "Duplicate layer" },
  { keys: ["⌘", "E"], action: "Export" },
  { keys: ["Space"], action: "Pan canvas" },
  { keys: ["V"], action: "Select tool" },
  { keys: ["T"], action: "Text tool" },
];

export function HelpSettings() {
  return (
    <div className="space-y-6">
      <SettingsHeader 
        title="Help & About" 
        description="Resources, shortcuts, and information about AppLens"
      />

      <SettingsSection title="Keyboard Shortcuts" description="Master AppLens with these shortcuts">
        <div className="grid gap-2">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
              <span className="text-sm text-muted-foreground">{shortcut.action}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, i) => (
                  <kbd 
                    key={i} 
                    className="flex h-6 min-w-[24px] items-center justify-center rounded bg-card px-2 text-xs font-medium text-foreground border border-border"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4 w-full gap-2">
          <Keyboard className="h-4 w-4" />
          View All Shortcuts
        </Button>
      </SettingsSection>

      <SettingsSection title="Resources">
        <div className="grid gap-3 sm:grid-cols-2">
          <a 
            href="#" 
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Getting Started</p>
              <p className="text-xs text-muted-foreground">Learn the basics</p>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
          <a 
            href="#" 
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Documentation</p>
              <p className="text-xs text-muted-foreground">Full reference</p>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
          <a 
            href="#" 
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <MessageSquare className="h-5 w-5 text-purple-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Community</p>
              <p className="text-xs text-muted-foreground">Join Discord</p>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
          <a 
            href="#" 
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
              <Sparkles className="h-5 w-5 text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Templates</p>
              <p className="text-xs text-muted-foreground">Browse gallery</p>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
        </div>
      </SettingsSection>

      <SettingsSection title="Feedback">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 gap-2">
            <Bug className="h-4 w-4" />
            Report Bug
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Lightbulb className="h-4 w-4" />
            Feature Request
          </Button>
        </div>
      </SettingsSection>

      <SettingsSection title="About AppLens">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Version</span>
            <span className="text-sm font-medium text-foreground">2.4.1</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Build</span>
            <span className="text-sm font-mono text-muted-foreground">2024.02.05-abc123</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Environment</span>
            <span className="text-sm font-medium text-foreground">Production</span>
          </div>
          <Button variant="outline" className="w-full">
            View Changelog
          </Button>
        </div>
      </SettingsSection>

      <div className="text-center text-sm text-muted-foreground">
        <p>Made with ❤️ for app developers</p>
        <p className="mt-1">© 2024 AppLens. All rights reserved.</p>
      </div>
    </div>
  );
}
