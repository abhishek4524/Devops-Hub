import { useState } from "react";
import { Menu, X, Sun, Moon, Code2 } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const navItems = [
  { id: "intro", label: "DevOps" },
  { id: "git", label: "Git" },
  { id: "cicd", label: "CI/CD" },
  { id: "docker", label: "Docker" },
  { id: "kubernetes", label: "K8s" },
  { id: "cloud-models", label: "Cloud" },
  { id: "cloud-providers", label: "Providers" },
  { id: "iac", label: "IaC" },
  { id: "monitoring", label: "Monitoring" },
  { id: "security", label: "Security" },
  { id: "quiz", label: "Quiz" },
  { id: "terminal", label: "Terminal" },
];

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm hidden sm:block text-foreground">DevOps Hub</span>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                data-testid={`nav-${item.id}`}
                className={`nav-link px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              data-testid="btn-toggle-theme"
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="btn-mobile-menu"
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-3 pt-1 border-t border-border">
            <div className="grid grid-cols-3 gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-2 py-1.5 rounded-md text-xs font-medium text-left transition-all ${
                    activeSection === item.id
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
