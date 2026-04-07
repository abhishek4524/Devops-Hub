import SectionHeader from "@/components/SectionHeader";

const models = [
  {
    name: "IaaS",
    full: "Infrastructure as a Service",
    color: "border-blue-500 bg-blue-500/5",
    headerColor: "bg-blue-500 text-white",
    icon: "🏗️",
    desc: "You rent virtualized hardware — compute, storage, networking. You manage the OS, runtime, and apps.",
    examples: ["AWS EC2", "Azure VMs", "Google Compute Engine", "DigitalOcean Droplets"],
    pros: ["Full control over infrastructure", "Highly flexible and customizable", "Good for custom OS/software needs"],
    cons: ["You manage OS patches and updates", "More operational overhead", "Requires more expertise"],
    manages: ["Applications", "Runtime", "OS", "Middleware"],
    vendor: ["Virtualization", "Servers", "Storage", "Networking"],
  },
  {
    name: "PaaS",
    full: "Platform as a Service",
    color: "border-purple-500 bg-purple-500/5",
    headerColor: "bg-purple-500 text-white",
    icon: "🛠️",
    desc: "You deploy your code and data. The provider manages the platform — OS, runtime, scaling, and middleware.",
    examples: ["Heroku", "Google App Engine", "AWS Elastic Beanstalk", "Railway"],
    pros: ["Focus on code not infrastructure", "Auto-scaling built in", "Faster time to market"],
    cons: ["Less control over infrastructure", "Vendor lock-in risk", "Can be costlier at scale"],
    manages: ["Applications", "Data"],
    vendor: ["Runtime", "OS", "Middleware", "Virtualization", "Servers", "Storage", "Networking"],
  },
  {
    name: "SaaS",
    full: "Software as a Service",
    color: "border-green-500 bg-green-500/5",
    headerColor: "bg-green-500 text-white",
    icon: "☁️",
    desc: "A fully managed application delivered over the internet. You just use the software — nothing to install or maintain.",
    examples: ["Gmail", "Salesforce", "Slack", "GitHub", "Figma"],
    pros: ["Zero infrastructure management", "Always up to date", "Access from anywhere"],
    cons: ["Limited customization", "Data privacy concerns", "Dependent on vendor uptime"],
    manages: [],
    vendor: ["Applications", "Runtime", "OS", "Middleware", "Virtualization", "Servers", "Storage", "Networking"],
  },
];

export default function CloudModelsSection() {
  return (
    <section>
      <SectionHeader
        id="cloud-models"
        icon="☁️"
        title="Cloud Computing Models"
        subtitle="Cloud services come in three primary delivery models, each offering a different balance of control, flexibility, and management responsibility."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {models.map(m => (
          <div key={m.name} className={`feature-card rounded-xl border-2 ${m.color} overflow-hidden`}>
            <div className={`px-5 py-4 ${m.headerColor}`}>
              <div className="text-2xl mb-1">{m.icon}</div>
              <div className="font-bold text-lg">{m.name}</div>
              <div className="text-sm opacity-90">{m.full}</div>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-muted-foreground">{m.desc}</p>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Examples</div>
                <div className="flex flex-wrap gap-1.5">
                  {m.examples.map(e => (
                    <span key={e} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{e}</span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">You Manage</div>
                <div className="space-y-1">
                  {m.manages.length > 0 ? m.manages.map(l => (
                    <div key={l} className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">{l}</div>
                  )) : <div className="text-xs text-muted-foreground italic">Nothing — fully managed</div>}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Pros</div>
                <ul className="space-y-1">
                  {m.pros.map(p => (
                    <li key={p} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <span className="text-green-500 mt-0.5">✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/50">
          <h3 className="font-semibold text-sm text-foreground">Responsibility Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm comparison-table">
            <thead>
              <tr>
                <th className="text-left p-3 text-muted-foreground font-medium">Layer</th>
                <th className="text-center p-3 text-blue-500 font-semibold">IaaS</th>
                <th className="text-center p-3 text-purple-500 font-semibold">PaaS</th>
                <th className="text-center p-3 text-green-500 font-semibold">SaaS</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Applications", "You", "You", "Vendor"],
                ["Data", "You", "You", "Vendor"],
                ["Runtime", "You", "Vendor", "Vendor"],
                ["Middleware", "You", "Vendor", "Vendor"],
                ["Operating System", "You", "Vendor", "Vendor"],
                ["Virtualization", "Vendor", "Vendor", "Vendor"],
                ["Servers", "Vendor", "Vendor", "Vendor"],
                ["Storage", "Vendor", "Vendor", "Vendor"],
                ["Networking", "Vendor", "Vendor", "Vendor"],
              ].map(([layer, iaas, paas, saas]) => (
                <tr key={layer} className="border-t border-border">
                  <td className="p-3 text-muted-foreground">{layer}</td>
                  {[iaas, paas, saas].map((v, i) => (
                    <td key={i} className="p-3 text-center">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        v === "You"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "bg-gray-500/10 text-gray-500"
                      }`}>
                        {v}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
