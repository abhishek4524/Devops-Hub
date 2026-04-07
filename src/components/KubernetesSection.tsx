import SectionHeader from "@/components/SectionHeader";
import CodeBlock from "@/components/CodeBlock";
import MermaidDiagram from "@/components/MermaidDiagram";

const deploymentYaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
  labels:
    app: web-app
    version: v1.0.0
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web
          image: myapp:v1.0.0
          ports:
            - containerPort: 3000
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10
          env:
            - name: NODE_ENV
              value: production
---
apiVersion: v1
kind: Service
metadata:
  name: web-app-svc
spec:
  selector:
    app: web-app
  ports:
    - port: 80
      targetPort: 3000
  type: LoadBalancer`;

const kubectlCmds = `# Get all resources in default namespace
kubectl get all

# Get pods with wide output
kubectl get pods -o wide

# Describe a specific pod
kubectl describe pod web-app-7d6b4f9c-x2kpq

# View pod logs
kubectl logs -f web-app-7d6b4f9c-x2kpq

# Execute into a pod
kubectl exec -it web-app-7d6b4f9c-x2kpq -- /bin/sh

# Apply a configuration
kubectl apply -f deployment.yaml

# Scale a deployment
kubectl scale deployment web-app --replicas=5

# Get nodes
kubectl get nodes

# Check cluster info
kubectl cluster-info

# Port forward for local access
kubectl port-forward svc/web-app-svc 8080:80`;

const k8sArch = `
graph TB
  subgraph CP["Control Plane"]
    API[API Server]
    ETCD[(etcd)]
    SCH[Scheduler]
    CM[Controller Manager]
  end
  subgraph N1["Worker Node 1"]
    KUB1[kubelet]
    P1[Pod: web-app]
    P2[Pod: web-app]
  end
  subgraph N2["Worker Node 2"]
    KUB2[kubelet]
    P3[Pod: web-app]
    P4[Pod: db]
  end
  API --> ETCD
  API --> SCH
  API --> CM
  API --> KUB1
  API --> KUB2
  KUB1 --> P1
  KUB1 --> P2
  KUB2 --> P3
  KUB2 --> P4
  style CP fill:#326ce522,stroke:#326ce5
  style N1 fill:#22c55e22,stroke:#22c55e
  style N2 fill:#22c55e22,stroke:#22c55e
`;

export default function KubernetesSection() {
  return (
    <section>
      <SectionHeader
        id="kubernetes"
        icon="☸️"
        title="Orchestration (Kubernetes)"
        subtitle="Kubernetes (K8s) is a container orchestration platform that automates deployment, scaling, and management of containerized applications across clusters of machines."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {[
          { icon: "🫛", name: "Pod", desc: "Smallest deployable unit — one or more containers" },
          { icon: "📋", name: "Deployment", desc: "Manages replica sets and rolling updates" },
          { icon: "🌐", name: "Service", desc: "Stable networking endpoint for pods" },
          { icon: "📂", name: "ConfigMap", desc: "Inject configuration into pods" },
          { icon: "🔐", name: "Secret", desc: "Store sensitive data like API keys" },
          { icon: "📦", name: "Namespace", desc: "Logical isolation for workloads" },
        ].map(r => (
          <div key={r.name} className="feature-card bg-card border border-border rounded-xl p-4">
            <div className="text-xl mb-1">{r.icon}</div>
            <div className="font-semibold text-sm text-foreground">{r.name}</div>
            <div className="text-xs text-muted-foreground mt-1">{r.desc}</div>
          </div>
        ))}
      </div>

      <MermaidDiagram chart={k8sArch} title="Kubernetes Architecture" />

      <div className="mt-6">
        <h3 className="font-semibold mb-2 text-foreground">Deployment Manifest</h3>
        <CodeBlock code={deploymentYaml} language="yaml" title="deployment.yaml" />
      </div>

      <h3 className="font-semibold mt-4 mb-2 text-foreground">kubectl Commands</h3>
      <CodeBlock code={kubectlCmds} language="bash" title="kubectl CLI" />
    </section>
  );
}
