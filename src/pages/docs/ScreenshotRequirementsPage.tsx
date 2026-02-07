import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Smartphone, 
  Tablet, 
  Monitor,
  Copy,
  CheckCircle,
  ChevronRight,
  Home,
  Info,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function ScreenshotRequirementsPage() {
  const [copiedDimension, setCopiedDimension] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDimension(label);
    toast.success(`${label} dimensions copied!`);
    setTimeout(() => setCopiedDimension(null), 2000);
  };

  const iphoneScreenshots = [
    {
      display: "iPhone 6.7\"",
      devices: "iPhone 14 Pro Max, 15 Pro Max, 16 Pro Max",
      size: "1290 × 2796",
      points: "393 × 852 @3x"
    },
    {
      display: "iPhone 6.5\"",
      devices: "iPhone 11 Pro Max, 12/13/14 Plus",
      size: "1242 × 2688",
      points: "414 × 896 @3x"
    },
    {
      display: "iPhone 6.1\"",
      devices: "iPhone 12/13/14/15/16 Pro",
      size: "1179 × 2556",
      points: "393 × 852 @3x"
    },
    {
      display: "iPhone 5.5\"",
      devices: "iPhone 6s/7/8 Plus",
      size: "1242 × 2208",
      points: "414 × 736 @3x"
    }
  ];

  const ipadScreenshots = [
    {
      display: "iPad Pro 12.9\"",
      devices: "iPad Pro 12.9-inch (3rd Gen+)",
      size: "2048 × 2732",
      points: "1024 × 1366 @2x"
    },
    {
      display: "iPad Pro 11\"",
      devices: "iPad Pro 11-inch, iPad Air (4th+)",
      size: "1668 × 2388",
      points: "834 × 1194 @2x"
    },
    {
      display: "iPad 10.9\"",
      devices: "iPad (10th generation)",
      size: "1640 × 2360",
      points: "820 × 1180 @2x"
    }
  ];

  const androidPhoneScreenshots = [
    {
      display: "Android Phone Standard",
      devices: "Pixel 4/5/6/7, Galaxy S21/S22/S23",
      size: "1080 × 1920",
      notes: "Minimum required size"
    },
    {
      display: "Android Phone Large",
      devices: "Galaxy S24 Ultra, Pixel 7/8 Pro",
      size: "1440 × 3120",
      notes: "High resolution"
    }
  ];

  const androidTabletScreenshots = [
    {
      display: "Android Tablet 10\"",
      devices: "Galaxy Tab S8, Pixel Tablet",
      size: "1200 × 1920",
      notes: "Minimum required size"
    },
    {
      display: "Android Tablet Large",
      devices: "Galaxy Tab S8+/S9+",
      size: "1600 × 2560",
      notes: "High resolution"
    }
  ];

  const bestPractices = [
    {
      title: "Use Native Resolution",
      description: "Don't resize or compress screenshots before uploading. Use the exact dimensions from your device."
    },
    {
      title: "Clean Status Bar",
      description: "Use a clean status bar or hide it for professional-looking screenshots."
    },
    {
      title: "Consistent Content",
      description: "Use the same app content across all device sizes for a cohesive look."
    },
    {
      title: "PNG Format",
      description: "Always use PNG format for best quality. Avoid JPG compression."
    },
    {
      title: "Light/Dark Mode",
      description: "Capture both modes if your app supports them for complete coverage."
    },
    {
      title: "Safe Areas",
      description: "Keep important content away from edges and notch areas."
    }
  ];

  const DimensionCard = ({ display, devices, size, points, notes }: { 
    display: string; 
    devices: string; 
    size: string; 
    points?: string;
    notes?: string;
  }) => (
    <div className="bg-card rounded-xl border border-border p-5 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg">{display}</h3>
        <button
          onClick={() => copyToClipboard(size.replace(" × ", "x"), display)}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
          title="Copy dimensions"
        >
          {copiedDimension === display ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{devices}</p>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl font-mono font-bold text-primary">{size}</span>
        <span className="text-sm text-muted-foreground">pixels</span>
      </div>
      {points && (
        <p className="text-xs text-muted-foreground">{points}</p>
      )}
      {notes && (
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <Info className="h-3 w-3" />
          {notes}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                <Home className="h-5 w-5" />
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Documentation</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Screenshot Requirements</span>
            </div>
            <Link to="/templates">
              <Button>
                Browse Templates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-6">
            <Monitor className="h-4 w-4" />
            Reference Guide
          </div>
          <h1 className="text-4xl font-bold mb-4">Screenshot Requirements</h1>
          <p className="text-xl text-muted-foreground">
            Capture screenshots at the correct dimensions for perfect device frame fitting in AppLens templates.
          </p>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-primary/5 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl bg-card border border-border p-6 font-mono text-sm">
            <h2 className="font-sans font-semibold text-lg mb-4">Quick Reference</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">iPhone 6.7"</span>
                <span className="font-bold">1290 × 2796</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">iPhone 6.5"</span>
                <span className="font-bold">1242 × 2688</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">iPad Pro 12.9"</span>
                <span className="font-bold">2048 × 2732</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">iPad Pro 11"</span>
                <span className="font-bold">1668 × 2388</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Android Phone</span>
                <span className="font-bold">1080 × 1920</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Android Tablet</span>
                <span className="font-bold">1200 × 1920</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* iPhone Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Smartphone className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">iPhone Screenshots</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {iphoneScreenshots.map((item) => (
              <DimensionCard key={item.display} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* iPad Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Tablet className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">iPad Screenshots</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ipadScreenshots.map((item) => (
              <DimensionCard key={item.display} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Android Phone Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Smartphone className="h-6 w-6 text-green-500" />
            <h2 className="text-2xl font-bold">Android Phone Screenshots</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {androidPhoneScreenshots.map((item) => (
              <DimensionCard key={item.display} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Android Tablet Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Tablet className="h-6 w-6 text-green-500" />
            <h2 className="text-2xl font-bold">Android Tablet Screenshots</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {androidTabletScreenshots.map((item) => (
              <DimensionCard key={item.display} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* How to Capture */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">How to Capture Screenshots</h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* iOS */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold">iOS (Xcode Simulator)</h3>
              </div>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">1</span>
                  <span>Open Xcode → Window → Devices and Simulators</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">2</span>
                  <span>Select your target simulator device</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">3</span>
                  <span>Run your app in the simulator</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">4</span>
                  <span>Press <kbd className="px-2 py-0.5 rounded bg-secondary text-xs font-mono">⌘ + S</kbd> to capture</span>
                </li>
              </ol>
            </div>

            {/* Android */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold">Android (Android Studio)</h3>
              </div>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 text-green-500 text-xs flex items-center justify-center font-medium">1</span>
                  <span>Open Android Studio → AVD Manager</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 text-green-500 text-xs flex items-center justify-center font-medium">2</span>
                  <span>Start your target emulator</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 text-green-500 text-xs flex items-center justify-center font-medium">3</span>
                  <span>Run your app</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 text-green-500 text-xs flex items-center justify-center font-medium">4</span>
                  <span>Click <strong>Camera icon</strong> or press <kbd className="px-2 py-0.5 rounded bg-secondary text-xs font-mono">⌘ + S</kbd></span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Best Practices</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bestPractices.map((practice) => (
              <div key={practice.title} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">{practice.title}</h3>
                    <p className="text-sm text-muted-foreground">{practice.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Troubleshooting</h2>
          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Screenshot doesn't fit in frame</h3>
                  <p className="text-sm text-muted-foreground">
                    Verify your screenshot matches the exact dimensions listed above. Check that you haven't cropped or resized the screenshot. Ensure the correct template is selected for your device.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Screenshot appears blurry</h3>
                  <p className="text-sm text-muted-foreground">
                    Use @2x or @3x resolution screenshots. Don't compress images before uploading. Verify PNG format is used (not JPG).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Create?</h2>
          <p className="text-muted-foreground mb-6">
            Now that you know the requirements, start creating beautiful app screenshots.
          </p>
          <Link to="/templates">
            <Button size="lg" className="gap-2">
              Browse Templates
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AppLens. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/docs/getting-started" className="text-sm text-muted-foreground hover:text-foreground">
              Getting Started
            </Link>
            <Link to="/docs/screenshot-requirements" className="text-sm text-muted-foreground hover:text-foreground">
              Screenshot Guide
            </Link>
            <Link to="/settings" className="text-sm text-muted-foreground hover:text-foreground">
              Settings
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
