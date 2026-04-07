import SectionHeader from "@/components/SectionHeader";

const providers = [
  {
    name: "Amazon Web Services",
    short: "AWS",
    emoji: "🟡",
    color: "border-yellow-500 bg-yellow-500/5",
    badge: "bg-yellow-500 text-white",
    tagline: "Most mature cloud with widest service selection",
    services: [
      { cat: "Compute", items: ["EC2 (VMs)", "Lambda (Serverless)", "ECS/EKS (Containers)", "Fargate"] },
      { cat: "Storage", items: ["S3 (Object)", "EBS (Block)", "EFS (File)", "Glacier (Archive)"] },
      { cat: "Database", items: ["RDS", "DynamoDB", "Aurora", "ElastiCache"] },
      { cat: "Networking", items: ["VPC", "CloudFront (CDN)", "Route 53", "ELB"] },
    ],
    market: "33%",
  },
  {
    name: "Microsoft Azure",
    short: "Azure",
    emoji: "🔵",
    color: "border-blue-500 bg-blue-500/5",
    badge: "bg-blue-500 text-white",
    tagline: "Best for enterprises already using Microsoft products",
    services: [
      { cat: "Compute", items: ["Azure VMs", "Azure Functions", "AKS (Kubernetes)", "App Service"] },
      { cat: "Storage", items: ["Blob Storage", "Azure Files", "Disk Storage", "Archive Storage"] },
      { cat: "Database", items: ["Azure SQL", "Cosmos DB", "PostgreSQL", "Redis Cache"] },
      { cat: "Networking", items: ["Virtual Network", "Azure CDN", "DNS", "Load Balancer"] },
    ],
    market: "22%",
  },
  {
    name: "Google Cloud Platform",
    short: "GCP",
    emoji: "🔴",
    color: "border-red-500 bg-red-500/5",
    badge: "bg-red-500 text-white",
    tagline: "Leader in AI/ML, data analytics, and Kubernetes",
    services: [
      { cat: "Compute", items: ["Compute Engine", "Cloud Functions", "GKE (Kubernetes)", "Cloud Run"] },
      { cat: "Storage", items: ["Cloud Storage", "Persistent Disk", "Filestore", "Coldline"] },
      { cat: "Database", items: ["Cloud SQL", "Firestore", "Bigtable", "Spanner"] },
      { cat: "Networking", items: ["VPC", "Cloud CDN", "Cloud DNS", "Load Balancing"] },
    ],
    market: "11%",
  },
];

export default function CloudProvidersSection() {
  return (
    <section>
      <SectionHeader
        id="cloud-providers"
        icon="🌍"
        title="Major Cloud Providers"
        subtitle="AWS, Azure, and GCP are the three dominant cloud platforms, each with hundreds of services across compute, storage, networking, AI/ML, and more."
      />

      <div className="grid grid-cols-1 gap-6">
        {providers.map(p => (
          <div key={p.short} className={`feature-card rounded-xl border-2 ${p.color} overflow-hidden`}>
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{p.emoji}</span>
                    <h3 className="font-bold text-foreground text-lg">{p.short}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.badge}`}>{p.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.tagline}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">{p.market}</div>
                  <div className="text-xs text-muted-foreground">Market Share</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {p.services.map(s => (
                  <div key={s.cat} className="bg-background/60 rounded-lg p-3">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">{s.cat}</div>
                    <ul className="space-y-1">
                      {s.items.map(item => (
                        <li key={item} className="text-xs text-foreground">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold mb-4 text-foreground">Quick Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-muted-foreground">Strength</th>
                <th className="text-center p-3 text-yellow-500">AWS</th>
                <th className="text-center p-3 text-blue-500">Azure</th>
                <th className="text-center p-3 text-red-500">GCP</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Maturity & breadth", "⭐⭐⭐", "⭐⭐⭐", "⭐⭐"],
                ["Enterprise integration", "⭐⭐", "⭐⭐⭐", "⭐⭐"],
                ["AI / ML services", "⭐⭐", "⭐⭐", "⭐⭐⭐"],
                ["Kubernetes (GKE/AKS/EKS)", "⭐⭐", "⭐⭐", "⭐⭐⭐"],
                ["Free tier generosity", "⭐⭐", "⭐⭐", "⭐⭐⭐"],
                ["Global regions", "⭐⭐⭐", "⭐⭐⭐", "⭐⭐"],
              ].map(([feat, aws, az, gcp]) => (
                <tr key={feat} className="border-t border-border">
                  <td className="p-3 text-muted-foreground">{feat}</td>
                  <td className="p-3 text-center">{aws}</td>
                  <td className="p-3 text-center">{az}</td>
                  <td className="p-3 text-center">{gcp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
