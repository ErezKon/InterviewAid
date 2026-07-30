# Part I — Deployment & Infrastructure

## Table of Contents

- [1. Containerization & Orchestration](#1-containerization-and-orchestration)
  - [1.1 The Problem: "It Works on My Machine"](#11-the-problem-it-works-on-my-machine)
  - [1.2 Docker Fundamentals](#12-docker-fundamentals)
    - [Core Concepts](#core-concepts)
    - [Dockerfile Anatomy](#dockerfile-anatomy)
    - [Multi-Stage Builds Visualized](#multi-stage-builds-visualized)
    - [Containers vs Virtual Machines](#containers-vs-virtual-machines)
  - [1.3 Kubernetes Concepts](#13-kubernetes-concepts)
    - [Kubernetes Architecture Overview](#kubernetes-architecture-overview)
    - [Core Kubernetes Objects](#core-kubernetes-objects)
      - [Pod — The Smallest Deployable Unit](#pod-the-smallest-deployable-unit)
      - [Deployment — Declarative Desired State](#deployment-declarative-desired-state)
      - [Service — Stable Networking Abstraction](#service-stable-networking-abstraction)
      - [Ingress — HTTP Routing Layer](#ingress-http-routing-layer)
    - [How Kubernetes Objects Relate](#how-kubernetes-objects-relate)
- [2. Infrastructure as Code (IaC)](#2-infrastructure-as-code-iac)
  - [2.1 The Problem: Manual Infrastructure](#21-the-problem-manual-infrastructure)
  - [2.2 What Is Infrastructure as Code?](#22-what-is-infrastructure-as-code)
  - [2.3 Core IaC Principles](#23-core-iac-principles)
  - [2.4 Terraform Concepts](#24-terraform-concepts)
    - [Terraform Workflow](#terraform-workflow)
    - [Example: Terraform Configuration](#example-terraform-configuration)
    - [The State File](#the-state-file)
  - [2.5 AWS CloudFormation](#25-aws-cloudformation)
  - [2.6 Terraform vs CloudFormation](#26-terraform-vs-cloudformation)
- [3. Deployment Strategies](#3-deployment-strategies)
  - [3.1 Strategy Overview](#31-strategy-overview)
  - [3.2 Blue/Green Deployment](#32-bluegreen-deployment)
  - [3.3 Canary Deployment](#33-canary-deployment)
  - [3.4 Rolling Updates](#34-rolling-updates)
  - [3.5 Feature Flags](#35-feature-flags)
    - [Code Example](#code-example)
    - [Types of Feature Flags](#types-of-feature-flags)
  - [3.6 Strategy Comparison Matrix](#36-strategy-comparison-matrix)


---

## 1. Containerization & Orchestration

### 1.1 The Problem: "It Works on My Machine"

Before containers, deploying software meant dealing with environmental inconsistencies — different OS versions, library conflicts, and configuration drift between development, staging, and production environments.

```
Developer's Laptop        Staging Server          Production Server
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Python 3.11     │    │ Python 3.9      │    │ Python 3.8      │
│ libssl 1.1      │    │ libssl 1.0      │    │ libssl 3.0      │
│ Ubuntu 22.04    │    │ CentOS 7        │    │ Amazon Linux 2  │
│ Config: dev.env │    │ Config: ???     │    │ Config: ???     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        ✅                    ❌ BUG!               ❌ CRASH!
```

**Containers solve this** by packaging the application *together* with its entire runtime environment into a single, portable unit.

---

### 1.2 Docker Fundamentals

**Docker** is the most widely adopted containerization platform. It allows you to define, build, ship, and run containers consistently across any environment.

#### Core Concepts

```mermaid
graph TB
    subgraph "Docker Architecture"
        A[Dockerfile] -->|docker build| B[Docker Image]
        B -->|docker push| C[Container Registry<br/>e.g., Docker Hub, ECR, GCR]
        C -->|docker pull| D[Docker Image<br/>on Target Host]
        D -->|docker run| E[Running Container]
        E -->|docker stop| F[Stopped Container]
    end

    style A fill:#f9f,stroke:#333,stroke-width:2px,color:#000
    style B fill:#bbf,stroke:#333,stroke-width:2px,color:#000
    style C fill:#fbb,stroke:#333,stroke-width:2px,color:#000
    style D fill:#bbf,stroke:#333,stroke-width:2px,color:#000
    style E fill:#bfb,stroke:#333,stroke-width:2px,color:#000
    style F fill:#ddd,stroke:#333,stroke-width:2px,color:#000
```

| Concept | Definition | Analogy |
|---|---|---|
| **Dockerfile** | A text file with instructions for building an image | A recipe |
| **Image** | An immutable, layered snapshot of a filesystem + metadata | A class definition |
| **Container** | A running instance of an image with its own isolated process space | An object instance |
| **Registry** | A remote storage location for images | An app store for images |
| **Volume** | Persistent storage that outlives the container lifecycle | An external hard drive |
| **Network** | Virtual networking layer allowing containers to communicate | A private LAN |

#### Dockerfile Anatomy

A `Dockerfile` contains ordered instructions that Docker executes sequentially. Each instruction creates a **layer** in the image, and Docker caches layers for efficiency.

```dockerfile
# ----------------------------------------------------------
# Stage 1: Build stage (Multi-stage build pattern)
# ----------------------------------------------------------
FROM node:20-alpine AS builder
# Use a small base image; 'AS builder' names this stage

WORKDIR /app
# Set the working directory inside the container

COPY package.json package-lock.json ./
# Copy dependency manifests first (layer caching optimization)

RUN npm ci --production
# Install dependencies. 'RUN' executes a command at build time

COPY . .
# Copy the rest of the application source code

RUN npm run build
# Build the application (e.g., compile TypeScript, bundle assets)

# ----------------------------------------------------------
# Stage 2: Production stage
# ----------------------------------------------------------
FROM node:20-alpine AS production

WORKDIR /app

# Copy ONLY the build artifacts and dependencies from Stage 1
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
# Document which port the app listens on (metadata only)

ENV NODE_ENV=production
# Set an environment variable

USER node
# Run as non-root user for security

CMD ["node", "dist/server.js"]
# The default command to run when the container starts
```

> **Key Insight — Layer Caching:** Docker caches each layer. If a layer hasn't changed, Docker reuses the cached version. This is why we `COPY package.json` *before* `COPY . .` — dependency installations are cached until `package.json` changes, even if source code changes frequently.

#### Multi-Stage Builds Visualized

```mermaid
graph LR
    subgraph "Stage 1: Builder (discarded)"
        S1A[Base: node:20-alpine<br/>~180MB] --> S1B[Install ALL deps<br/>+200MB]
        S1B --> S1C[Copy Source<br/>+50MB]
        S1C --> S1D[Build/Compile<br/>+30MB]
    end

    subgraph "Stage 2: Production (final image)"
        S2A[Base: node:20-alpine<br/>~180MB] --> S2B[Copy dist/ from Stage 1<br/>+5MB]
        S2B --> S2C[Copy node_modules from Stage 1<br/>+80MB]
    end

    S1D -.->|"COPY --from=builder"| S2B

    style S1A fill:#fee,stroke:#c33,color:#000
    style S1B fill:#fee,stroke:#c33,color:#000
    style S1C fill:#fee,stroke:#c33,color:#000
    style S1D fill:#fee,stroke:#c33,color:#000
    style S2A fill:#efe,stroke:#3c3,color:#000
    style S2B fill:#efe,stroke:#3c3,color:#000
    style S2C fill:#efe,stroke:#3c3,color:#000
```

**Result:** The final image is ~265MB instead of ~460MB because build tools, source code, and dev dependencies are left behind in Stage 1.

#### Containers vs Virtual Machines

```mermaid
graph TB
    subgraph "Virtual Machines"
        VM_HW[Hardware] --> VM_HV[Hypervisor]
        VM_HV --> VM1_OS[Guest OS 1<br/>Full Kernel]
        VM_HV --> VM2_OS[Guest OS 2<br/>Full Kernel]
        VM1_OS --> VM1_APP[App A + Libs]
        VM2_OS --> VM2_APP[App B + Libs]
    end

    subgraph "Containers"
        C_HW[Hardware] --> C_OS[Host OS + Kernel]
        C_OS --> C_RT[Container Runtime<br/>e.g., Docker Engine]
        C_RT --> C1[Container A<br/>App + Libs]
        C_RT --> C2[Container B<br/>App + Libs]
        C_RT --> C3[Container C<br/>App + Libs]
    end

    style VM1_OS fill:#fdd,stroke:#333,color:#000
    style VM2_OS fill:#fdd,stroke:#333,color:#000
    style C_RT fill:#dfd,stroke:#333,color:#000
```

| Aspect | Virtual Machines | Containers |
|---|---|---|
| **Isolation** | Full OS-level (strongest) | Process-level (via namespaces/cgroups) |
| **Boot Time** | Minutes | Milliseconds to seconds |
| **Size** | Gigabytes | Megabytes |
| **Overhead** | High (full guest OS) | Minimal (shared kernel) |
| **Use Case** | Strong isolation needs, different OS kernels | Microservices, CI/CD, rapid scaling |

---

### 1.3 Kubernetes Concepts

Docker runs containers on a **single host**. But in production, you need to:

- Run containers across **multiple machines** (a cluster)
- **Automatically restart** failed containers
- **Scale up/down** based on load
- **Load balance** traffic across container replicas
- Perform **zero-downtime deployments**

**Kubernetes (K8s)** is an open-source container orchestration platform that solves all of these problems.

#### Kubernetes Architecture Overview

```mermaid
graph TB
    subgraph "Control Plane (Master)"
        API[API Server<br/>Central hub for all operations]
        ETCD[(etcd<br/>Distributed key-value store<br/>Cluster state)]
        SCHED[Scheduler<br/>Assigns Pods to Nodes]
        CM[Controller Manager<br/>Maintains desired state]

        API <--> ETCD
        API <--> SCHED
        API <--> CM
    end

    subgraph "Worker Node 1"
        KL1[Kubelet<br/>Node agent]
        KP1[Kube-Proxy<br/>Network rules]
        CR1[Container Runtime<br/>containerd / CRI-O]

        KL1 --> CR1
        KL1 --> KP1

        subgraph "Pods on Node 1"
            P1[Pod A]
            P2[Pod B]
        end
        CR1 --> P1
        CR1 --> P2
    end

    subgraph "Worker Node 2"
        KL2[Kubelet]
        KP2[Kube-Proxy]
        CR2[Container Runtime]

        KL2 --> CR2
        KL2 --> KP2

        subgraph "Pods on Node 2"
            P3[Pod C]
            P4[Pod D]
        end
        CR2 --> P3
        CR2 --> P4
    end

    API --> KL1
    API --> KL2

    style API fill:#f96,stroke:#333,stroke-width:2px,color:#000
    style ETCD fill:#ff9,stroke:#333,stroke-width:2px,color:#000
    style P1 fill:#9cf,stroke:#333,color:#000
    style P2 fill:#9cf,stroke:#333,color:#000
    style P3 fill:#9cf,stroke:#333,color:#000
    style P4 fill:#9cf,stroke:#333,color:#000
```

#### Core Kubernetes Objects

##### Pod — The Smallest Deployable Unit

A **Pod** is the atomic unit in Kubernetes. It wraps one or more tightly coupled containers that share the same network namespace (same IP address) and can share storage volumes.

```yaml
# pod.yaml — Rarely created directly; usually managed by a Deployment
apiVersion: v1
kind: Pod
metadata:
  name: my-app-pod
  labels:
    app: my-app          # Labels are key-value pairs for identification
    tier: backend
spec:
  containers:
    - name: app-container
      image: my-company/my-app:1.2.0
      ports:
        - containerPort: 8080
      resources:
        requests:          # Minimum guaranteed resources
          cpu: "250m"      # 250 millicores = 0.25 CPU
          memory: "128Mi"
        limits:            # Maximum allowed resources
          cpu: "500m"
          memory: "256Mi"
      livenessProbe:       # Is the container alive?
        httpGet:
          path: /healthz
          port: 8080
        initialDelaySeconds: 10
        periodSeconds: 15
      readinessProbe:      # Is the container ready to receive traffic?
        httpGet:
          path: /ready
          port: 8080
        initialDelaySeconds: 5
        periodSeconds: 10
    - name: sidecar-logger   # Sidecar pattern: second container in same Pod
      image: fluentd:latest
      volumeMounts:
        - name: log-volume
          mountPath: /var/log/app
  volumes:
    - name: log-volume
      emptyDir: {}           # Ephemeral volume shared between containers
```

> **Why not just one container per Pod?** The sidecar pattern is common — a primary application container paired with helper containers (logging agents, proxies, config reloaders) that share the Pod's network and storage.

##### Deployment — Declarative Desired State

A **Deployment** manages a set of identical Pod replicas. You tell Kubernetes the *desired state* (e.g., "I want 3 replicas of version 1.2.0"), and the Deployment controller continuously works to make the *actual state* match.

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-deployment
  namespace: production
spec:
  replicas: 3                    # Desired number of Pod replicas
  selector:
    matchLabels:
      app: my-app                # Must match the Pod template labels
  strategy:
    type: RollingUpdate          # How to perform updates
    rollingUpdate:
      maxSurge: 1                # Max Pods above desired count during update
      maxUnavailable: 0          # No Pods can be unavailable during update
  template:                      # Pod template — defines each replica
    metadata:
      labels:
        app: my-app
        version: "1.2.0"
    spec:
      containers:
        - name: my-app
          image: my-company/my-app:1.2.0
          ports:
            - containerPort: 8080
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:     # Pull sensitive config from K8s Secrets
                  name: db-credentials
                  key: url
          resources:
            requests:
              cpu: "250m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "256Mi"
```

```mermaid
graph TB
    DEP[Deployment<br/>my-app-deployment<br/>replicas: 3] --> RS[ReplicaSet<br/>my-app-deployment-7d9f8b<br/>Manages Pod lifecycle]
    RS --> P1[Pod 1<br/>my-app:1.2.0]
    RS --> P2[Pod 2<br/>my-app:1.2.0]
    RS --> P3[Pod 3<br/>my-app:1.2.0]

    DEP -.->|"Update to 1.3.0"| RS2[New ReplicaSet<br/>my-app-deployment-a3c1e2]
    RS2 --> P4[Pod 4<br/>my-app:1.3.0]
    RS2 --> P5[Pod 5<br/>my-app:1.3.0]
    RS2 --> P6[Pod 6<br/>my-app:1.3.0]

    RS -.->|"Scaled down to 0<br/>(kept for rollback)"| RS

    style DEP fill:#f96,stroke:#333,stroke-width:2px,color:#000
    style RS fill:#ff9,stroke:#333,color:#000
    style RS2 fill:#9f9,stroke:#333,color:#000
    style P1 fill:#ddd,stroke:#999,color:#000
    style P2 fill:#ddd,stroke:#999,color:#000
    style P3 fill:#ddd,stroke:#999,color:#000
    style P4 fill:#9cf,stroke:#333,color:#000
    style P5 fill:#9cf,stroke:#333,color:#000
    style P6 fill:#9cf,stroke:#333,color:#000
```

> **Declarative vs Imperative:** You don't say *"start 2 more pods."* You say *"there should be 5 pods."* Kubernetes figures out the difference and acts.

##### Service — Stable Networking Abstraction

Pods are **ephemeral** — they can be destroyed and recreated with different IP addresses at any time. A **Service** provides a stable virtual IP (ClusterIP) and DNS name that load-balances traffic to the matching Pods.

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app              # Route traffic to Pods with this label
  type: ClusterIP            # Internal only (default)
  ports:
    - protocol: TCP
      port: 80               # Port exposed by the Service
      targetPort: 8080       # Port on the Pod containers
```

**Service Types:**

| Type | Scope | Description |
|---|---|---|
| **ClusterIP** | Internal | Default. Reachable only within the cluster. |
| **NodePort** | External | Exposes the Service on each Node's IP at a static port (30000–32767). |
| **LoadBalancer** | External | Provisions a cloud provider's load balancer (e.g., AWS ALB/NLB). |
| **ExternalName** | DNS alias | Maps the Service to an external DNS name (CNAME record). |

```mermaid
graph LR
    CLIENT[External Client] -->|Port 80| LB[Cloud Load Balancer<br/>Type: LoadBalancer]
    LB --> SVC[Service: my-app-service<br/>ClusterIP: 10.96.0.15<br/>DNS: my-app-service.production.svc.cluster.local]
    SVC -->|Round Robin| P1[Pod 1<br/>10.244.1.5:8080]
    SVC -->|Round Robin| P2[Pod 2<br/>10.244.2.8:8080]
    SVC -->|Round Robin| P3[Pod 3<br/>10.244.1.12:8080]

    style SVC fill:#f96,stroke:#333,stroke-width:2px,color:#000
    style LB fill:#9cf,stroke:#333,color:#000
```

##### Ingress — HTTP Routing Layer

An **Ingress** manages external HTTP/HTTPS access to Services within the cluster. It provides host-based and path-based routing, SSL termination, and more — all from a single entry point.

```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx         # Which Ingress Controller to use
  tls:
    - hosts:
        - api.example.com
      secretName: api-tls-cert    # TLS certificate stored as K8s Secret
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /users
            pathType: Prefix
            backend:
              service:
                name: users-service
                port:
                  number: 80
          - path: /orders
            pathType: Prefix
            backend:
              service:
                name: orders-service
                port:
                  number: 80
```

```mermaid
graph LR
    USER[User Browser] -->|"HTTPS://api.example.com/users"| IC[Ingress Controller<br/>e.g., NGINX, Traefik]
    USER -->|"HTTPS://api.example.com/orders"| IC

    IC -->|"/users → users-service"| US[Users Service<br/>ClusterIP]
    IC -->|"/orders → orders-service"| OS[Orders Service<br/>ClusterIP]

    US --> UP1[Users Pod 1]
    US --> UP2[Users Pod 2]
    OS --> OP1[Orders Pod 1]
    OS --> OP2[Orders Pod 2]
    OS --> OP3[Orders Pod 3]

    style IC fill:#f96,stroke:#333,stroke-width:2px,color:#000
    style US fill:#9cf,stroke:#333,color:#000
    style OS fill:#9cf,stroke:#333,color:#000
```

#### How Kubernetes Objects Relate

```mermaid
graph TB
    ING[Ingress<br/>Routes external HTTP traffic<br/>by host/path] --> SVC1[Service A<br/>Stable IP + DNS<br/>Load balances to Pods]
    ING --> SVC2[Service B]

    SVC1 --> DEP1[Deployment A<br/>Manages ReplicaSet<br/>Declares desired state]
    SVC2 --> DEP2[Deployment B]

    DEP1 --> RS1[ReplicaSet A<br/>Ensures N replicas running]
    DEP2 --> RS2[ReplicaSet B]

    RS1 --> POD1[Pod A-1]
    RS1 --> POD2[Pod A-2]
    RS2 --> POD3[Pod B-1]
    RS2 --> POD4[Pod B-2]
    RS2 --> POD5[Pod B-3]

    POD1 --- C1[Container]
    POD3 --- C3[Container]
    POD3 --- C3S[Sidecar Container]

    style ING fill:#f96,stroke:#333,stroke-width:2px,color:#000
    style SVC1 fill:#ff9,stroke:#333,color:#000
    style SVC2 fill:#ff9,stroke:#333,color:#000
    style DEP1 fill:#9f9,stroke:#333,color:#000
    style DEP2 fill:#9f9,stroke:#333,color:#000
    style RS1 fill:#9cf,stroke:#333,color:#000
    style RS2 fill:#9cf,stroke:#333,color:#000
```

---

## 2. Infrastructure as Code (IaC)

### 2.1 The Problem: Manual Infrastructure

Before IaC, infrastructure was provisioned through:

- Clicking through cloud provider consoles (AWS, Azure, GCP)
- Running ad-hoc CLI commands
- Writing shell scripts that break when cloud APIs change

This leads to **snowflake servers** (unique, unreproducible configurations), **configuration drift** (environments diverging over time), and **no audit trail** (who changed what, when, and why?).

### 2.2 What Is Infrastructure as Code?

**Infrastructure as Code** means defining your infrastructure — servers, networks, databases, DNS records, IAM policies — in **declarative configuration files** that are version-controlled, reviewed, tested, and applied automatically.

```mermaid
graph LR
    subgraph "Without IaC"
        A1[Developer] -->|"Click, click, click"| A2[Cloud Console]
        A2 --> A3[Infrastructure<br/>State unknown]
    end

    subgraph "With IaC"
        B1[Developer] -->|Writes code| B2[IaC Config Files<br/>.tf / .yaml]
        B2 -->|git push| B3[Version Control<br/>Git]
        B3 -->|CI/CD Pipeline| B4[IaC Tool<br/>Terraform / CloudFormation]
        B4 -->|API Calls| B5[Cloud Provider]
        B5 --> B6[Infrastructure<br/>State known & reproducible]
    end

    style A3 fill:#fdd,stroke:#c33,color:#000
    style B6 fill:#dfd,stroke:#3c3,color:#000
```

### 2.3 Core IaC Principles

| Principle | Description |
|---|---|
| **Declarative** | You describe *what* you want, not *how* to achieve it |
| **Idempotent** | Applying the same configuration multiple times yields the same result |
| **Version Controlled** | All infrastructure changes go through Git (PRs, reviews, history) |
| **Reproducible** | Spin up identical environments (dev, staging, prod) from the same code |
| **Self-Documenting** | The code *is* the documentation of your infrastructure |

### 2.4 Terraform Concepts

**Terraform** (by HashiCorp) is a cloud-agnostic IaC tool. It uses its own configuration language called **HCL (HashiCorp Configuration Language)**.

#### Terraform Workflow

```mermaid
graph LR
    A[Write<br/>.tf files] --> B["terraform init<br/>Download providers<br/>& modules"]
    B --> C["terraform plan<br/>Preview changes<br/>(dry run)"]
    C --> D{Review Plan}
    D -->|Approve| E["terraform apply<br/>Execute changes<br/>against cloud API"]
    D -->|Reject| A
    E --> F[State File Updated<br/>terraform.tfstate]
    F -.->|"Next change cycle"| A

    style C fill:#ff9,stroke:#333,color:#000
    style E fill:#f96,stroke:#333,color:#000
    style F fill:#9cf,stroke:#333,color:#000
```

#### Example: Terraform Configuration

```hcl
# providers.tf — Configure which cloud provider to use
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Store state remotely (critical for team collaboration)
  backend "s3" {
    bucket = "my-company-terraform-state"
    key    = "production/infrastructure.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}

# variables.tf — Input parameters
variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  # No default — must be provided at plan/apply time
}

# main.tf — Resource definitions
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags = {
    Name        = "${var.environment}-vpc"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_subnet" "public" {
  count             = 2                                         # Create 2 subnets
  vpc_id            = aws_vpc.main.id                           # Reference another resource
  cidr_block        = "10.0.${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "${var.environment}-public-${count.index + 1}"
  }
}

resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.public[0].id

  tags = {
    Name = "${var.environment}-web-server"
  }
}

# outputs.tf — Values to expose after apply
output "vpc_id" {
  description = "ID of the created VPC"
  value       = aws_vpc.main.id
}
```

#### The State File

The **state file** (`terraform.tfstate`) is Terraform's record of the real-world infrastructure it manages. It maps each resource in your `.tf` files to actual cloud resources.

```mermaid
graph TB
    subgraph "Terraform State"
        TF[".tf Config Files<br/>(Desired State)"]
        STATE["terraform.tfstate<br/>(Last Known State)"]
        CLOUD["Cloud Provider<br/>(Actual State)"]
    end

    TF -->|"terraform plan"| DIFF{Diff Engine}
    STATE --> DIFF
    CLOUD -->|"refresh"| DIFF
    DIFF -->|"Calculates changes"| PLAN["Execution Plan<br/>+ 2 to add<br/>~ 1 to change<br/>- 1 to destroy"]
    PLAN -->|"terraform apply"| CLOUD
    CLOUD -->|"Updated state"| STATE

    style DIFF fill:#f96,stroke:#333,stroke-width:2px,color:#000
    style PLAN fill:#ff9,stroke:#333,color:#000
```

> **⚠️ Critical:** The state file often contains sensitive data (database passwords, private keys). It should be stored in a **remote backend** (S3, GCS, Terraform Cloud) with encryption, locking, and access controls — *never* committed to Git.

### 2.5 AWS CloudFormation

**CloudFormation** is AWS's native IaC service. It uses JSON or YAML templates and is deeply integrated with AWS services.

```yaml
# cloudformation-template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Simple VPC and EC2 setup'

Parameters:
  Environment:
    Type: String
    AllowedValues: [dev, staging, production]

Resources:
  MainVPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsHostnames: true
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-vpc'

  WebServer:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: t3.micro
      ImageId: ami-0c55b159cbfafe1f0
      SubnetId: !Ref PublicSubnet

Outputs:
  VpcId:
    Value: !Ref MainVPC
```

### 2.6 Terraform vs CloudFormation

| Feature | Terraform | CloudFormation |
|---|---|---|
| **Provider Support** | Multi-cloud (AWS, Azure, GCP, etc.) | AWS only |
| **Language** | HCL (HashiCorp Configuration Language) | YAML / JSON |
| **State Management** | Explicit state file (you manage it) | Managed by AWS automatically |
| **Drift Detection** | `terraform plan` (manual) | Built-in drift detection |
| **Modularity** | Modules (reusable, composable) | Nested Stacks / Modules |
| **Community** | Large open-source ecosystem | AWS-curated |
| **Rollback** | Manual (apply previous state) | Automatic on stack failure |

> **When to use which?** If you're AWS-only and want managed state, CloudFormation may be simpler. If you're multi-cloud or want flexibility, Terraform is the industry standard.

---

## 3. Deployment Strategies

How you release new versions of your application to production has a massive impact on risk, downtime, and user experience.

### 3.1 Strategy Overview

```mermaid
graph TB
    subgraph "Deployment Strategies Spectrum"
        direction LR
        SIMPLE["Simple / High Risk"] -.-> COMPLEX["Complex / Low Risk"]
    end

    RECREATE[Recreate<br/>All at once<br/>⚠️ Downtime] --> ROLLING[Rolling Update<br/>Gradual replacement<br/>✅ Zero downtime]
    ROLLING --> BG[Blue/Green<br/>Two full environments<br/>✅ Instant rollback]
    BG --> CANARY[Canary<br/>Small % first<br/>✅ Minimal blast radius]
    CANARY --> FF[Feature Flags<br/>Code-level control<br/>✅ Decouple deploy from release]

    style RECREATE fill:#fcc,stroke:#c33,color:#000
    style ROLLING fill:#ffc,stroke:#cc3,color:#000
    style BG fill:#cfc,stroke:#3c3,color:#000
    style CANARY fill:#ccf,stroke:#33c,color:#000
    style FF fill:#fcf,stroke:#c3c,color:#000
```

### 3.2 Blue/Green Deployment

Maintain **two identical production environments**: Blue (current) and Green (new). Switch traffic all at once after validation.

```mermaid
sequenceDiagram
    participant LB as Load Balancer
    participant Blue as Blue (v1.0) - LIVE
    participant Green as Green (v1.1) - IDLE

    Note over Blue: Currently serving 100% traffic
    Note over Green: Deploy new version here

    rect rgb(200, 230, 200)
        Note over Green: Run smoke tests,<br/>integration tests,<br/>health checks
    end

    LB->>Green: Switch 100% traffic to Green
    Note over Green: Now LIVE (v1.1)
    Note over Blue: Now IDLE (v1.0, kept for rollback)

    alt If problems detected
        LB->>Blue: Instant rollback — switch back to Blue
        Note over Blue: LIVE again (v1.0)
    else If stable
        Note over Blue: Eventually decommission<br/>or use for next release
    end
```

| Pros | Cons |
|---|---|
| ✅ Instant rollback (just switch traffic back) | ❌ Requires 2× infrastructure (costly) |
| ✅ Zero downtime during switch | ❌ Database migrations can be tricky |
| ✅ Full testing in production-like environment | ❌ All-or-nothing traffic switch |

### 3.3 Canary Deployment

Route a **small percentage of traffic** to the new version first. Gradually increase if metrics look healthy.

```mermaid
graph TB
    subgraph "Phase 1: 5% Canary"
        LB1[Load Balancer] -->|"95%"| V1A[v1.0<br/>9 replicas]
        LB1 -->|"5%"| V2A[v1.1<br/>1 replica]
    end

    subgraph "Phase 2: 25% Canary"
        LB2[Load Balancer] -->|"75%"| V1B[v1.0<br/>6 replicas]
        LB2 -->|"25%"| V2B[v1.1<br/>2 replicas]
    end

    subgraph "Phase 3: 100% Rollout"
        LB3[Load Balancer] -->|"100%"| V2C[v1.1<br/>10 replicas]
    end

    V2A -.->|"Metrics OK ✅"| LB2
    V2B -.->|"Metrics OK ✅"| LB3

    style V2A fill:#ff9,stroke:#333,color:#000
    style V2B fill:#ff9,stroke:#333,color:#000
    style V2C fill:#9f9,stroke:#333,color:#000
```

```mermaid
flowchart TD
    START[Deploy canary<br/>v1.1 to 5% of traffic] --> MONITOR{Monitor for<br/>N minutes}
    MONITOR -->|"Error rate ↑<br/>Latency ↑<br/>SLO breached"| ROLLBACK[Rollback canary<br/>100% to v1.0]
    MONITOR -->|"All metrics healthy"| INCREASE[Increase traffic<br/>to canary]
    INCREASE --> CHECK{At 100%?}
    CHECK -->|No| MONITOR
    CHECK -->|Yes| DONE[Rollout complete ✅]
    ROLLBACK --> INVESTIGATE[Investigate & fix]

    style ROLLBACK fill:#fcc,stroke:#c33,color:#000
    style DONE fill:#cfc,stroke:#3c3,color:#000
```

| Pros | Cons |
|---|---|
| ✅ Minimal blast radius (only small % affected) | ❌ More complex routing infrastructure |
| ✅ Real production traffic validates the change | ❌ Requires robust monitoring & automated analysis |
| ✅ Gradual confidence building | ❌ Slower full rollout compared to Blue/Green |

### 3.4 Rolling Updates

Replace instances of the old version with the new version **one (or a few) at a time**. This is the default strategy in Kubernetes Deployments.

```mermaid
graph LR
    subgraph "Step 1"
        R1A[v1.0] 
        R1B[v1.0] 
        R1C[v1.0]
        R1D["v1.1 🆕"]
    end

    subgraph "Step 2"
        R2A[v1.0] 
        R2B[v1.0] 
        R2C["v1.1 ✅"]
        R2D["v1.1 🆕"]
    end

    subgraph "Step 3"
        R3A[v1.0] 
        R3B["v1.1 ✅"]
        R3C["v1.1 ✅"]
        R3D["v1.1 🆕"]
    end

    subgraph "Step 4 (done)"
        R4A["v1.1 ✅"]
        R4B["v1.1 ✅"]
        R4C["v1.1 ✅"]
        R4D["v1.1 ✅"]
    end

    style R1D fill:#ff9,stroke:#333,color:#000
    style R2C fill:#9f9,stroke:#333,color:#000
    style R2D fill:#ff9,stroke:#333,color:#000
    style R3B fill:#9f9,stroke:#333,color:#000
    style R3C fill:#9f9,stroke:#333,color:#000
    style R3D fill:#ff9,stroke:#333,color:#000
    style R4A fill:#9f9,stroke:#333,color:#000
    style R4B fill:#9f9,stroke:#333,color:#000
    style R4C fill:#9f9,stroke:#333,color:#000
    style R4D fill:#9f9,stroke:#333,color:#000
```

| Pros | Cons |
|---|---|
| ✅ Zero downtime | ❌ Slower rollout than Blue/Green |
| ✅ No extra infrastructure needed | ❌ Rollback requires another rolling update |
| ✅ Kubernetes does it natively | ❌ Both versions run simultaneously (compatibility needed) |

### 3.5 Feature Flags

**Feature Flags** (also called feature toggles) **decouple deployment from release**. Code is deployed to production but new features are hidden behind conditional flags that can be toggled without redeploying.

```mermaid
graph TB
    subgraph "Traditional Deployment"
        D1[Deploy v1.1] -->|"Feature immediately visible"| U1[All Users see new feature]
    end

    subgraph "Feature Flag Deployment"
        D2[Deploy v1.1<br/>with flag OFF] -->|"Feature hidden"| U2[No users see new feature]
        U2 -->|"Turn flag ON for 5%"| U3[5% see new feature]
        U3 -->|"Turn flag ON for 50%"| U4[50% see new feature]
        U4 -->|"Turn flag ON for 100%"| U5[All users see new feature]
        U3 -.->|"Bug found? Turn OFF"| U2
    end

    style D1 fill:#fcc,stroke:#c33,color:#000
    style D2 fill:#cfc,stroke:#3c3,color:#000
```

#### Code Example

```python
# Simplified feature flag usage
from feature_flags import FeatureFlagClient

ff_client = FeatureFlagClient(api_key="...")

def get_search_results(user, query):
    # Check if this user should see the new search algorithm
    if ff_client.is_enabled("new_search_algorithm", user_context={
        "user_id": user.id,
        "country": user.country,
        "plan": user.subscription_plan,
    }):
        # New code path
        return new_search_engine.search(query)
    else:
        # Existing code path
        return legacy_search_engine.search(query)
```

#### Types of Feature Flags

| Type | Lifespan | Purpose | Example |
|---|---|---|---|
| **Release Flag** | Short (days/weeks) | Safely roll out incomplete or risky features | New checkout flow |
| **Experiment Flag** | Medium (weeks) | A/B testing different variants | Button color test |
| **Ops Flag** | Indefinite | Runtime operational control | Circuit breaker, rate limiter |
| **Permission Flag** | Indefinite | Gate features by user segment or subscription | Premium-only features |

> **⚠️ Technical Debt Warning:** Feature flags that are not cleaned up after a feature is fully released become confusing dead code. Always have a process to remove flags once they're no longer needed.

### 3.6 Strategy Comparison Matrix

| Strategy | Downtime | Rollback Speed | Infrastructure Cost | Complexity | Risk Level |
|---|---|---|---|---|---|
| **Recreate** | ✅ Yes | Slow (redeploy) | Low | Very Low | 🔴 High |
| **Rolling Update** | ❌ None | Medium (re-roll) | Low | Low | 🟡 Medium |
| **Blue/Green** | ❌ None | Instant (switch) | High (2×) | Medium | 🟢 Low |
| **Canary** | ❌ None | Fast (reroute) | Medium | High | 🟢 Very Low |
| **Feature Flags** | ❌ None | Instant (toggle) | Low | Medium–High | 🟢 Very Low |

> **In practice, these strategies are often combined.** For example: use **Rolling Updates** for the deployment mechanism + **Canary** for gradual traffic shifting + **Feature Flags** for controlling feature visibility within the deployed code.

---

