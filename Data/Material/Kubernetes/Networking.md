# 1. Networking

## Table of Contents

- [1.1 Kubernetes Network Model](#11-kubernetes-network-model)
- [1.2 Services](#12-services)
- [1.3 Ingress](#13-ingress)
- [1.4 Network Policies](#14-network-policies)
- [1.5 kube-proxy Modes](#15-kube-proxy-modes)

---


## 1.1 Kubernetes Network Model

**Three fundamental rules:**
1. Every pod gets its own IP address
2. Pods on any node can communicate with all pods on any other node without NAT
3. Agents on a node can communicate with all pods on that node

```mermaid
graph TB
    subgraph Cluster_Network["Cluster Network"]
        subgraph Node1["Node 1 (10.0.1.1)"]
            P1["Pod A<br/>10.244.1.2"]
            P2["Pod B<br/>10.244.1.3"]
        end
        subgraph Node2["Node 2 (10.0.1.2)"]
            P3["Pod C<br/>10.244.2.2"]
            P4["Pod D<br/>10.244.2.3"]
        end
        
        CNI["CNI Plugin<br/>(Calico/Cilium/Flannel)"]
        
        P1 <--> CNI
        P2 <--> CNI
        P3 <--> CNI
        P4 <--> CNI
    end
    
    SVC["ClusterIP Service<br/>10.96.0.10"]
    SVC --> P1
    SVC --> P3
    
    LB["LoadBalancer / Ingress"]
    LB --> SVC
    
    Internet["Internet"] --> LB

    style Cluster_Network fill:#0d1117,color:#c9d1d9
    style CNI fill:#f39c12,color:#000
```

## 1.2 Services

```mermaid
graph TD
    subgraph Service_Types["Service Types"]
        CIP["ClusterIP<br/>(Internal only)"]
        NP["NodePort<br/>(ClusterIP + port on each node)"]
        LB["LoadBalancer<br/>(NodePort + cloud LB)"]
        EXT["ExternalName<br/>(CNAME alias)"]
        HL["Headless<br/>(clusterIP: None)"]
    end
    
    CIP --> NP --> LB

    style CIP fill:#3498db,color:#fff
    style NP fill:#e67e22,color:#fff
    style LB fill:#e74c3c,color:#fff
    style EXT fill:#9b59b6,color:#fff
    style HL fill:#2ecc71,color:#fff
```

```yaml
# ClusterIP Service
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  type: ClusterIP       # Default
  selector:
    app: api-server
  ports:
    - name: http
      port: 80           # Service port
      targetPort: 8080    # Container port
      protocol: TCP

---
# NodePort Service
apiVersion: v1
kind: Service
metadata:
  name: api-nodeport
spec:
  type: NodePort
  selector:
    app: api-server
  ports:
    - port: 80
      targetPort: 8080
      nodePort: 30080     # 30000-32767 range

---
# LoadBalancer Service
apiVersion: v1
kind: Service
metadata:
  name: api-lb
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: "nlb"
    service.beta.kubernetes.io/aws-load-balancer-scheme: "internet-facing"
spec:
  type: LoadBalancer
  selector:
    app: api-server
  ports:
    - port: 443
      targetPort: 8080

---
# Headless Service (for StatefulSets or client-side discovery)
apiVersion: v1
kind: Service
metadata:
  name: db-headless
spec:
  clusterIP: None
  selector:
    app: database
  ports:
    - port: 5432
```

### Service DNS Resolution

```
<service-name>.<namespace>.svc.cluster.local

# Examples:
api-service.default.svc.cluster.local
api-service.default     # shortened form
api-service             # within same namespace
```

## 1.3 Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: main-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - api.example.com
        - www.example.com
      secretName: tls-secret
  
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /v1
            pathType: Prefix
            backend:
              service:
                name: api-v1
                port:
                  number: 80
          - path: /v2
            pathType: Prefix
            backend:
              service:
                name: api-v2
                port:
                  number: 80
    
    - host: www.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web-frontend
                port:
                  number: 80
```

### Ingress Traffic Flow

```mermaid
graph LR
    Client["Client"] --> DNS["DNS<br/>api.example.com"]
    DNS --> LB["Cloud Load Balancer"]
    LB --> IC["Ingress Controller<br/>(nginx pod)"]
    IC -->|"/v1"| SVC1["api-v1 Service"]
    IC -->|"/v2"| SVC2["api-v2 Service"]
    SVC1 --> P1["Pod"]
    SVC1 --> P2["Pod"]
    SVC2 --> P3["Pod"]

    style IC fill:#e74c3c,color:#fff
```

## 1.4 Network Policies

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-network-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: api-server
  
  policyTypes:
    - Ingress
    - Egress
  
  ingress:
    # Allow traffic from frontend pods
    - from:
        - podSelector:
            matchLabels:
              app: frontend
        - namespaceSelector:
            matchLabels:
              env: production
      ports:
        - protocol: TCP
          port: 8080
    
    # Allow traffic from monitoring namespace
    - from:
        - namespaceSelector:
            matchLabels:
              name: monitoring
      ports:
        - protocol: TCP
          port: 9090
  
  egress:
    # Allow DNS
    - to: []
      ports:
        - protocol: UDP
          port: 53
        - protocol: TCP
          port: 53
    
    # Allow database access
    - to:
        - podSelector:
            matchLabels:
              app: postgres
      ports:
        - protocol: TCP
          port: 5432
    
    # Allow external HTTPS
    - to:
        - ipBlock:
            cidr: 0.0.0.0/0
            except:
              - 10.0.0.0/8
              - 172.16.0.0/12
              - 192.168.0.0/16
      ports:
        - protocol: TCP
          port: 443
```

### Default Deny Policies (Security Best Practice)

```yaml
# Deny all ingress traffic in a namespace
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: production
spec:
  podSelector: {}          # Matches ALL pods
  policyTypes:
    - Ingress
    # No ingress rules = deny all

---
# Deny all egress traffic in a namespace
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-egress
  namespace: production
spec:
  podSelector: {}
  policyTypes:
    - Egress
```

## 1.5 kube-proxy Modes

```mermaid
graph TD
    subgraph iptables_mode["iptables mode (default)"]
        SVC_IP1["Service IP<br/>10.96.0.10:80"] --> IPT["iptables rules"]
        IPT -->|"random"| EP1["10.244.1.5:8080"]
        IPT -->|"random"| EP2["10.244.2.3:8080"]
        IPT -->|"random"| EP3["10.244.3.7:8080"]
    end
    
    subgraph ipvs_mode["IPVS mode (high performance)"]
        SVC_IP2["Service IP<br/>10.96.0.10:80"] --> IPVS["IPVS virtual server"]
        IPVS -->|"rr/lc/wrr"| RS1["10.244.1.5:8080"]
        IPVS -->|"rr/lc/wrr"| RS2["10.244.2.3:8080"]
        IPVS -->|"rr/lc/wrr"| RS3["10.244.3.7:8080"]
    end
```

**Principal-level insight:** IPVS mode is preferred for large clusters (>1000 services) because it uses hash tables (O(1) lookup) vs iptables' linear chain scanning (O(n)). IPVS also supports richer load-balancing algorithms (round-robin, least-connections, weighted).
