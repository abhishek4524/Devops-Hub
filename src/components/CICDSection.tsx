import SectionHeader from "@/components/SectionHeader";
import CodeBlock from "@/components/CodeBlock";
import MermaidDiagram from "@/components/MermaidDiagram";

const githubActionsYaml = `name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build

  deploy:
    needs: build-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: |
          echo "Deploying to production..."
          # Your deployment commands here`;

const pipelineDiagram = `
flowchart LR
  A[📝 Code Commit] --> B[🔍 Static Analysis]
  B --> C[🔨 Build]
  C --> D[🧪 Unit Tests]
  D --> E[🔗 Integration Tests]
  E --> F[📦 Docker Build]
  F --> G[🚀 Deploy Staging]
  G --> H{✅ Smoke Test}
  H -->|Pass| I[🌐 Deploy Production]
  H -->|Fail| J[🔔 Alert Team]
  style A fill:#3b82f6,color:#fff,stroke:none
  style I fill:#22c55e,color:#fff,stroke:none
  style J fill:#ef4444,color:#fff,stroke:none
`;

export default function CICDSection() {
  return (
    <section>
      <SectionHeader
        id="cicd"
        icon="🚀"
        title="CI/CD Pipeline"
        subtitle="Continuous Integration and Continuous Deployment automate the process of testing and releasing code. Every commit triggers an automated pipeline that builds, tests, and deploys your application."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="feature-card bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-blue-500 mb-2">Continuous Integration (CI)</h3>
          <p className="text-sm text-muted-foreground mb-3">Automatically build and test code with every commit.</p>
          <ul className="text-sm space-y-1.5 text-muted-foreground">
            {["Triggers on every push or PR", "Runs automated test suites", "Reports build status immediately", "Prevents broken code from merging"].map(i => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">→</span>{i}
              </li>
            ))}
          </ul>
        </div>
        <div className="feature-card bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-green-500 mb-2">Continuous Deployment (CD)</h3>
          <p className="text-sm text-muted-foreground mb-3">Automatically release validated code to production.</p>
          <ul className="text-sm space-y-1.5 text-muted-foreground">
            {["Deploys after all checks pass", "Zero-downtime rolling updates", "Rollback on failed health checks", "Multiple environment stages"].map(i => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">→</span>{i}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <MermaidDiagram chart={pipelineDiagram} title="CI/CD Pipeline Flow" />

      <div className="mt-6">
        <h3 className="font-semibold mb-3 text-foreground">GitHub Actions Workflow</h3>
        <CodeBlock code={githubActionsYaml} language="yaml" title=".github/workflows/ci-cd.yml" />
      </div>

      <div className="mt-6 bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold mb-3 text-foreground">Popular CI/CD Tools</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: "GitHub Actions", color: "bg-gray-800/10 text-gray-700 dark:text-gray-300" },
            { name: "Jenkins", color: "bg-red-500/10 text-red-600" },
            { name: "GitLab CI", color: "bg-orange-500/10 text-orange-600" },
            { name: "CircleCI", color: "bg-green-500/10 text-green-600" },
            { name: "ArgoCD", color: "bg-blue-500/10 text-blue-600" },
            { name: "Tekton", color: "bg-purple-500/10 text-purple-600" },
            { name: "Drone CI", color: "bg-cyan-500/10 text-cyan-600" },
            { name: "TeamCity", color: "bg-indigo-500/10 text-indigo-600" },
          ].map(tool => (
            <div key={tool.name} className={`text-center text-xs font-semibold px-3 py-2 rounded-lg ${tool.color.split(" ")[0]} ${tool.color.split(" ").slice(1).join(" ")}`}>
              {tool.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
