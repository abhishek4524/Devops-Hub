import { ArrowDown, Zap, Cloud, Shield } from "lucide-react";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 border-b border-border">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Zap className="w-3.5 h-3.5" />
            Complete DevOps & Cloud Learning Path
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
            DevOps & Cloud
            <br />
            <span className="text-primary">Learning Hub</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Master modern DevOps practices and cloud computing — from Git workflows to Kubernetes, CI/CD pipelines to infrastructure as code. Interactive, visual, and hands-on.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {[
              { icon: Zap, label: "10 Topics" },
              { icon: Cloud, label: "Interactive Diagrams" },
              { icon: Shield, label: "Quiz Included" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary" />
                {label}
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollTo("intro")}
            data-testid="btn-start-learning"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Start Learning
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
