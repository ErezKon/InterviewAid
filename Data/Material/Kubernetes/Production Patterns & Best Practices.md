# 1. Production Patterns & Best Practices

## Table of Contents

- [1.1 Complete Production-Ready Architecture](#11-complete-production-ready-architecture)
- [1.2 Best Practices Checklist](#12-best-practices-checklist)
- [1.3 Graceful Shutdown Sequence](#13-graceful-shutdown-sequence)

---


## 1.1 Complete Production-Ready Architecture

```mermaid
graph TB
    subgraph External["External"]
        DNS["Route 53 / DNS"]
        CDN["CloudFront / CDN"]
        WAF["WAF"]
    end
    
    subgraph Cluster["Kubernetes Cluster"]
        subgraph Ingress_Layer["Ingress Layer"]
            ING_CTRL["Ingress Controller<br/>(nginx/ALB)"]
        end
        
        subgraph App_Layer["Application Layer"]
            FE["Frontend<br/>Deployment (3)"]
            API["API Server<br/>Deployment (5)"]
            WORKER["Workers<br/>Deployment (3)"]
        end
        
        subgraph Data_Layer["Data Layer"]
            CACHE["Redis<br/>StatefulSet (3)"]
            DB["PostgreSQL<br/>StatefulSet (3)"]
            MQ["Kafka<br/>StatefulSet (3)"]
        end
        
        subgraph Platform["Platform Services"]
            PROM["Prometheus"]
            GRAF["Grafana"]
            LOKI["Loki"]
            CERT["cert-manager"]
            ESO["External Secrets<br/>Operator"]
            HPA_C["HPA"]
        end
    end
    
    subgraph External_Services["External Services"]
        VAULT["HashiCorp Vault"]
        S3["S3 / Object Storage"]
        SM["Secrets Manager"]
    end
    
    DNS --> CDN --> WAF --> ING_CTRL
    ING_CTRL --> FE
    ING_CTRL --> API
    API --> CACHE
    API --> DB
    API --> MQ
    WORKER --> MQ
    WORKER --> DB
    ESO --> VAULT
    ESO --> SM
    HPA_C --> API
    HPA_C --> WORKER
    PROM --> API
    PROM --> WORKER

    style Cluster fill:#0d1117,color:#c9d1d9
```

## 1.2 Best Practices Checklist

### Workloads

```yaml
# ✅ Production-ready pod template
spec:
  # 1. Always set resource requests and limits
  containers:
    - resources:
        requests:
          cpu: "250m"
          memory: "256Mi"
        limits:
          # Note: Many teams set CPU limit = request (Guaranteed QoS)
          # Others omit CPU limits to avoid throttling
          cpu: "500m"
          memory: "256Mi"    # Memory limit should ALWAYS be set
      
      # 2. Always set probes
      readinessProbe: { ... }
      livenessProbe: { ... }
      
      # 3. Security hardening
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        readOnlyRootFilesystem: true
        allowPrivilegeEscalation: false
        capabilities:
          drop: ["ALL"]
      
      # 4. Use specific image tags, never 'latest'
      image: myapp:v2.1.3   # ✅
      # image: myapp:latest  # ❌
      # image: myapp          # ❌
  
  # 5. Use a non-default service account
  serviceAccountName: my-app-sa
  automountServiceAccountToken: false
  
  # 6. Pod anti-affinity for high availability
  affinity:
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 100
          podAffinityTerm:
            labelSelector:
              matchLabels:
                app: my-app
            topologyKey: kubernetes.io/hostname
  
  # 7. Topology spread for even distribution
  topologySpreadConstraints:
    - maxSkew: 1
      topologyKey: topology.kubernetes.io/zone
      whenUnsatisfiable: DoNotSchedule
      labelSelector:
        matchLabels:
          app: my-app
  
  # 8. Graceful shutdown
  terminationGracePeriodSeconds: 30
  containers:
    - lifecycle:
        preStop:
          exec:
            command: ["/bin/sh", "-c", "sleep 15"]
```

### Namespace Organization

```bash
# Environment separation
kubectl create namespace production
kubectl create namespace staging
kubectl create namespace development

# Functional separation
kubectl create namespace monitoring
kubectl create namespace logging
kubectl create namespace cert-manager
kubectl create namespace ingress-nginx
```

### Labels & Annotations Convention

```yaml
metadata:
  labels:
    # Recommended labels (kubernetes.io conventions)
    app.kubernetes.io/name: api-server
    app.kubernetes.io/instance: api-server-production
    app.kubernetes.io/version: "2.1.3"
    app.kubernetes.io/component: backend
    app.kubernetes.io/part-of: ecommerce-platform
    app.kubernetes.io/managed-by: helm
    
    # Custom business labels
    team: platform
    cost-center: engineering
    environment: production
```

## 1.3 Graceful Shutdown Sequence

```mermaid
sequenceDiagram
    participant K8s as Kubernetes
    participant EP as Endpoints Controller
    participant Pod as Pod
    participant App as Application

    K8s->>Pod: Send SIGTERM
    K8s->>EP: Remove pod from Service endpoints
    
    Note over Pod: preStop hook runs
    Pod->>App: Execute preStop (sleep 15)
    Note over EP: kube-proxy updates iptables
    Note over EP: Ingress controller updates upstream
    
    Note over App: Sleep gives time for<br/>in-flight requests to drain<br/>and network rules to update
    
    App->>App: Stop accepting new connections
    App->>App: Finish in-flight requests
    App->>Pod: Exit 0
    
    Note over K8s: If not exited within<br/>terminationGracePeriodSeconds
    K8s->>Pod: Send SIGKILL (force kill)
```

**Why the `sleep 15` preStop hook?** There's a race condition: SIGTERM and endpoint removal happen in parallel. The sleep ensures network rules have updated before the app starts shutting down, preventing dropped connections.
