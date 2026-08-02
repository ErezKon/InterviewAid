# 1. Practice Exercises

## Table of Contents

- [Exercise 1: Multi-tier Application Deployment (Beginner)](#exercise-1-multi-tier-application-deployment-beginner)
- [Exercise 2: RBAC Configuration (Intermediate)](#exercise-2-rbac-configuration-intermediate)
- [Exercise 3: Zero-Downtime Deployment (Intermediate)](#exercise-3-zero-downtime-deployment-intermediate)
- [Exercise 4: Network Policy Design (Advanced)](#exercise-4-network-policy-design-advanced)
- [Exercise 5: Disaster Recovery & Debugging (Principal-Level)](#exercise-5-disaster-recovery-debugging-principal-level)
- [Exercise 6: Design Question (Principal-Level)](#exercise-6-design-question-principal-level)

---


## Exercise 1: Multi-tier Application Deployment (Beginner)

**Task:** Deploy a complete 3-tier application with the following requirements:

1. A PostgreSQL database (StatefulSet, 1 replica, 10Gi PVC)
2. A backend API (Deployment, 3 replicas) connecting to PostgreSQL
3. A frontend web app (Deployment, 2 replicas) connecting to the API
4. Services for each tier (PostgreSQL: headless, API: ClusterIP, Frontend: NodePort)
5. ConfigMap for API configuration
6. Secret for database credentials

```yaml
# SOLUTION

# 1. Namespace
apiVersion: v1
kind: Namespace
metadata:
  name: exercise-1

---
# 2. Database Secret
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
  namespace: exercise-1
type: Opaque
stringData:
  POSTGRES_USER: appuser
  POSTGRES_PASSWORD: SecurePass123!
  POSTGRES_DB: appdb
  DATABASE_URL: "postgresql://appuser:SecurePass123!@postgres-headless:5432/appdb"

---
# 3. API ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: api-config
  namespace: exercise-1
data:
  LOG_LEVEL: "info"
  PORT: "8080"
  FRONTEND_URL: "http://frontend:3000"

---
# 4. PostgreSQL Headless Service
apiVersion: v1
kind: Service
metadata:
  name: postgres-headless
  namespace: exercise-1
spec:
  clusterIP: None
  selector:
    app: postgres
  ports:
    - port: 5432

---
# 5. PostgreSQL StatefulSet
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: exercise-1
spec:
  serviceName: postgres-headless
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:15-alpine
          ports:
            - containerPort: 5432
          envFrom:
            - secretRef:
                name: db-secret
          resources:
            requests:
              cpu: "250m"
              memory: "256Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql/data
          readinessProbe:
            exec:
              command: ["pg_isready", "-U", "appuser", "-d", "appdb"]
            periodSeconds: 10
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi

---
# 6. API Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: exercise-1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: hashicorp/http-echo
          args: ["-text=API is running", "-listen=:8080"]
          ports:
            - containerPort: 8080
          envFrom:
            - configMapRef:
                name: api-config
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: db-secret
                  key: DATABASE_URL
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "200m"
              memory: "256Mi"
          readinessProbe:
            httpGet:
              path: /
              port: 8080
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /
              port: 8080
            periodSeconds: 15

---
# 7. API Service
apiVersion: v1
kind: Service
metadata:
  name: api
  namespace: exercise-1
spec:
  type: ClusterIP
  selector:
    app: api
  ports:
    - port: 80
      targetPort: 8080

---
# 8. Frontend Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: exercise-1
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: nginx:alpine
          ports:
            - containerPort: 80
          resources:
            requests:
              cpu: "50m"
              memory: "64Mi"
            limits:
              cpu: "100m"
              memory: "128Mi"
          readinessProbe:
            httpGet:
              path: /
              port: 80

---
# 9. Frontend Service
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: exercise-1
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
    - port: 3000
      targetPort: 80
      nodePort: 30080
```

---

## Exercise 2: RBAC Configuration (Intermediate)

**Task:** Create RBAC rules for the following scenario:

- Team `developers` can view pods, deployments, and services in `staging` namespace
- Team `devops` can manage everything in `staging` and `production` namespaces
- A CI/CD service account can only create and update deployments in `production`

```yaml
# SOLUTION

# Developer Role (staging)
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: developer-viewer
  namespace: staging
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log", "services", "endpoints"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["apps"]
    resources: ["deployments", "replicasets"]
    verbs: ["get", "list", "watch"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: developers-staging-view
  namespace: staging
subjects:
  - kind: Group
    name: developers
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: developer-viewer
  apiGroup: rbac.authorization.k8s.io

---
# DevOps ClusterRole (full namespace admin)
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: namespace-admin
rules:
  - apiGroups: ["", "apps", "batch", "networking.k8s.io", "autoscaling"]
    resources: ["*"]
    verbs: ["*"]

---
# DevOps RoleBinding for staging
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: devops-staging-admin
  namespace: staging
subjects:
  - kind: Group
    name: devops
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: namespace-admin
  apiGroup: rbac.authorization.k8s.io

---
# DevOps RoleBinding for production
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: devops-production-admin
  namespace: production
subjects:
  - kind: Group
    name: devops
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: namespace-admin
  apiGroup: rbac.authorization.k8s.io

---
# CI/CD ServiceAccount
apiVersion: v1
kind: ServiceAccount
metadata:
  name: cicd-deployer
  namespace: production

---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: deployment-manager
  namespace: production
rules:
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list", "create", "update", "patch"]
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]  # Needed to monitor rollout

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: cicd-deploy-binding
  namespace: production
subjects:
  - kind: ServiceAccount
    name: cicd-deployer
    namespace: production
roleRef:
  kind: Role
  name: deployment-manager
  apiGroup: rbac.authorization.k8s.io
```

---

## Exercise 3: Zero-Downtime Deployment (Intermediate)

**Task:** Configure a deployment with:
- Zero-downtime rolling updates
- Pod disruption budget
- HPA (3-10 replicas, target 70% CPU)
- Topology spread across AZs
- Proper graceful shutdown

```yaml
# SOLUTION

apiVersion: apps/v1
kind: Deployment
metadata:
  name: zero-downtime-app
  namespace: production
spec:
  replicas: 5
  revisionHistoryLimit: 5
  
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0     # Key: never reduce below desired count
  
  selector:
    matchLabels:
      app: zdt-app
  
  template:
    metadata:
      labels:
        app: zdt-app
    spec:
      terminationGracePeriodSeconds: 45
      
      topologySpreadConstraints:
        - maxSkew: 1
          topologyKey: topology.kubernetes.io/zone
          whenUnsatisfiable: DoNotSchedule
          labelSelector:
            matchLabels:
              app: zdt-app
      
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              podAffinityTerm:
                labelSelector:
                  matchLabels:
                    app: zdt-app
                topologyKey: kubernetes.io/hostname
      
      containers:
        - name: app
          image: myapp:v1.0.0
          ports:
            - containerPort: 8080
              name: http
          
          resources:
            requests:
              cpu: "500m"
              memory: "256Mi"
            limits:
              cpu: "1000m"
              memory: "512Mi"
          
          startupProbe:
            httpGet:
              path: /healthz
              port: http
            failureThreshold: 30
            periodSeconds: 5
          
          readinessProbe:
            httpGet:
              path: /ready
              port: http
            periodSeconds: 5
            failureThreshold: 2
            successThreshold: 1
          
          livenessProbe:
            httpGet:
              path: /healthz
              port: http
            periodSeconds: 15
            failureThreshold: 3
          
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sh", "-c", "sleep 15 && kill -SIGTERM 1"]

---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: zdt-app-pdb
  namespace: production
spec:
  minAvailable: 3
  selector:
    matchLabels:
      app: zdt-app

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: zdt-app-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: zero-downtime-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Pods
          value: 1
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 30
      policies:
        - type: Percent
          value: 50
          periodSeconds: 60
```

---

## Exercise 4: Network Policy Design (Advanced)

**Task:** Design network policies for this architecture:
- Frontend pods can only receive traffic from the ingress controller
- API pods can receive traffic from frontend pods only
- Database pods can receive traffic from API pods only
- All pods can make DNS queries
- No other traffic is allowed

```yaml
# SOLUTION

# Default deny all in the namespace
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: production
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress

---
# Allow DNS for all pods
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-dns
  namespace: production
spec:
  podSelector: {}
  policyTypes:
    - Egress
  egress:
    - to: []
      ports:
        - protocol: UDP
          port: 53
        - protocol: TCP
          port: 53

---
# Frontend: allow ingress from ingress controller, egress to API
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: frontend-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: frontend
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: ingress-nginx
          podSelector:
            matchLabels:
              app.kubernetes.io/name: ingress-nginx
      ports:
        - protocol: TCP
          port: 80
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: api
      ports:
        - protocol: TCP
          port: 8080

---
# API: allow ingress from frontend, egress to database
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 8080
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: postgres
      ports:
        - protocol: TCP
          port: 5432

---
# Database: allow ingress from API only
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: database-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: postgres
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: api
      ports:
        - protocol: TCP
          port: 5432
  # Only DNS egress (from the allow-dns policy)
```

---

## Exercise 5: Disaster Recovery & Debugging (Principal-Level)

**Scenario:** You receive an alert at 3 AM. The production API is returning 502 errors. Walk through your debugging process.

### Step-by-step Runbook:

```bash
# STEP 1: Assess the blast radius
kubectl get pods -n production -l app=api-server -o wide
kubectl get events -n production --sort-by='.lastTimestamp' | tail -20
kubectl top pods -n production -l app=api-server

# STEP 2: Check the Service and Endpoints
kubectl get svc api-server -n production
kubectl get endpoints api-server -n production
# If endpoints are empty → labels don't match or no pods are ready

# STEP 3: Check individual pod health
kubectl describe pod <pod-name> -n production
# Look for: Events, Conditions, Container State
# Look for: Readiness probe failures, OOMKilled, CrashLoopBackOff

# STEP 4: Check application logs
kubectl logs <pod-name> -n production --tail=100
kubectl logs <pod-name> -n production --previous  # If crashing

# STEP 5: Check if it's a resource issue
kubectl top nodes
kubectl describe node <node-name> | grep -A 10 "Allocated resources"
# If nodes are at capacity → pods may be evicted or pending

# STEP 6: Check ingress controller
kubectl logs -n ingress-nginx deploy/ingress-nginx-controller --tail=50
# Look for upstream connection errors

# STEP 7: Check network policies
kubectl get networkpolicy -n production
# Temporarily remove suspect policies to test

# STEP 8: Check if it's a downstream dependency
kubectl exec -it <pod-name> -n production -- /bin/sh
# From inside the pod:
nslookup postgres-headless
curl -v http://localhost:8080/health
curl -v http://redis:6379

# STEP 9: Check recent deployments (was something just released?)
kubectl rollout history deployment/api-server -n production
helm history api-server -n production

# STEP 10: If a bad deployment → rollback
kubectl rollout undo deployment/api-server -n production
# OR
helm rollback api-server 1 -n production
```

### Possible Root Causes Decision Matrix

```
502 Error
├── Pod Level
│   ├── All pods crashing → Check logs --previous, look for OOMKill
│   ├── Pods not ready → Readiness probe failing, check /health endpoint
│   └── No pods at all → Check Deployment replicas, ResourceQuota
├── Service Level
│   ├── No endpoints → Label mismatch between Service & Pod
│   └── Wrong port → targetPort doesn't match containerPort
├── Ingress Level
│   ├── Backend not found → Ingress annotation misconfiguration
│   └── SSL error → Certificate expired, check cert-manager
├── Network Level
│   ├── NetworkPolicy blocking → Recent policy change
│   └── DNS failure → CoreDNS pods down
└── Node Level
    ├── Node NotReady → kubelet issues, disk pressure
    └── Node full → Evictions happening, check resource pressure
```

---

## Exercise 6: Design Question (Principal-Level)

**Question:** "Design a Kubernetes architecture for a multi-region, highly available e-commerce platform that handles 100K requests/second with sub-200ms latency."

### Answer Framework:

```mermaid
graph TB
    subgraph Region_A["Region A (Primary)"]
        subgraph Cluster_A["EKS/GKE Cluster"]
            ING_A["Ingress + WAF"]
            API_A["API (HPA: 10-100)"]
            CACHE_A["Redis Cluster"]
            DB_A["PostgreSQL Primary"]
            MQ_A["Kafka"]
            WORKER_A["Workers (HPA: 5-50)"]
        end
    end
    
    subgraph Region_B["Region B (Secondary)"]
        subgraph Cluster_B["EKS/GKE Cluster"]
            ING_B["Ingress + WAF"]
            API_B["API (HPA: 10-100)"]
            CACHE_B["Redis Cluster"]
            DB_B["PostgreSQL Replica"]
            MQ_B["Kafka"]
            WORKER_B["Workers (HPA: 5-50)"]
        end
    end
    
    GLB["Global Load Balancer<br/>(Route53/CloudFlare)"]
    GLB -->|"Latency-based routing"| ING_A
    GLB -->|"Latency-based routing"| ING_B
    
    DB_A -->|"Streaming Replication"| DB_B
    MQ_A -->|"Mirror/Replicate"| MQ_B

    style GLB fill:#e74c3c,color:#fff
    style Region_A fill:#1a1a2e,color:#fff
    style Region_B fill:#16213e,color:#fff
```

### Key Design Decisions to Discuss:

```
1. CLUSTER STRATEGY
   - Multi-cluster (not multi-tenant) for blast radius isolation
   - Each region: 3 AZs with topology spread constraints
   - Node pools: system, application, data (with taints)

2. COMPUTE
   - API tier: Deployment + HPA (CPU + custom metrics: RPS)
   - Workers: Deployment + HPA (queue depth)
   - Cluster Autoscaler / Karpenter for node scaling
   - Pod: Guaranteed QoS for critical path, Burstable for workers

3. DATA
   - PostgreSQL: Operator-managed (Zalando/CrunchyData)
   - Redis: Operator-managed with Sentinel
   - Cross-region: async replication (accept eventual consistency)
   - Backups: CronJobs + velero for cluster state

4. NETWORKING
   - Service mesh (Istio/Linkerd) for mTLS, retries, circuit breaking
   - NetworkPolicies: default-deny + explicit allow
   - Gateway API for advanced traffic management

5. OBSERVABILITY
   - Prometheus + Thanos for multi-cluster metrics
   - Loki/ELK for centralized logging
   - Jaeger/Tempo for distributed tracing
   - PagerDuty integration for alerting

6. SECURITY
   - Pod Security Standards: restricted
   - RBAC with OIDC integration
   - External Secrets Operator → Vault
   - Image scanning in CI/CD (Trivy)
   - OPA/Gatekeeper for policy enforcement

7. CI/CD
   - GitOps with ArgoCD
   - Progressive delivery with Argo Rollouts
   - Canary deploys: 5% → 25% → 50% → 100%

8. COST OPTIMIZATION
   - Spot/preemptible nodes for workers (with PDBs)
   - VPA recommendations for right-sizing
   - Resource quotas per team namespace
```

---

# Quick Reference: Essential kubectl Commands

```bash
# Cheat sheet for interviews

# Context & Config
kubectl config get-contexts
kubectl config use-context <name>
kubectl config set-context --current --namespace=production

# Get resources (wide output, all namespaces, labels)
kubectl get pods -o wide -n production
kubectl get all -A
kubectl get pods -l app=api --show-labels
kubectl get pods -o yaml                    # Full YAML output
kubectl get pods -o jsonpath='{.items[*].metadata.name}'

# Create/Apply/Delete
kubectl apply -f manifest.yaml
kubectl apply -f ./directory/
kubectl delete -f manifest.yaml
kubectl create deployment nginx --image=nginx --replicas=3 --dry-run=client -o yaml

# Scaling
kubectl scale deployment/api --replicas=5
kubectl autoscale deployment/api --min=3 --max=10 --cpu-percent=70

# Updates
kubectl set image deployment/api api=myapp:v2
kubectl rollout status deployment/api
kubectl rollout undo deployment/api

# Debugging
kubectl describe pod <name>
kubectl logs <pod> [-c container] [--previous] [-f] [--tail=100]
kubectl exec -it <pod> -- /bin/sh
kubectl port-forward svc/api 8080:80
kubectl debug -it <pod> --image=busybox

# Resource usage
kubectl top nodes
kubectl top pods --sort-by=cpu

# Dry run & diff
kubectl apply -f manifest.yaml --dry-run=server
kubectl diff -f manifest.yaml
```

---

> **Final Interview Tips for Principal Level:**
> - Always discuss **trade-offs** (e.g., "We chose Deployment over StatefulSet because... but we lose...")
> - Demonstrate **systems thinking** — how components interact, failure cascades
> - Show **operational maturity** — monitoring, alerting, runbooks, chaos testing
> - Talk about **organizational impact** — platform teams, developer experience, golden paths
> - Know the **why** behind every decision, not just the **how**
