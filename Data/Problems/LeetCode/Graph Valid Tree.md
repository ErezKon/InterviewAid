
# 261. Graph Valid Tree

**Difficulty:** 🟡 Medium
**Acceptance:** 51.5%
**LeetCode:** [https://leetcode.com/problems/graph-valid-tree](https://leetcode.com/problems/graph-valid-tree)
**Companies:** Amazon, Google, Linkedin, Meta, Microsoft, Snowflake, Tiktok, Uber, Zenefits

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight: Tree = Connected + No Cycles](#3-key-insight-tree--connected--no-cycles)
4. [Approach 1: BFS/DFS — O(V + E)](#4-approach-1-bfsdfs--ov--e)
5. [Approach 2: Union-Find — O(V + E · α) ✅](#5-approach-2-union-find--ov--e--α-)
6. [Walkthrough (Union-Find)](#6-walkthrough-union-find)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

Given `n` nodes labeled `0` to `n-1` and a list of undirected `edges`, determine if these edges form a **valid tree**.

---

## 2. Examples

```
Example 1:
  n = 5, edges = [[0,1], [0,2], [0,3], [1,4]]

    0 — 1 — 4
    |
    2
    |
    3

  Output: true (connected, no cycles)

Example 2:
  n = 5, edges = [[0,1], [1,2], [2,3], [1,3], [1,4]]
  Output: false (has cycle: 1-2-3-1)
```

---

## 3. Key Insight: Tree = Connected + No Cycles

A graph is a valid tree if and only if:
1. It has exactly `n - 1` edges.
2. It is **connected**.

**OR equivalently:**
1. It has exactly `n - 1` edges.
2. No cycle exists (can be checked via Union-Find).

The edge count check alone isn't sufficient — you need to verify connectivity or acyclicity as well.

---

## 4. Approach 1: BFS/DFS — O(V + E)

Build adjacency list, run BFS/DFS from node 0, check all nodes are visited.

```
FUNCTION validTree(n, edges):
    IF LENGTH(edges) != n - 1:
        RETURN FALSE                    // quick check

    // Build adjacency list
    adj = ARRAY of n empty lists
    FOR each [u, v] IN edges:
        adj[u].ADD(v)
        adj[v].ADD(u)

    // BFS from node 0
    visited = SET()
    queue = [0]
    visited.ADD(0)

    WHILE queue IS NOT EMPTY:
        node = queue.DEQUEUE()
        FOR each neighbor IN adj[node]:
            IF neighbor NOT IN visited:
                visited.ADD(neighbor)
                queue.ENQUEUE(neighbor)

    RETURN SIZE(visited) == n           // all nodes reachable?
```

---

## 5. Approach 2: Union-Find — O(V + E · α) ✅

Process each edge. If two nodes are already in the same component, adding an edge creates a cycle.

```
CLASS UnionFind:
    INITIALIZE(n):
        parent = [0, 1, 2, ..., n-1]
        rank   = [0, 0, ..., 0]

    FIND(x):
        IF parent[x] != x:
            parent[x] = FIND(parent[x])     // path compression
        RETURN parent[x]

    UNION(x, y):
        rootX = FIND(x)
        rootY = FIND(y)

        IF rootX == rootY:
            RETURN FALSE                    // already connected → cycle

        // Union by rank
        IF rank[rootX] < rank[rootY]:
            parent[rootX] = rootY
        ELSE IF rank[rootX] > rank[rootY]:
            parent[rootY] = rootX
        ELSE:
            parent[rootY] = rootX
            rank[rootX] += 1

        RETURN TRUE


FUNCTION validTree(n, edges):
    IF LENGTH(edges) != n - 1:
        RETURN FALSE

    uf = new UnionFind(n)

    FOR each [u, v] IN edges:
        IF NOT uf.UNION(u, v):
            RETURN FALSE                // cycle detected

    RETURN TRUE
```

---

## 6. Walkthrough (Union-Find)

```
n = 5, edges = [[0,1], [0,2], [0,3], [1,4]]

Edge count = 4 = n - 1 ✓

Process [0,1]: find(0)=0, find(1)=1 → different → union → OK
Process [0,2]: find(0)=0, find(2)=2 → different → union → OK
Process [0,3]: find(0)=0, find(3)=3 → different → union → OK
Process [1,4]: find(1)=0, find(4)=4 → different → union → OK

No cycles detected → RETURN TRUE ✅
```

```
n = 5, edges = [[0,1], [1,2], [2,3], [1,3], [1,4]]

Edge count = 5 ≠ n - 1 = 4 → RETURN FALSE ✅
```

---

## 7. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| BFS/DFS | O(V + E) | O(V + E) |
| **Union-Find** | **O(V + E · α(V))** | **O(V)** |

α is the inverse Ackermann function — practically O(1).

---

## 8. Follow-Up Questions

### 8.1 Number of Connected Components (LeetCode #323)

Count distinct roots in Union-Find after processing all edges:

```
FUNCTION countComponents(n, edges):
    uf = new UnionFind(n)
    components = n

    FOR each [u, v] IN edges:
        IF uf.UNION(u, v):
            components -= 1

    RETURN components
```

### 8.2 Redundant Connection (LeetCode #684)

Find the edge that creates a cycle. The first edge where `union` returns false (both already connected) is the answer.

### 8.3 Is the graph a forest (collection of trees)?

Same as valid tree but without the connectivity requirement. Check: `edges == n - components` and no cycles.

### 8.4 Minimum Spanning Tree

For weighted graphs, use **Kruskal's** (sort edges + Union-Find) or **Prim's** (min-heap + BFS).

---

## Union-Find Problem Family

| Problem | What to detect | Technique |
|---------|---------------|-----------|
| **Valid Tree** (#261) | Connected + acyclic | UF + edge count |
| **Components** (#323) | Count components | UF + counter |
| **Redundant Connection** (#684) | Cycle edge | UF, first failed union |
| **Number of Islands II** (#305) | Dynamic connectivity | UF + neighbor checks |
| **Accounts Merge** (#721) | Group by equivalence | UF + string mapping |

---

## Key Takeaway

> Union-Find is the perfect tool for **dynamic connectivity** problems. The two optimizations — **path compression** and **union by rank** — make it nearly O(1) per operation. For tree validation, the elegant check is: exactly `n-1` edges + no cycles (or equivalently, connected).
