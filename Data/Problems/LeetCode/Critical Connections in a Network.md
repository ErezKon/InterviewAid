# 1192. Critical Connections in a Network

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/critical-connections-in-a-network](https://leetcode.com/problems/critical-connections-in-a-network)
**Companies:** Akuna Capital, Amazon, Bloomberg, Flipkart, Google, Kla Tencor, Microsoft, Servicenow

---

## Problem Description

Find all **bridges** (critical connections) in an undirected graph — edges whose removal disconnects the graph.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 4`<br>`connections = [[0,1],[1,2],[2,0],[1,3]]` | `[[1,3]]` | Edge `[1,3]` is the only bridge; removing it separates node 3 from the rest.
| `n = 5`<br>`connections = [[0,1],[0,2],[1,2],[1,3],[3,4]]` | `[[1,3],[3,4]]` | Edges `[1,3]` and `[3,4]` are bridges; each removal increases the number of connected components.

---

## Approach: Tarjan's Algorithm — O(V+E) ✅

```text
FUNCTION criticalConnections(n, connections):
    graph ← adjacency list of size n
    disc ← array of size n filled with -1
    low  ← array of size n filled with 0
    timer ← 0
    bridges ← empty list

    FUNCTION dfs(u, parent):
        disc[u] ← low[u] ← timer
        timer ← timer + 1
        FOR v IN graph[u]:
            IF v = parent: CONTINUE
            IF disc[v] = -1:
                dfs(v, u)
                low[u] ← MIN(low[u], low[v])
                IF low[v] > disc[u]:
                    bridges.ADD([u, v])
            ELSE:
                low[u] ← MIN(low[u], disc[v])

    dfs(0, -1)
    RETURN bridges
```

---

## Walkthrough

**Example 1** – `n = 4`, `connections = [[0,1],[1,2],[2,0],[1,3]]`

| Step | Action | `disc` | `low` | Bridges |
|------|--------|--------|------|---------|
| 1 | Start DFS at node 0 | `[0,-1,-1,-1]` | `[0,0,0,0]` | – |
| 2 | Visit 1 from 0 | `[0,1,-1,-1]` | `[0,1,0,0]` | – |
| 3 | Visit 2 from 1 | `[0,1,2,-1]` | `[0,1,2,0]` | – |
| 4 | Edge 2‑0 is back edge → update `low[2]` to `0` | – | `low[2]=0` | – |
| 5 | Return to 1, `low[1]=MIN(1, low[2]=0)=0` | – | – | – |
| 6 | Explore edge 1‑3 (unvisited) | `disc[3]=3`, `low[3]=3` | – | – |
| 7 | Return to 1, `low[3]=3 > disc[1]=1` → bridge `[1,3]` added | – | – | `[[1,3]]` |
| 8 | Return to 0, `low[1]=0` → no bridge on edge 0‑1 |

The algorithm correctly identifies `[1,3]` as the only critical connection.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(V + E) |
| **Space** | O(V + E) |

---

## Follow-Up Questions

1. How would you modify the algorithm to list all articulation points (critical nodes) instead of bridges?
2. Can you adapt the solution to handle directed graphs where removal of an edge disconnects reachability?
3. How would you find bridges in a dynamic graph where edges are added or removed online?

---

## Key Takeaway

> **Tarjan's algorithm finds bridges in O(V+E): an edge (u,v) is a bridge iff `low[v] > disc[u]`. The `low` array tracks the earliest ancestor reachable via back edges from the subtree.**