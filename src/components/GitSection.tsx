import SectionHeader from "@/components/SectionHeader";
import CodeBlock from "@/components/CodeBlock";
import MermaidDiagram from "@/components/MermaidDiagram";

const gitCommands = `# Clone a repository
git clone https://github.com/user/repo.git

# Check status
git status

# Stage changes
git add .
git add specific-file.js

# Commit changes
git commit -m "feat: add new feature"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main

# Create and switch to a new branch
git checkout -b feature/my-feature

# Merge a branch
git merge feature/my-feature

# View commit history
git log --oneline --graph --all`;

const gitWorkflow = `
gitGraph
   commit id: "Initial commit"
   branch develop
   checkout develop
   commit id: "Feature A start"
   branch feature/login
   checkout feature/login
   commit id: "Add login form"
   commit id: "Add auth logic"
   checkout develop
   merge feature/login id: "Merge login"
   branch feature/dashboard
   checkout feature/dashboard
   commit id: "Dashboard UI"
   checkout develop
   merge feature/dashboard id: "Merge dashboard"
   checkout main
   merge develop id: "Release v1.0"
   commit id: "Hotfix patch" tag: "v1.0.1"
`;

export default function GitSection() {
  return (
    <section>
      <SectionHeader
        id="git"
        icon="🌿"
        title="Version Control (Git)"
        subtitle="Git is the industry-standard distributed version control system. It tracks changes in source code, enables collaboration, and provides a complete history of your project."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { title: "Distributed", desc: "Every developer has a full copy of the repository including its complete history.", icon: "🌐" },
          { title: "Branching", desc: "Create lightweight branches to work on features, fixes, or experiments in isolation.", icon: "🌿" },
          { title: "History", desc: "Every change is tracked with author, date, and commit message for full accountability.", icon: "📜" },
        ].map(c => (
          <div key={c.title} className="feature-card bg-card border border-border rounded-xl p-5">
            <div className="text-2xl mb-2">{c.icon}</div>
            <h3 className="font-semibold text-foreground mb-1">{c.title}</h3>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>

      <CodeBlock code={gitCommands} language="bash" title="Essential Git Commands" />

      <MermaidDiagram chart={gitWorkflow} title="Git Branching Strategy" />

      <div className="mt-6 bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold mb-3 text-foreground">Branching Strategies</h3>
        <div className="space-y-3">
          {[
            { name: "Git Flow", desc: "Uses main, develop, feature, release, and hotfix branches. Great for versioned releases.", color: "text-blue-500" },
            { name: "GitHub Flow", desc: "Simpler — just main and feature branches with pull requests. Ideal for continuous deployment.", color: "text-green-500" },
            { name: "Trunk-Based", desc: "Everyone commits directly to main with very short-lived feature branches. For mature CI/CD teams.", color: "text-purple-500" },
          ].map(s => (
            <div key={s.name} className="flex gap-3 p-3 rounded-lg bg-muted/50">
              <div className={`font-semibold text-sm w-28 shrink-0 ${s.color}`}>{s.name}</div>
              <div className="text-sm text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
