import { Code2, Heart } from "lucide-react";

export default function Footer() {
  const sections = [
    { id: "intro", label: "DevOps Intro" },
    { id: "git", label: "Git" },
    { id: "cicd", label: "CI/CD" },
    { id: "docker", label: "Docker" },
    { id: "kubernetes", label: "Kubernetes" },
    { id: "cloud-models", label: "Cloud Models" },
    { id: "cloud-providers", label: "Cloud Providers" },
    { id: "iac", label: "IaC" },
    { id: "monitoring", label: "Monitoring" },
    { id: "security", label: "Security" },
    { id: "quiz", label: "Quiz" },
    { id: "terminal", label: "Terminal" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-primary">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-foreground">DevOps Hub</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A complete, free, interactive learning resource for DevOps and cloud computing — covering everything from Git to Kubernetes, CI/CD to security.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Topics Covered</h4>
            <div className="grid grid-cols-2 gap-1">
              {sections.slice(0, 8).map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="text-left text-xs text-muted-foreground hover:text-primary transition-colors py-0.5"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Interactive Features</h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {[
                "Dark / Light mode toggle",
                "Mermaid.js interactive diagrams",
                "Copyable code snippets",
                "5-question knowledge quiz",
                "Command reference terminal",
                "Responsive mobile design",
              ].map(f => (
                <li key={f} className="flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">→</span>{f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            Built with <Heart className="w-3 h-3 text-red-500" /> for learners everywhere
          </div>
          <div className="flex flex-wrap gap-3 justify-center text-xs text-muted-foreground">
            {["DevOps", "Docker", "Kubernetes", "Terraform", "AWS"].map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-muted">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
