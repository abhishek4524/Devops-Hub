import SectionHeader from "@/components/SectionHeader";
import CodeBlock from "@/components/CodeBlock";

const terraformSnippet = `# Configure the AWS provider
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "my-terraform-state"
    key    = "prod/main.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}

# Variables
variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

# Data source: look up the latest Amazon Linux 2 AMI
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# Security group
resource "aws_security_group" "web_sg" {
  name        = "web-server-sg"
  description = "Allow HTTP and SSH"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 Instance
resource "aws_instance" "web_server" {
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = var.instance_type
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  user_data = <<-EOF
    #!/bin/bash
    yum update -y
    yum install -y nginx
    systemctl start nginx
    systemctl enable nginx
  EOF

  tags = {
    Name        = "web-server"
    Environment = "production"
    ManagedBy   = "terraform"
  }
}

# Output the public IP
output "web_server_public_ip" {
  description = "Public IP of the web server"
  value       = aws_instance.web_server.public_ip
}`;

const terraformCmds = `# Initialize Terraform (download providers)
terraform init

# Preview changes
terraform plan

# Apply changes
terraform apply

# Apply without confirmation prompt
terraform apply -auto-approve

# Destroy infrastructure
terraform destroy

# Show current state
terraform show

# List resources in state
terraform state list

# Format code
terraform fmt`;

const cloudFormation = `AWSTemplateFormatVersion: '2010-09-09'
Description: 'Simple EC2 web server stack'

Parameters:
  InstanceType:
    Type: String
    Default: t3.micro
    AllowedValues: [t3.micro, t3.small, t3.medium]

Resources:
  WebServer:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: !FindInMap [AWSRegionArch2AMI, !Ref AWS::Region, HVM64]
      InstanceType: !Ref InstanceType
      UserData:
        Fn::Base64: |
          #!/bin/bash
          yum update -y
          yum install -y nginx
          systemctl start nginx

Outputs:
  WebServerPublicIP:
    Value: !GetAtt WebServer.PublicIp`;

export default function IaCSection() {
  return (
    <section>
      <SectionHeader
        id="iac"
        icon="🏗️"
        title="Infrastructure as Code (IaC)"
        subtitle="IaC manages and provisions infrastructure through machine-readable configuration files rather than manual processes, enabling version control, automation, and reproducibility."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[
          { icon: "📁", title: "Version Controlled", desc: "Infra changes tracked in Git like application code. Review and rollback anytime." },
          { icon: "♻️", title: "Reproducible", desc: "Spin up identical environments every time — dev, staging, prod are truly identical." },
          { icon: "⚡", title: "Automated", desc: "Provision hundreds of resources in minutes via CI/CD pipelines." },
          { icon: "📖", title: "Self-Documenting", desc: "The code IS the documentation. No more stale wiki pages." },
        ].map(c => (
          <div key={c.title} className="feature-card bg-card border border-border rounded-xl p-5">
            <div className="text-2xl mb-2">{c.icon}</div>
            <h3 className="font-semibold text-foreground mb-1">{c.title}</h3>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <h3 className="font-semibold mb-3 text-foreground">Popular IaC Tools</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { name: "Terraform", desc: "Multi-cloud, HCL syntax, huge ecosystem", color: "text-purple-500 bg-purple-500/10" },
            { name: "AWS CloudFormation", desc: "AWS-native, JSON/YAML, deep integration", color: "text-yellow-600 bg-yellow-500/10" },
            { name: "Pulumi", desc: "Use real code (Python, JS, Go)", color: "text-blue-500 bg-blue-500/10" },
            { name: "Ansible", desc: "Agentless configuration management", color: "text-red-500 bg-red-500/10" },
            { name: "Chef / Puppet", desc: "Mature config management tools", color: "text-orange-500 bg-orange-500/10" },
            { name: "CDK", desc: "AWS Cloud Development Kit (code-first)", color: "text-teal-500 bg-teal-500/10" },
          ].map(t => (
            <div key={t.name} className={`rounded-lg p-3 ${t.color.split(" ")[1]}`}>
              <div className={`font-semibold text-sm ${t.color.split(" ")[0]}`}>{t.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="font-semibold mb-2 text-foreground">Terraform — EC2 Instance Example</h3>
      <CodeBlock code={terraformSnippet} language="hcl" title="main.tf" />

      <h3 className="font-semibold mt-4 mb-2 text-foreground">Terraform Commands</h3>
      <CodeBlock code={terraformCmds} language="bash" title="Terraform CLI" />

      <h3 className="font-semibold mt-4 mb-2 text-foreground">AWS CloudFormation</h3>
      <CodeBlock code={cloudFormation} language="yaml" title="template.yaml" />
    </section>
  );
}
