import SectionHeader from "@/components/SectionHeader";
import CodeBlock from "@/components/CodeBlock";
import MermaidDiagram from "@/components/MermaidDiagram";

const dockerfile = `# Use official Node.js LTS base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (Docker layer cache optimization)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \\
  CMD wget -q --spider http://localhost:3000/health || exit 1

# Start the application
CMD ["node", "dist/index.js"]`;

const dockerCompose = `version: '3.9'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:`;

const dockerCmds = `# Pull an image
docker pull nginx:latest

# Build an image
docker build -t myapp:v1.0 .

# Run a container
docker run -d -p 3000:3000 --name myapp myapp:v1.0

# List running containers
docker ps

# View container logs
docker logs -f myapp

# Execute command inside container
docker exec -it myapp sh

# Stop and remove container
docker stop myapp && docker rm myapp

# Docker Compose commands
docker compose up -d
docker compose logs -f
docker compose down`;

const dockerArch = `
graph TB
  subgraph Host["Host Machine"]
    subgraph DE["Docker Engine"]
      D1[Container: web] 
      D2[Container: db]
      D3[Container: redis]
    end
    subgraph Storage["Volumes"]
      V1[(postgres_data)]
    end
    subgraph Net["Network"]
      N1{bridge}
    end
  end
  D1 --- N1
  D2 --- N1
  D3 --- N1
  D2 --- V1
  style DE fill:#0db7ed22,stroke:#0db7ed
  style Host fill:#f0f0f022,stroke:#ccc
`;

export default function DockerSection() {
  return (
    <section>
      <SectionHeader
        id="docker"
        icon="🐳"
        title="Containerization (Docker)"
        subtitle="Docker packages applications and their dependencies into portable containers that run consistently across any environment — from a developer's laptop to a cloud server."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: "📦", title: "Images", desc: "Read-only templates built from a Dockerfile. Like a blueprint for a container." },
          { icon: "🏃", title: "Containers", desc: "Running instances of an image. Isolated, lightweight, and ephemeral by default." },
          { icon: "📋", title: "Registry", desc: "Docker Hub, ECR, or GCR store and distribute images across teams and environments." },
        ].map(c => (
          <div key={c.title} className="feature-card bg-card border border-border rounded-xl p-5">
            <div className="text-2xl mb-2">{c.icon}</div>
            <h3 className="font-semibold text-foreground mb-1">{c.title}</h3>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>

      <CodeBlock code={dockerfile} language="dockerfile" title="Dockerfile" />
      <CodeBlock code={dockerCompose} language="yaml" title="docker-compose.yml" />

      <h3 className="font-semibold mt-6 mb-2 text-foreground">Essential Docker Commands</h3>
      <CodeBlock code={dockerCmds} language="bash" title="Docker CLI" />

      <MermaidDiagram chart={dockerArch} title="Docker Container Architecture" />
    </section>
  );
}
