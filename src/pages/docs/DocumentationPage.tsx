import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  BookOpen,
  FileText,
  Image,
  Keyboard,
  MessageSquare,
  HelpCircle,
  Home,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocumentationPage() {
  const docSections = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of AppLens and create your first app screenshot in minutes.",
      link: "/docs/getting-started",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Image,
      title: "Screenshot Requirements",
      description: "Detailed specifications for capturing screenshots at the correct dimensions.",
      link: "/docs/screenshot-requirements",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Keyboard,
      title: "Keyboard Shortcuts",
      description: "Master AppLens with these time-saving keyboard shortcuts.",
      link: "/settings?tab=help",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: MessageSquare,
      title: "Help & Support",
      description: "Get help, report bugs, or request new features.",
      link: "/settings?tab=help",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  const quickLinks = [
    { title: "iPhone Screenshot Sizes", link: "/docs/screenshot-requirements#iphone" },
    { title: "iPad Screenshot Sizes", link: "/docs/screenshot-requirements#ipad" },
    { title: "Android Screenshot Sizes", link: "/docs/screenshot-requirements#android" },
    { title: "How to Capture Screenshots", link: "/docs/screenshot-requirements#capture" },
    { title: "Best Practices", link: "/docs/screenshot-requirements#best-practices" },
    { title: "Troubleshooting", link: "/docs/screenshot-requirements#troubleshooting" }
  ];

  const faqItems = [
    {
      question: "What dimensions should my screenshots be?",
      answer: "Screenshot dimensions depend on the device. For iPhone 6.5\", use 1242 × 2688 pixels. For Android phones, 1080 × 1920 is the minimum. Check our Screenshot Requirements page for all sizes."
    },
    {
      question: "What image format should I use?",
      answer: "PNG format is recommended for best quality. Avoid JPG as it uses lossy compression which can reduce image quality."
    },
    {
      question: "Can I use screenshots from a physical device?",
      answer: "Yes! Both simulator/emulator and physical device screenshots work. Just make sure the resolution matches the required dimensions."
    },
    {
      question: "Why doesn't my screenshot fit the device frame?",
      answer: "Ensure your screenshot matches the exact dimensions for your selected template. Check that you haven't cropped or resized the image."
    },
    {
      question: "How do I export my finished screenshots?",
      answer: "Click the Export button in the editor. You can export individual slides or all slides at once in PNG format at the original resolution."
    },
    {
      question: "Can I create screenshots for both iOS and Android?",
      answer: "Yes! AppLens supports templates for iPhone, iPad, Android phones, and Android tablets. Simply choose the appropriate template for each platform."
    }
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
            <FileText className="h-4 w-4" />
            Documentation
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            AppLens Documentation
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Everything you need to know about creating beautiful app store screenshots with AppLens.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/docs/getting-started">
              <Button size="lg" className="gap-2">
                <BookOpen className="h-5 w-5" />
                Getting Started
              </Button>
            </Link>
            <Link to="/docs/screenshot-requirements">
              <Button size="lg" variant="outline" className="gap-2">
                <Image className="h-5 w-5" />
                Screenshot Requirements
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Doc Sections */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {docSections.map((section) => (
              <Link
                key={section.title}
                to={section.link}
                className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${section.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <section.icon className={`h-6 w-6 ${section.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-muted-foreground text-sm">{section.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((item) => (
              <Link
                key={item.title}
                to={item.link}
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors group"
              >
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl border border-border p-5"
              >
                <h3 className="font-semibold mb-2">{item.question}</h3>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Need More Help */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/settings?tab=help">
              <Button variant="outline" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Contact Support
              </Button>
            </Link>
            <Link to="/settings?tab=help">
              <Button variant="outline" className="gap-2">
                <HelpCircle className="h-4 w-4" />
                Submit Feedback
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
