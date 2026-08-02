# 1. Architecture Deep Dive

## Table of Contents

- [1.1 High-Level Architecture](#11-high-level-architecture)
- [1.2 Component Responsibilities](#12-component-responsibilities)
- [1.3 API Request Flow](#13-api-request-flow)
- [1.4 etcd Deep Dive](#14-etcd-deep-dive)

---


## 1.1 High-Level Architecture

```mermaid
graph TB
    subgraph Control_Plane["Control Plane (Master)"]
        API["kube-apiserver"]
        ETCD["etcd cluster"]
        SCHED["kube-scheduler"]
        CM["kube-controller-manager"]
        CCM["cloud-controller-manager"]

        API --> ETCD
        SCHED --> API
        CM --> API
        CCM --> API
    end

    subgraph Worker_Node_1["Worker Node 1"]
        KUBELET1["kubelet"]
        KPROXY1["kube-proxy"]
        CRI1["Container Runtime (containerd)"]
        subgraph Pods1["Pods"]
            P1A["Pod A"]
            P1B["Pod B"]
        end
        KUBELET1 --> CRI1
        CRI1 --> P1A
        CRI1 --> P1B
    end

    subgraph Worker_Node_2["Worker Node 2"]
        KUBELET2["kubelet"]
        KPROXY2["kube-proxy"]
        CRI2["Container Runtime (containerd)"]
        subgraph Pods2["Pods"]
            P2A["Pod C"]
            P2B["Pod D"]
        end
        KUBELET2 --> CRI2
        CRI2 --> P2A
        CRI2 --> P2B
    end

    KUBELET1 --> API
    KUBELET2 --> API
    KPROXY1 --> API
    KPROXY2 --> API

    style Control_Plane fill:#1a1a2e,color:#fff
    style Worker_Node_1 fill:#16213e,color:#fff
    style Worker_Node_2 fill:#16213e,color:#fff
```

## 1.2 Component Responsibilities

### Control Plane Components

| Component | Responsibility | Key Details |
|-----------|---------------|-------------|
| **kube-apiserver** | Frontend to the control plane | REST API, authentication, authorization, admission control, only component that talks to etcd |
| **etcd** | Distributed key-value store | Stores all cluster state, uses Raft consensus, should always run in odd numbers (3, 5, 7) |
| **kube-scheduler** | Assigns pods to nodes | Filtering → Scoring pipeline; considers affinity, taints, resources |
| **kube-controller-manager** | Runs controller loops | Deployment, ReplicaSet, Node, Service Account controllers, etc. |
| **cloud-controller-manager** | Cloud-provider integration | LoadBalancer services, node lifecycle, route management |

### Node Components

| Component | Responsibility | Key Details |
|-----------|---------------|-------------|
| **kubelet** | Node agent | Manages pod lifecycle, reports node status, runs liveness/readiness probes |
| **kube-proxy** | Network proxy | Maintains network rules (iptables/IPVS), enables Service abstraction |
| **Container Runtime** | Runs containers | containerd, CRI-O (Docker shim removed in 1.24+) |

## 1.3 API Request Flow

```mermaid
sequenceDiagram
    participant User as kubectl / Client
    participant API as kube-apiserver
    participant Auth as Authentication
    participant Authz as Authorization (RBAC)
    participant Admit as Admission Controllers
    participant ETCD as etcd
    participant Sched as kube-scheduler
    participant KL as kubelet

    User->>API: POST /api/v1/namespaces/default/pods
    API->>Auth: Authenticate (certs, tokens, OIDC)
    Auth-->>API: Identity confirmed
    API->>Authz: Authorize (RBAC check)
    Authz-->>API: Allowed
    API->>Admit: Mutating Admission Webhooks
    Admit-->>API: Modified Object
    API->>Admit: Validating Admission Webhooks
    Admit-->>API: Approved
    API->>ETCD: Persist Pod (status: Pending)
    ETCD-->>API: Confirmed
    API-->>User: 201 Created

    Note over Sched: Watch loop detects unscheduled pod
    Sched->>API: GET unscheduled pods
    Sched->>Sched: Filter & Score nodes
    Sched->>API: PATCH pod.spec.nodeName
    API->>ETCD: Update pod binding

    Note over KL: Watch loop detects new pod assignment
    KL->>API: GET pod spec
    KL->>KL: Pull image, create containers
    KL->>API: PATCH pod status (Running)
    API->>ETCD: Update pod status
```

## 1.4 etcd Deep Dive

**Why is etcd critical?**
- It is the **single source of truth** for the entire cluster
- Loss of etcd = loss of cluster state
- Uses **Raft consensus** algorithm (needs majority quorum)

```bash
# Backup etcd (critical production skill)
ETCDCTL_API=3 etcdctl snapshot save /backup/etcd-snapshot.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key

# Verify the backup
ETCDCTL_API=3 etcdctl snapshot status /backup/etcd-snapshot.db --write-table

# Restore etcd
ETCDCTL_API=3 etcdctl snapshot restore /backup/etcd-snapshot.db \
  --data-dir=/var/lib/etcd-restored
```

**Principal-level insight:** etcd stores data in a B+ tree with MVCC (Multi-Version Concurrency Control). The `resourceVersion` field on every Kubernetes object maps to the etcd `mod_revision`. This is how **watch** and **optimistic concurrency** work.
