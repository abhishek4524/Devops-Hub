import SectionHeader from "@/components/SectionHeader";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodeBlock from "@/components/CodeBlock";

const prometheusConfig = `# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']

rule_files:
  - "alert_rules.yml"

scrape_configs:
  - job_name: 'web-app'
    static_configs:
      - targets: ['web-app:3000']
    metrics_path: '/metrics'

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod`;

const monitoringFlow = `
flowchart LR
  subgraph Sources["Data Sources"]
    A[App Metrics]
    B[Server Logs]
    C[K8s Events]
    D[APM Traces]
  end
  subgraph Collection["Collection"]
    E[Prometheus]
    F[Logstash / Fluentd]
    G[OpenTelemetry]
  end
  subgraph Storage["Storage"]
    H[(Prometheus TSDB)]
    I[(Elasticsearch)]
    J[(Tempo / Jaeger)]
  end
  subgraph Visualization["Visualization & Alerting"]
    K[Grafana Dashboards]
    L[Kibana]
    M[Alertmanager]
  end
  A --> E
  B --> F
  C --> G
  D --> G
  E --> H
  F --> I
  G --> J
  H --> K
  I --> L
  K --> M
  style Sources fill:#3b82f622,stroke:#3b82f6
  style Collection fill:#8b5cf622,stroke:#8b5cf6
  style Storage fill:#ef444422,stroke:#ef4444
  style Visualization fill:#22c55e22,stroke:#22c55e
`;

export default function MonitoringSection() {
  return (
    <section>
      <SectionHeader
        id="monitoring"
        icon="📊"
        title="Monitoring & Logging"
        subtitle="Observability gives you real-time insight into the health, performance, and behavior of your systems through metrics, logs, and traces — the three pillars of observability."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: "📈",
            title: "Metrics",
            color: "border-blue-500 bg-blue-500/5",
            tools: ["Prometheus", "Grafana", "DataDog", "New Relic"],
            desc: "Numerical measurements over time — CPU, memory, request rate, error rate, latency.",
          },
          {
            icon: "📋",
            title: "Logs",
            color: "border-yellow-500 bg-yellow-500/5",
            tools: ["Elasticsearch", "Logstash", "Kibana (ELK)", "Loki"],
            desc: "Timestamped text records of events. Essential for debugging and auditing.",
          },
          {
            icon: "🔍",
            title: "Traces",
            color: "border-purple-500 bg-purple-500/5",
            tools: ["Jaeger", "Zipkin", "Tempo", "AWS X-Ray"],
            desc: "Follow a request as it flows through distributed services. Pinpoint bottlenecks.",
          },
        ].map(p => (
          <div key={p.title} className={`feature-card rounded-xl border-2 ${p.color} p-5`}>
            <div className="text-2xl mb-2">{p.icon}</div>
            <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.tools.map(t => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <MermaidDiagram chart={monitoringFlow} title="Monitoring & Observability Flow" />

      <div className="mt-6">
        <h3 className="font-semibold mb-2 text-foreground">Prometheus Configuration</h3>
        <CodeBlock code={prometheusConfig} language="yaml" title="prometheus.yml" />
      </div>

      <div className="mt-6 bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold mb-4 text-foreground">Key SRE Metrics (SLIs)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { metric: "Availability", formula: "Uptime / Total Time", target: "> 99.9%", icon: "🟢" },
            { metric: "Latency", formula: "p50, p95, p99", target: "< 200ms p99", icon: "⏱️" },
            { metric: "Error Rate", formula: "Errors / Total Req", target: "< 0.1%", icon: "❌" },
            { metric: "Throughput", formula: "Requests per second", target: "Per SLA", icon: "📊" },
          ].map(m => (
            <div key={m.metric} className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-xl mb-1">{m.icon}</div>
              <div className="font-semibold text-sm text-foreground">{m.metric}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.formula}</div>
              <div className="text-xs text-primary font-medium mt-1">{m.target}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
