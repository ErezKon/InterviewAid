# MST Patterns (Kruskal & Prim)

Related: #1135 Connecting Cities, #1584 Min Cost to Connect All Points

---

## Table of Contents

1. [Overview](#1-overview)
2. [Kruskal's Algorithm — O(E log E)](#2-kruskals-algorithm--oe-log-e)
3. [Prim's Algorithm — O(E log V)](#3-prims-algorithm--oe-log-v)
4. [When to Use Which](#4-when-to-use-which)
5. [Related Problems](#5-related-problems)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Overview

A **Minimum Spanning Tree** connects all `n` nodes with `n-1` edges of minimum total weight. Two classic algorithms exist — Kruskal's (edge-centric) and Prim's (vertex-centric).

---

## 2. Kruskal's Algorithm — O(E log E) ✅

Sort all edges by weight, add them greedily if they don't create a cycle (Union-Find check).

```
FUNCTION kruskal(n, edges):
    SORT edges by weight
    uf = UnionFind(n)
    cost = 0, edgeCount = 0

    FOR (w, u, v) IN edges:
        IF uf.find(u) != uf.find(v):
            uf.union(u, v)
            cost += w
            edgeCount += 1
            IF edgeCount == n - 1: BREAK

    RETURN cost IF edgeCount == n - 1 ELSE -1
```

---

## 3. Prim's Algorithm — O(E log V) ✅

Grow the MST from a starting node, always adding the cheapest edge to an unvisited node.

```
FUNCTION prim(n, adj):
    visited = set()
    heap = [(0, 0)]    // (weight, node)
    cost = 0

    WHILE heap AND len(visited) < n:
        (w, u) = heap.POP_MIN()
        IF u IN visited: CONTINUE
        visited.ADD(u)
        cost += w
        FOR (v, wt) IN adj[u]:
            IF v NOT IN visited:
                heap.PUSH((wt, v))

    RETURN cost
```

---

## 4. When to Use Which

| Criterion | Kruskal | Prim |
|-----------|---------|------|
| **Graph type** | Sparse (E ≈ V) | Dense (E ≈ V²) |
| **Data structure** | Edge list + Union-Find | Adjacency list + Min-Heap |
| **Best when** | Edges given as list | Graph given as adjacency |
| **Complexity** | O(E log E) | O(E log V) |

For **dense graphs** (e.g., #1584 all-pairs distances), Prim avoids sorting O(V²) edges.

---

## 5. Related Problems

| Problem | MST Variant |
|---------|-------------|
| **#1135** Connecting Cities With Min Cost | Direct MST |
| **#1584** Min Cost to Connect All Points | Dense graph → Prim preferred |
| **#1168** Optimize Water Distribution | Virtual node + MST |
| **#1489** Find Critical and Pseudo-Critical Edges | MST edge classification |
| **#1631** Path With Minimum Effort | Modified MST / binary search + BFS |

---

## 6. Key Takeaway

> **Kruskal = sort edges + union-find; Prim = grow from source + min-heap.** Both find the same MST. Choose based on graph density and input format.
