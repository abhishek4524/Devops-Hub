import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Copy, Check, Terminal } from "lucide-react";

const categories = [
  {
    label: "Docker",
    color: "text-cyan-400",
    commands: [
      { cmd: "docker ps", desc: "List running containers" },
      { cmd: "docker ps -a", desc: "List all containers (including stopped)" },
      { cmd: "docker images", desc: "List local images" },
      { cmd: "docker build -t myapp:latest .", desc: "Build image from Dockerfile" },
      { cmd: "docker run -d -p 3000:3000 myapp:latest", desc: "Run container in background" },
      { cmd: "docker exec -it <container_id> sh", desc: "Open shell in container" },
      { cmd: "docker logs -f <container_id>", desc: "Stream container logs" },
      { cmd: "docker stop <container_id>", desc: "Stop a running container" },
      { cmd: "docker rm <container_id>", desc: "Remove a stopped container" },
      { cmd: "docker system prune -a", desc: "Remove all unused resources" },
    ],
  },
  {
    label: "Kubernetes",
    color: "text-blue-400",
    commands: [
      { cmd: "kubectl get pods -n default", desc: "List pods in default namespace" },
      { cmd: "kubectl get all", desc: "Get all resources in namespace" },
      { cmd: "kubectl describe pod <pod-name>", desc: "Show pod details and events" },
      { cmd: "kubectl logs -f <pod-name>", desc: "Stream pod logs" },
      { cmd: "kubectl apply -f manifest.yaml", desc: "Apply a YAML manifest" },
      { cmd: "kubectl delete -f manifest.yaml", desc: "Delete resources from manifest" },
      { cmd: "kubectl scale deploy <name> --replicas=3", desc: "Scale a deployment" },
      { cmd: "kubectl get nodes -o wide", desc: "Show cluster nodes with IPs" },
      { cmd: "kubectl exec -it <pod> -- bash", desc: "Open shell in pod" },
      { cmd: "kubectl port-forward svc/web 8080:80", desc: "Port-forward to local machine" },
    ],
  },
  {
    label: "Git",
    color: "text-orange-400",
    commands: [
      { cmd: "git init", desc: "Initialize a new repository" },
      { cmd: "git clone <url>", desc: "Clone remote repository" },
      { cmd: "git status", desc: "Show working tree status" },
      { cmd: "git add .", desc: "Stage all changes" },
      { cmd: 'git commit -m "feat: add feature"', desc: "Commit with message" },
      { cmd: "git push origin main", desc: "Push to remote" },
      { cmd: "git pull --rebase origin main", desc: "Pull with rebase" },
      { cmd: "git checkout -b feature/new", desc: "Create and switch branch" },
      { cmd: "git log --oneline --graph --all", desc: "Visualize commit history" },
      { cmd: "git stash pop", desc: "Apply stashed changes" },
    ],
  },
  {
    label: "Terraform",
    color: "text-purple-400",
    commands: [
      { cmd: "terraform init", desc: "Initialize working directory" },
      { cmd: "terraform validate", desc: "Validate configuration files" },
      { cmd: "terraform plan", desc: "Preview changes (dry run)" },
      { cmd: "terraform apply", desc: "Apply planned changes" },
      { cmd: "terraform apply -auto-approve", desc: "Apply without confirmation" },
      { cmd: "terraform destroy", desc: "Destroy all managed resources" },
      { cmd: "terraform show", desc: "Show current state" },
      { cmd: "terraform state list", desc: "List resources in state" },
      { cmd: "terraform fmt", desc: "Format .tf files" },
      { cmd: "terraform output", desc: "Show output values" },
    ],
  },
];

interface CopyState {
  [key: string]: boolean;
}

export default function TerminalSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState<CopyState>({});

  const handleCopy = async (cmd: string, key: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(prev => ({ ...prev, [key]: true }));
      setTimeout(() => setCopied(prev => ({ ...prev, [key]: false })), 2000);
    } catch {}
  };

  const active = categories[activeTab];

  return (
    <section>
      <SectionHeader
        id="terminal"
        icon="💻"
        title="Try It Yourself"
        subtitle="Browse essential commands across Docker, Kubernetes, Git, and Terraform. Click any command to copy it to your clipboard."
      />

      <div className="terminal overflow-hidden">
        <div className="terminal-header">
          <div className="terminal-dot bg-red-500" />
          <div className="terminal-dot bg-yellow-500" />
          <div className="terminal-dot bg-green-500" />
          <div className="flex items-center gap-1 ml-3">
            <Terminal className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400 font-mono">bash — devops@hub</span>
          </div>
        </div>

        <div className="flex border-b border-gray-700/60 bg-gray-900/50">
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveTab(i)}
              data-testid={`btn-terminal-tab-${cat.label.toLowerCase()}`}
              className={`px-4 py-2.5 text-xs font-semibold font-mono transition-all border-b-2 ${
                activeTab === i
                  ? `border-current ${cat.color} bg-gray-800/50`
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="p-4 space-y-1.5 max-h-96 overflow-y-auto">
          {active.commands.map((item, i) => {
            const key = `${activeTab}-${i}`;
            return (
              <button
                key={i}
                onClick={() => handleCopy(item.cmd, key)}
                data-testid={`btn-terminal-cmd-${i}`}
                className="w-full text-left group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all"
              >
                <span className={`text-sm font-mono ${active.color} shrink-0`}>$</span>
                <span className="text-sm font-mono text-gray-200 flex-1 min-w-0 truncate">{item.cmd}</span>
                <span className="text-xs text-gray-500 shrink-0 hidden sm:block">{item.desc}</span>
                <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  {copied[key] ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="px-4 py-2 border-t border-gray-700/60 bg-gray-900/50">
          <p className="text-xs text-gray-500 font-mono">
            <span className="text-green-400">✓</span> Click any command to copy it to your clipboard
          </p>
        </div>
      </div>

      <div className="mt-6 bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold mb-3 text-foreground">Helpful Resources</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { name: "Docker Docs", url: "https://docs.docker.com", icon: "🐳" },
            { name: "Kubernetes Docs", url: "https://kubernetes.io/docs", icon: "☸️" },
            { name: "Terraform Registry", url: "https://registry.terraform.io", icon: "🏗️" },
            { name: "GitHub Actions", url: "https://docs.github.com/actions", icon: "🚀" },
            { name: "AWS Free Tier", url: "https://aws.amazon.com/free", icon: "☁️" },
            { name: "Play with Docker", url: "https://labs.play-with-docker.com", icon: "🎮" },
          ].map(r => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-resource-${r.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-muted hover:bg-muted/70 transition-all text-sm font-medium text-foreground"
            >
              <span>{r.icon}</span>
              <span>{r.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
