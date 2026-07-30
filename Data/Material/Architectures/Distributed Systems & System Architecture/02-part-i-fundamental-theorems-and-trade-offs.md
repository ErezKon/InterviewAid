## Part I: Fundamental Theorems & Trade-offs

### Table of Contents

- [CAP Theorem](#cap-theorem)
  - [Origin & Statement](#origin-and-statement)
  - [Defining Each Property](#defining-each-property)
  - [Why "Pick 2" Is Misleading](#why-pick-2-is-misleading)
  - [Real-World System Classifications](#real-world-system-classifications)
  - [Detailed Example: CP System Behavior](#detailed-example-cp-system-behavior)
  - [Detailed Example: AP System Behavior](#detailed-example-ap-system-behavior)
  - [Common Misconceptions](#common-misconceptions)
- [PACELC Theorem](#pacelc-theorem)
  - [Motivation](#motivation)
  - [Statement (Daniel Abadi, 2010)](#statement-daniel-abadi-2010)
  - [The Else (E) Clause — Why It Matters](#the-else-e-clause-why-it-matters)
  - [Real-World PACELC Classifications](#real-world-pacelc-classifications)
  - [Why PACELC Is More Useful Than CAP for System Design](#why-pacelc-is-more-useful-than-cap-for-system-design)
- [Consistency Models](#consistency-models)
  - [Spectrum of Consistency Models](#spectrum-of-consistency-models)
  - [1. Strong Consistency (Linearizability)](#1-strong-consistency-linearizability)
  - [2. Eventual Consistency](#2-eventual-consistency)
  - [3. Read-Your-Writes (Session Consistency)](#3-read-your-writes-session-consistency)
  - [4. Causal Consistency](#4-causal-consistency)
  - [Consistency Models Comparison Summary](#consistency-models-comparison-summary)


---

### CAP Theorem

#### Origin & Statement

Proposed by **Eric Brewer** in 2000 (proven by Gilbert and Lynch in 2002), the CAP theorem states:

> **A distributed data store can provide at most two of the following three guarantees simultaneously:**

```mermaid
flowchart TB
    Consistency["Consistency\n(Linearizable)"]
    Availability["Availability"]
    Partition["Partition Tolerance"]

    CP["CP Systems"]
    CA["CA Systems"]
    AP["AP Systems"]

    Consistency --> CP
    Consistency --> CA

    Availability --> CP
    Availability --> AP

    Partition --> CA
    Partition --> AP
```

#### Defining Each Property

**Consistency (C) — Linearizability**
Every read receives the most recent write or an error. All nodes see the same data at the same time.
```mermaid
flowchart LR
    Client([Client]) -->|Write X=5| NodeA[Node A: X=5]
    NodeA -->|Replicates| NodeB[Node B: X=5]
    subgraph CG [Consistency Guarantee]
        NodeA
        NodeB
    end
    ReadNote["Any subsequent read returns X=5<br/>(no stale data permitted)"]
    
    CG -.-> ReadNote
```

**Availability (A)**
Every request (read or write) receives a non-error response, without the guarantee that it contains the most recent write. No request is ever rejected (as long as a non-failing node receives it).
Client sends request to Node B
─────────────────────────────────────────────
  Node B MUST respond, even if it hasn't 
  received the latest update from Node A.
  Response may be stale, but it IS a response.

**Partition Tolerance (P)**
The system continues to operate despite an arbitrary number of messages being dropped or delayed between nodes.

```
  Node A ◄──── ✕ NETWORK PARTITION ✕ ────► Node B
  
  Both nodes are alive but cannot communicate.
  The system must still function in some capacity.
```

#### Why "Pick 2" Is Misleading

In any real-world distributed system, **network partitions WILL happen** (cables fail, switches die, cloud availability zones lose connectivity). Therefore, the practical choice is:

> **When a partition occurs, do you sacrifice Consistency or Availability?**

```mermaid
graph TD
    Trigger["⚠️ Network Partition Occurs!"]

    %% CP Branch
    Trigger --> CP["Choose Consistency (CP)"]
    
    subgraph CP_Path ["CP Strategy"]
        direction TB
        CP --> CP_Action["Refuse to serve requests on nodes<br/>that cannot confirm latest data"]
        CP_Action --> CP_Outcome["💥 Result: Some requests return<br/>errors or timeouts"]
    end

    %% AP Branch
    Trigger --> AP["Choose Availability (AP)"]

    subgraph AP_Path ["AP Strategy"]
        direction TB
        AP --> AP_Action["Every node continues<br/>serving requests"]
        AP_Action --> AP_Outcome["⚠️ Result: Some responses<br/>may return stale data"]
        AP_Outcome --> AP_Reconcile["🔄 Conflicts resolved later<br/>(async reconciliation / repair)"]
    end

    %% Styling
    style Trigger fill:#FFF3E0,stroke:#F57C00,color:#E65100
    style CP fill:#E1F5FE,stroke:#0288D1,color:#01579B
    style CP_Outcome fill:#FFEBEE,stroke:#D32F2F,color:#B71C1C
    style AP fill:#E8F5E9,stroke:#388E3C,color:#1B5E20
    style AP_Reconcile fill:#F3E5F5,stroke:#7B1FA2,color:#4A148C
```

#### Real-World System Classifications

| Category | System | Trade-off Behavior |
|----------|--------|--------------------|
| **CP** | HBase, MongoDB (default), Zookeeper, etcd, Consul, Google Spanner | During partition: rejects writes/reads on minority partition to preserve consistency |
| **AP** | Cassandra, DynamoDB, CouchDB, Riak, Eureka | During partition: all nodes continue serving; may return stale data; conflicts resolved via vector clocks, LWW, or CRDTs |
| **CA** | Traditional RDBMS (single-node PostgreSQL, MySQL) | Not truly distributed — no partition tolerance because there's only one node or a tightly coupled cluster |

#### Detailed Example: CP System Behavior

```mermaid
graph TD
    %% Node Definitions & Layout
    subgraph Cluster ["Scenario: 3-Node Cluster using Raft Consensus"]

        %% Step 1: Normal Operation
        subgraph Normal ["1. Normal Operation"]
            direction TB
            Client_N["Client"] -->|"1. write(X=42)"| Leader_A["Leader (Node A)"]
            Leader_A -->|"2. Replicate"| Node_B["Follower (Node B)"]
            Leader_A -->|"2. Replicate"| Node_C["Follower (Node C)"]
            Node_B -.->|"3. Ack"| Leader_A
            Node_C -.->|"3. Ack"| Leader_A
            Leader_A -->|"4. Confirm Write<br/>(Majority 2/3 achieved)"| Client_N
        end

        %% Step 2: Network Partition
        subgraph Part ["2. Network Partition: [A, B] | [C]"]
            direction TB

            %% Majority Subgraph
            subgraph P1 ["Majority Partition: [A, B] (2/3 Quorum)"]
                direction TB
                Client_P1["Client"] -->|"write / read"| Node_A1["Node A (Leader)"]
                Node_A1 <-->|"Replicate"| Node_B1["Node B"]
                Node_A1 -.->|"Succeeds ✓<br/>(Can form majority)"| Client_P1
            end

            %% Minority Subgraph
            subgraph P2 ["Minority Partition: [C] (1/3 No Quorum)"]
                direction TB
                Client_P2["Client"] -.->|"write / read"| Node_C1["Node C (Isolated)"]
                Node_C1 -.->|"REFUSED / Timeout ✗<br/>(Cannot form majority)"| Client_P2
            end

        end

    end

    Result["Result: CONSISTENT but NOT fully AVAILABLE (CP behavior)"]

    %% Flow Connections
    Normal --> Part
    Part --> Result

    %% Styling
    style P1 fill:#E8F5E9,stroke:#388E3C,color:#1B5E20
    style P2 fill:#FFEBEE,stroke:#D32F2F,color:#B71C1C
    style Result fill:#E1F5FE,stroke:#0288D1,color:#01579B
```

#### Detailed Example: AP System Behavior

```mermaid
graph TD
    %% Node Definitions & Layout
    
    subgraph Config ["Scenario: Cassandra (RF=3, Consistency Level ONE)"]
        
        %% Step 1: Normal Operation
        subgraph Normal ["1. Normal Operation"]
            direction TB
            N_Client["Client"] -->|"write(X=42)"| N_Coord["Any Node (Coordinator)"]
            N_Coord -.->|"Async Replicate"| N_Repl["Replicas"]
            N_Coord -->|"Ack after 1 replica confirms (Fast!)"| N_Client
        end

        %% Step 2: Partition Event
        subgraph Part ["2. Network Partition: [A, B] | [C]"]
            direction TB
            
            subgraph P1 ["Partition 1"]
                NodeA["Node A (X=42)"]
                NodeB["Node B"]
            end

            subgraph P2 ["Partition 2"]
                NodeC["Node C (X=99)"]
            end

            Client1["Client"] -->|"write(X=42)"| NodeA
            Client2["Client"] -->|"write(X=99)"| NodeC
            
            NodeA -.->|"Succeeds ✓"| Client1
            NodeC -.->|"Succeeds ✓"| Client2
        end

        ConflictNote["⚠️ Inconsistent State!<br/>Nodes A & B have X=42 | Node C has X=99"]

        %% Step 3: Healing & Resolution
        subgraph Heal ["3. Partition Heals & Repair"]
            direction TB
            H_Heal["Partition Heals"]
            H_Repair["Anti-Entropy Repair Runs"]
            H_LWW["Resolve via Last-Write-Wins (LWW)<br/>Compare Timestamps"]
            H_Final["Data Converges (Eventual Consistency)"]

            H_Heal --> H_Repair --> H_LWW --> H_Final
        end

    end

    Result["Result: AVAILABLE but NOT strictly CONSISTENT during partition (AP behavior)"]

    %% Flow Connections
    Normal --> Part
    Part --> ConflictNote
    ConflictNote --> Heal
    Heal --> Result

    %% Styling
    style ConflictNote fill:#FFEBEE,stroke:#D32F2F,color:#B71C1C
    style Result fill:#FFF3E0,stroke:#F57C00,color:#E65100
```

#### Common Misconceptions

```
 ✗ WRONG: "CAP means you always pick exactly two and never get the third"
 ✓ RIGHT: During NORMAL operation, you can have all three. The trade-off
           only manifests DURING a partition.

 ✗ WRONG: "Consistency in CAP means ACID consistency"
 ✓ RIGHT: CAP Consistency specifically means LINEARIZABILITY — 
           every read sees the latest write. ACID consistency is about
           database invariants/constraints.

 ✗ WRONG: "AP systems have no consistency at all"
 ✓ RIGHT: AP systems typically provide EVENTUAL consistency. Data
           converges over time. Many also offer tunable consistency.
```

---

### PACELC Theorem

#### Motivation

CAP only addresses what happens **during** a partition. But partitions are rare events. What about the **99.9% of the time** when the network is functioning normally? That's where PACELC comes in.

#### Statement (Daniel Abadi, 2010)

> **If there is a Partition (P), how does the system trade off between Availability (A) and Consistency (C); Else (E), when operating normally, how does it trade off between Latency (L) and Consistency (C)?**

```mermaid
flowchart TB
    Q{"Is there a network partition?"}
    Yes["YES (PAC)\nTrade-off A vs C"]
    No["NO (ELC)\nTrade-off L vs C"]

    Q --> Yes
    Q --> No
```

#### The Else (E) Clause — Why It Matters

Even without partitions, replicating data across nodes takes time. A system must choose:

```mermaid
graph TD
    subgraph O1 ["Option 1: Low Latency (EL)"]
        direction TB
        C1["Client"] -->|"1. Write Request"| A1["Node A"]
        A1 -->|"2. Immediate Response"| C1
        A1 -.->|"3. Background Async Replication"| B1["Node B"]

        O1_Outcome["⚡ Fast!<br/>⚠️ Node B read may see stale data"]
        A1 -.- O1_Outcome
    end

    subgraph O2 ["Option 2: Strong Consistency (EC)"]
        direction TB
        C2["Client"] -->|"1. Write Request"| A2["Node A"]
        A2 -->|"2. Replicate Write"| BC2["Nodes B & C"]
        BC2 -->|"3. Acknowledgments"| A2
        A2 -->|"4. Response to Client"| C2

        O2_Outcome["⏳ Slower!<br/>✓ Guaranteed up-to-date across all nodes"]
        A2 -.- O2_Outcome
    end

    %% Styling
    style O1_Outcome fill:#FFF3E0,stroke:#F57C00,color:#E65100
    style O2_Outcome fill:#E8F5E9,stroke:#388E3C,color:#1B5E20
```

#### Real-World PACELC Classifications

| System | PAC Choice | ELC Choice | Full Classification | Explanation |
|--------|-----------|-----------|--------------------|----|
| **DynamoDB / Cassandra** | PA | EL | PA/EL | During partition: stay available. Normally: prioritize low latency over strict consistency |
| **MongoDB (default)** | PC | EC | PC/EC | During partition: sacrifice availability. Normally: wait for replication to ensure consistency |
| **Google Spanner** | PC | EC | PC/EC | Uses TrueTime + synchronized clocks for global consistency. Accepts higher latency |
| **Cosmos DB** | PA or PC (tunable) | EL or EC (tunable) | Tunable | Offers five consistency levels; the developer chooses the trade-off per request |
| **PNUTS (Yahoo)** | PC | EL | PC/EL | During partition: prefers consistency. Normally: optimizes for latency via async replication with per-record timeline consistency |

#### Why PACELC Is More Useful Than CAP for System Design

```mermaid
graph TD
    Root["Global E-Commerce Platform<br/>Database Strategy"]

    %% CAP Limitation Node
    subgraph CAP ["CAP Analysis (Too Vague)"]
        CAP_Text["'Need Partition Tolerance → Pick CP or AP'<br/>⚠️ Not granular enough for multi-use-case systems"]
    end

    %% PACELC Solution
    subgraph PACELC ["PACELC Granular Analysis"]
        
        %% Product Catalog
        subgraph Cat ["Product Catalog"]
            Cat_Trade["Trade-off: PA / EL"]
            Cat_Req["Requirements:<br/>• High Availability<br/>• Low latency reads<br/>• Eventual consistency OK"]
            Cat_DB["Recommended DBs:<br/>• Apache Cassandra<br/>• AWS DynamoDB"]
            Cat_Trade --> Cat_Req --> Cat_DB
        end

        %% Payment Ledger
        subgraph Pay ["Payment Ledger"]
            Pay_Trade["Trade-off: PC / EC"]
            Pay_Req["Requirements:<br/>• Strong consistency<br/>• Zero lost/duplicate txns<br/>• Accepts higher latency"]
            Pay_DB["Recommended DBs:<br/>• Google Spanner<br/>• CockroachDB<br/>• PostgreSQL (Sync Repl)"]
            Pay_Trade --> Pay_Req --> Pay_DB
        end

        %% User Session Store
        subgraph Sess ["User Session Store"]
            Sess_Trade["Trade-off: PA / EL"]
            Sess_Req["Requirements:<br/>• Always available<br/>• Fast session lookup<br/>• Slight staleness tolerable"]
            Sess_DB["Recommended DBs:<br/>• Redis Cluster<br/>• AWS DynamoDB"]
            Sess_Trade --> Sess_Req --> Sess_DB
        end

    end

    Root --> CAP
    Root -->|"Apply PACELC Model"| PACELC

    %% Styling
    style CAP_Text fill:#FFEBEE,stroke:#D32F2F,color:#B71C1C
    style Cat_DB fill:#E3F2FD,stroke:#1976D2,color:#0D47A1
    style Pay_DB fill:#E8F5E9,stroke:#388E3C,color:#1B5E20
    style Sess_DB fill:#FFF3E0,stroke:#F57C00,color:#E65100
```

---

### Consistency Models

Consistency models define the **contract** between a distributed data store and its clients regarding the order and visibility of operations.

#### Spectrum of Consistency Models

```mermaid
flowchart LR
    Strong["STRONGEST"]
    Linear["Linearizable (Strict)"]
    Sequential["Sequential Consistency"]
    Causal["Causal"]
    ReadYourWrites["Read-your-writes"]
    Eventual["Eventual"]
    Weak["WEAKEST"]

    Strong --> Linear --> Sequential --> Causal --> ReadYourWrites --> Eventual --> Weak
```

#### 1. Strong Consistency (Linearizability)

> **Once a write completes, ALL subsequent reads (from any node) return that written value or a more recent one.**

```mermaid
sequenceDiagram
    participant A as Client A
    participant B as Client B
    participant C as Client C
    participant DB as Database

    A->>DB: write(X=1)
    DB-->>A: ack (write committed)

    B->>DB: read(X)
    DB-->>B: X=1

    C->>DB: read(X)
    DB-->>C: X=1
```

**Implementation Mechanisms:**
```mermaid
graph TD
    subgraph S1 ["1. Single-Leader Replication (Synchronous)"]
        direction TB
        Client["Client"]
        Leader["Leader"]
        F1["Follower 1"]
        F2["Follower 2"]

        Client -->|"1. Write Request"| Leader
        Leader -->|"2a. Sync Write"| F1
        Leader -->|"2b. Sync Write"| F2
        F1 -.->|"3a. Ack"| Leader
        F2 -.->|"3b. Ack"| Leader
        Leader -->|"4. Respond (after all Acks)"| Client
    end

    subgraph S2 ["2. Consensus Protocols (Raft, Paxos, ZAB)"]
        direction LR
        P["Propose"] --> M["Majority Agree"] --> C["Commit"] --> R["Respond"]
    end

    subgraph S3 ["3. Google Spanner's TrueTime"]
        direction LR
        Hardware["GPS + Atomic Clocks"] --> TS["Assign Globally<br/>Ordered Timestamps"]
        TS --> Wait["Commit-Wait<br/>(Wait for uncertainty interval)"]
        Wait --> Commit["Commit"]
    end
```

**Trade-offs:**
```
  ✓ Simplest mental model for developers
  ✓ No stale reads, no anomalies
  ✗ Highest latency (must coordinate across nodes)
  ✗ Lowest availability (unavailable during partitions in CP systems)
  ✗ Lower throughput (serialized operations)
```

**Use cases:** Financial transactions, inventory management, distributed locks, leader election.

---

#### 2. Eventual Consistency

> **If no new writes are made, all replicas will EVENTUALLY converge to the same value. There is no bound on how long "eventually" takes.**

```mermaid
sequenceDiagram
    participant A as Client A
    participant N1 as Node 1
    participant B as Client B
    participant N2 as Node 2

    A->>N1: write(X=1)
    N1-->>A: ack (immediate)

    B->>N2: read(X)
    N2-->>B: X=0 (stale)

    Note over N1,N2: Async replication completes

    B->>N2: read(X)
    N2-->>B: X=1 (eventually consistent)
```

**How Convergence Happens:**
```
1. Anti-entropy (background repair)
   Nodes periodically compare Merkle trees of their data
   Differences are synchronized
   
2. Read repair
   When a read detects stale data, trigger background update
   Coordinator reads from multiple replicas, returns freshest,
   sends update to stale replicas

3. Hinted handoff
   If target node is down, another node stores a "hint"
   When target recovers, hints are forwarded

4. Conflict resolution
   Last-Write-Wins (LWW): Timestamp-based, simple but can lose data
   Vector Clocks: Detect concurrent writes, surface conflicts
   CRDTs: Data structures that mathematically guarantee convergence
```

**Conflict Resolution Deep Dive:**
```mermaid
graph TD
    %% --- Section 1: Last-Write-Wins ---
    subgraph LWW ["1. Last-Write-Wins (LWW)"]
        direction TB
        LWW_A["Node A: write(X=1)<br/>Timestamp T=100"]
        LWW_B["Node B: write(X=2)<br/>Timestamp T=101"]
        LWW_Comp{"Compare Timestamps<br/>(T=101 > T=100)"}
        LWW_Win["Winner: Node B (X=2)"]
        LWW_Risk["⚠️ Problem: Clock skew can cause<br/>an earlier write to win unfairly"]

        LWW_A --> LWW_Comp
        LWW_B --> LWW_Comp
        LWW_Comp --> LWW_Win
        LWW_Win -.- LWW_Risk
    end

    %% --- Section 2: Vector Clocks ---
    subgraph VC ["2. Vector Clocks"]
        direction TB
        VC_A["Node A: write(X=1)<br/>Clock: {A:1}"]
        VC_B["Node B: write(X=2)<br/>Clock: {B:1}"]
        VC_Detect{"Check Causality<br/>Neither happened before"}
        VC_Action["Surface Conflict to Application<br/>for Resolution"]

        VC_A --> VC_Detect
        VC_B --> VC_Detect
        VC_Detect -->|"Concurrent"| VC_Action
    end

    %% --- Section 3: CRDTs ---
    subgraph CRDT ["3. CRDTs (G-Counter Example)"]
        direction TB
        CRDT_A["Node A: local_count = 5"]
        CRDT_B["Node B: local_count = 3"]
        CRDT_Merge["Merge Strategy: Sum of all nodes"]
        CRDT_Total["Total = 8<br/>✓ Always converges, no conflicts"]

        CRDT_A --> CRDT_Merge
        CRDT_B --> CRDT_Merge
        CRDT_Merge --> CRDT_Total
    end

    %% Styling
    style LWW_Risk fill:#FFEBEE,stroke:#D32F2F,color:#B71C1C
    style CRDT_Total fill:#E8F5E9,stroke:#388E3C,color:#1B5E20
```

**Trade-offs:**
```
  ✓ Highest availability (always accept writes)
  ✓ Lowest latency (no coordination needed)
  ✓ Best throughput
  ✗ Stale reads possible (inconsistency window)
  ✗ Conflict resolution complexity
  ✗ Hard to reason about application correctness
```

**Use cases:** Social media feeds, DNS, product reviews, shopping cart (Amazon's original Dynamo paper).

---

#### 3. Read-Your-Writes (Session Consistency)

> **A client will always see its own writes. Other clients may see stale data.**

```mermaid
sequenceDiagram
    autonumber
    actor A as Client A
    participant DB as Storage / Database (X)
    actor B as Client B

    Note over A,B: Timeline progression ──►

    rect rgb(235, 245, 255)
        A->>DB: write(X=1)
        A->>DB: read(X)
        DB-->>A: returns 1 ✓ (ALWAYS sees own write)
    end

    rect rgb(255, 243, 224)
        B->>DB: read(X)
        DB-->>B: returns 0 ❓ (May see stale value — allowed)
    end

    Note over A,B: Read-Your-Own-Writes Consistency<br/>• Weaker than linearizability, stronger than eventual consistency<br/>• Prevents updating your profile and then seeing the old version
```

**Implementation Strategies:**
```
Strategy 1: Sticky Sessions (Session Affinity)
  Load balancer routes all requests from same client to same node
  Since the node has the write, reads will see it
  Problem: If that node dies, session is lost
  
Strategy 2: Read from leader/writer
  Client reads from the same node that handled its write
  Other reads can go to any replica
  
Strategy 3: Logical timestamps
  After a write, client receives a token/timestamp
  On subsequent reads, client sends the token
  Server only responds if its data is at least as fresh as the token
  
  Client ──write──► Server returns version=42
  Client ──read(min_version=42)──► Server
    If server version >= 42 → respond
    If server version < 42  → wait or redirect to fresher replica
```

**Use cases:** User profile updates, email (sent mail appears in Sent folder immediately), any UI where user expects to see their own changes.

---

#### 4. Causal Consistency

> **Operations that are causally related are seen by all nodes in the same order. Concurrent (unrelated) operations may be seen in different orders.**

```
Causal Relationship:
  If operation A could have INFLUENCED operation B,
  then A "happened before" B, and all nodes must see A before B.

Example — Social media comments:

  User A posts:    "What's your favorite language?"     (op1)
  User B replies:  "I love Rust!"                       (op2, caused by op1)
  User C replies:  "Python for me!"                     (op3, caused by op1)

  Causal ordering requires:
    op1 BEFORE op2  ✓ (op2 is a reply to op1)
    op1 BEFORE op3  ✓ (op3 is a reply to op1)
    op2 and op3 are CONCURRENT (no causal relationship)
    → Some nodes may show op2 before op3, others op3 before op2. Both valid!
    
  INVALID ordering:
    Showing op2 without op1 ✗ (reply before the original post makes no sense)
```

**Implementation — Lamport Clocks & Vector Clocks:**
```
Lamport Clocks (logical timestamps):
  Each node maintains a counter
  On local event: counter++
  On send: attach counter to message
  On receive: counter = max(local, received) + 1
  
  Gives total order but CANNOT determine concurrency

Vector Clocks:
  Each node maintains a vector of counters [A:0, B:0, C:0]
  
  Node A writes: [A:1, B:0, C:0]
  Node B reads A's write, then writes: [A:1, B:1, C:0]
    → B's write is causally AFTER A's write
    
  Node C writes independently: [A:0, B:0, C:1]
    → C's write is CONCURRENT with both A and B
    
  Comparison rules:
    V1 < V2  if all V1[i] ≤ V2[i] and at least one V1[i] < V2[i]
    V1 ∥ V2  if neither V1 < V2 nor V2 < V1 (concurrent)
```

**Trade-offs:**
```
  ✓ Preserves intuitive ordering of related events
  ✓ Better availability than linearizability (concurrent ops are flexible)
  ✓ Matches human expectations in many applications
  ✗ More metadata overhead (vector clocks grow with number of nodes)
  ✗ More complex implementation than eventual consistency
  ✗ Still allows some reordering (concurrent operations)
```

**Use cases:** Collaborative editing, social media, distributed version control (Git), chat applications.

---

#### Consistency Models Comparison Summary

| Model | Guarantee | Latency | Availability | Complexity | Example System |
|-------|-----------|---------|--------------|------------|---------------|
| **Linearizable** | All ops appear in single global order | Highest | Lowest | Simplest mental model | Spanner, etcd, Zookeeper |
| **Sequential** | All nodes see same order (but not real-time) | High | Low | Moderate | ZooKeeper (per-client) |
| **Causal** | Causally related ops ordered; concurrent ops flexible | Moderate | Moderate | High implementation | MongoDB (causal sessions), COPS |
| **Read-your-writes** | Client sees own writes | Low-Moderate | High | Moderate | DynamoDB (with session tokens) |
| **Eventual** | All replicas converge eventually | Lowest | Highest | Complex (conflict resolution) | Cassandra, DNS, S3 |

---

