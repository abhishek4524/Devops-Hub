import SectionHeader from "@/components/SectionHeader";

export default function SecuritySection() {
  return (
    <section>
      <SectionHeader
        id="security"
        icon="🔐"
        title="Best Practices & Security"
        subtitle="DevSecOps integrates security into every phase of the DevOps lifecycle. Shifting security left means catching vulnerabilities early — when they're cheap to fix — rather than at the end."
      />

      <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl p-5 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-3xl">🎯</span>
          <div>
            <h3 className="font-bold text-foreground mb-1">Shift Left Security</h3>
            <p className="text-sm text-muted-foreground">
              The cost of fixing a security vulnerability grows exponentially the later it's discovered. A bug found in development costs ~$80 to fix. In production, that same bug can cost $7,600 or more. Shift security checks to the earliest possible stage.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[
          {
            icon: "🔍",
            title: "SAST (Static Analysis)",
            color: "bg-blue-500/10 border-blue-500/20",
            titleColor: "text-blue-500",
            items: ["Scan code for vulnerabilities before it runs", "Integrate into IDE and CI pipeline", "Tools: Snyk, SonarQube, Semgrep, CodeQL"],
          },
          {
            icon: "🌐",
            title: "DAST (Dynamic Analysis)",
            color: "bg-purple-500/10 border-purple-500/20",
            titleColor: "text-purple-500",
            items: ["Test running applications for vulnerabilities", "Find injection, XSS, auth bypass issues", "Tools: OWASP ZAP, Burp Suite, Nuclei"],
          },
          {
            icon: "📦",
            title: "Dependency Scanning",
            color: "bg-yellow-500/10 border-yellow-500/20",
            titleColor: "text-yellow-600",
            items: ["Check libraries for known CVEs", "Automate updates with Dependabot", "Tools: Snyk, Trivy, OWASP Dependency-Check"],
          },
          {
            icon: "🐳",
            title: "Container Security",
            color: "bg-cyan-500/10 border-cyan-500/20",
            titleColor: "text-cyan-600",
            items: ["Scan images before pushing to registry", "Use minimal base images (distroless)", "Tools: Trivy, Grype, Clair, Anchore"],
          },
        ].map(c => (
          <div key={c.title} className={`feature-card rounded-xl border ${c.color} p-5`}>
            <div className="text-2xl mb-2">{c.icon}</div>
            <h3 className={`font-semibold mb-2 ${c.titleColor}`}>{c.title}</h3>
            <ul className="space-y-1.5">
              {c.items.map(item => (
                <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">→</span>{item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <h3 className="font-semibold mb-4 text-foreground">Secrets Management</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Never hardcode secrets in code or config files. Use dedicated secret management systems.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: "HashiCorp Vault", desc: "Open source, highly flexible, cloud-agnostic secrets engine", icon: "🔒" },
            { name: "AWS Secrets Manager", desc: "Native AWS integration, automatic rotation, fine-grained IAM", icon: "☁️" },
            { name: "Kubernetes Secrets", desc: "Store secrets in etcd with RBAC controls, encrypt at rest", icon: "☸️" },
          ].map(s => (
            <div key={s.name} className="bg-muted/50 rounded-lg p-3">
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="font-semibold text-sm text-foreground">{s.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold mb-4 text-foreground">DevSecOps Best Practices</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          {[
            "Never commit secrets to version control",
            "Use principle of least privilege for IAM",
            "Enable MFA for all user accounts",
            "Encrypt data in transit (TLS 1.3) and at rest",
            "Rotate credentials and tokens regularly",
            "Use image signing and verification (Cosign)",
            "Implement network segmentation and zero trust",
            "Log all access to sensitive resources",
            "Run containers as non-root user",
            "Keep base images updated weekly",
            "Use read-only file systems where possible",
            "Implement WAF in front of web services",
          ].map(practice => (
            <div key={practice} className="flex items-start gap-2 py-2 border-b border-border/50 last:border-0">
              <span className="text-green-500 text-sm mt-0.5">✓</span>
              <span className="text-sm text-muted-foreground">{practice}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
