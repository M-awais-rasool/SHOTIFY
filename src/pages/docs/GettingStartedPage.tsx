import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Upload, 
  Palette, 
  Download, 
  Sparkles,
  CheckCircle,
  Monitor,
  Smartphone,
  Tablet,
  Image,
  Layers,
  Type,
  Square,
  ChevronRight,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GettingStartedPage() {
  const steps = [
    {
      number: 1,
      title: "Choose a Template",
      description: "Browse our collection of professionally designed templates for iOS and Android. Each template is optimized for App Store and Play Store requirements.",
      icon: Palette,
      tips: [
        "Templates are categorized by device type (iPhone, iPad, Android Phone, Tablet)",
        "Each template includes device frames, text areas, and gradient backgrounds",
        "Preview templates before selecting to see the full design"
      ]
    },
    {
      number: 2,
      title: "Upload Your Screenshots",
      description: "Upload your app screenshots to replace the placeholder images. Make sure your screenshots match the required dimensions for best results.",
      icon: Upload,
      tips: [
        "Use the exact dimensions specified in our Screenshot Requirements guide",
        "PNG format is recommended for best quality",
        "You can upload multiple screenshots for different slides"
      ]
    },
    {
      number: 3,
      title: "Customize Your Design",
      description: "Edit text, colors, and positioning to match your brand. Add headlines, adjust the device frame position, and fine-tune every detail.",
      icon: Sparkles,
      tips: [
        "Double-click text layers to edit content",
        "Use the color picker to match your brand colors",
        "Drag elements to reposition them on the canvas"
      ]
    },
    {
      number: 4,
      title: "Export Your Screenshots",
      description: "Export your finished screenshots in the correct format and resolution for direct upload to the App Store or Play Store.",
      icon: Download,
      tips: [
        "Export at the original resolution for best quality",
        "PNG format is recommended for app stores",
        "You can export individual slides or all at once"
      ]
    }
  ];

  const features = [
    {
      icon: Layers,
      title: "Layer-Based Editing",
      description: "Work with individual layers for precise control over every element"
    },
    {
      icon: Type,
      title: "Rich Text Editing",
      description: "Customize fonts, sizes, colors, and alignment for your headlines"
    },
    {
      icon: Image,
      title: "Smart Image Placement",
      description: "Screenshots automatically fit within device frames"
    },
    {
      icon: Square,
      title: "Shape Tools",
      description: "Add rectangles, circles, and other shapes to enhance your designs"
    }
  ];

  const deviceTypes = [
    { icon: Smartphone, name: "iPhone", sizes: ["6.7\"", "6.5\"", "6.1\"", "5.5\""] },
    { icon: Tablet, name: "iPad", sizes: ["12.9\"", "11\"", "10.9\""] },
    { icon: Smartphone, name: "Android Phone", sizes: ["1080p", "1440p"] },
    { icon: Tablet, name: "Android Tablet", sizes: ["10\"", "Large"] }
  ];

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
              <span className="text-muted-foreground">Getting Started</span>
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Welcome to AppLens
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Create Stunning App Store Screenshots
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            AppLens helps you create professional, eye-catching screenshots for the App Store and Play Store in minutes. No design skills required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/templates">
              <Button size="lg" className="gap-2">
                <Palette className="h-5 w-5" />
                Start Creating
              </Button>
            </Link>
            <Link to="/docs/screenshot-requirements">
              <Button size="lg" variant="outline" className="gap-2">
                <Monitor className="h-5 w-5" />
                Screenshot Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create professional app screenshots in four simple steps
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="bg-card rounded-2xl border border-border p-6 sm:p-8"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        Step {step.number}
                      </span>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <div className="space-y-2">
                      {step.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create professional app screenshots
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="bg-card rounded-xl border border-border p-6 text-center hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Devices */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Supported Devices</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create screenshots for all major device types and sizes
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deviceTypes.map((device) => (
              <div 
                key={device.name}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <device.icon className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">{device.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {device.sizes.map((size) => (
                    <span 
                      key={size}
                      className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/docs/screenshot-requirements">
              <Button variant="outline" className="gap-2">
                View All Dimensions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Create your first professional app screenshot in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/templates">
              <Button size="lg" className="gap-2">
                Browse Templates
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/docs/screenshot-requirements">
              <Button size="lg" variant="outline">
                Screenshot Requirements
              </Button>
            </Link>
          </div>
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
