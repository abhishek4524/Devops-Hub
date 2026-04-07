import SectionHeader from "@/components/SectionHeader";
import MermaidDiagram from "@/components/MermaidDiagram";

const devopsLoop = `
graph LR
  A([Plan]) --> B([Code])
  B --> C([Build])
  C --> D([Test])
  D --> E([Release])
  E --> F([Deploy])
  F --> G([Operate])
  G --> H([Monitor])
  H --> A
  style A fill:#3b82f6,color:#fff,stroke:none
  style B fill:#6366f1,color:#fff,stroke:none
  style C fill:#8b5cf6,color:#fff,stroke:none
  style D fill:#a855f7,color:#fff,stroke:none
  style E fill:#ec4899,color:#fff,stroke:none
  style F fill:#ef4444,color:#fff,stroke:none
  style G fill:#f97316,color:#fff,stroke:none
  style H fill:#eab308,color:#fff,stroke:none
`;

const benefits = [
  { emoji: "⚡", title: "Faster Delivery", desc: "Ship code daily instead of monthly with automated pipelines." },
  { emoji: "🔒", title: "Higher Reliability", desc: "Catch bugs early with automated testing and staged rollouts." },
  { emoji: "🤝", title: "Better Collaboration", desc: "Dev and Ops teams work together through shared processes." },
  { emoji: "📊", title: "Full Visibility", desc: "Monitor every layer of your stack in real time." },
];

export default function IntroSection() {
  return (
    <section>
      <SectionHeader
        id="intro"
        icon="🔄"
        title="Introduction to DevOps"
        subtitle="DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the development lifecycle and deliver high-quality software continuously."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {benefits.map(b => (
          <div key={b.title} className="feature-card bg-card border border-border rounded-xl p-5">
            <div className="text-2xl mb-3">{b.emoji}</div>
            <h3 className="font-semibold text-foreground mb-1">{b.title}</h3>
            <p className="text-sm text-muted-foreground">{b.desc}</p>
          </div>
        ))}
      </div>

      <MermaidDiagram chart={devopsLoop} title="DevOps Infinity Loop" />

      <div className="mt-6 bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold mb-3 text-foreground">The 8 Phases of DevOps</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { phase: "Plan", color: "bg-blue-500/10 text-blue-500", desc: "Define requirements, roadmap" },
            { phase: "Code", color: "bg-indigo-500/10 text-indigo-500", desc: "Write and review code" },
            { phase: "Build", color: "bg-violet-500/10 text-violet-500", desc: "Compile and package" },
            { phase: "Test", color: "bg-purple-500/10 text-purple-500", desc: "Automated quality checks" },
            { phase: "Release", color: "bg-pink-500/10 text-pink-500", desc: "Version and stage" },
            { phase: "Deploy", color: "bg-red-500/10 text-red-500", desc: "Push to production" },
            { phase: "Operate", color: "bg-orange-500/10 text-orange-500", desc: "Manage live systems" },
            { phase: "Monitor", color: "bg-yellow-500/10 text-yellow-500", desc: "Observe and alert" },
          ].map(item => (
            <div key={item.phase} className={`rounded-lg p-3 ${item.color.split(" ")[0]}`}>
              <div className={`font-semibold text-sm ${item.color.split(" ")[1]}`}>{item.phase}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
