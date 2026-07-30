# 2608. Shortest Cycle in a Graph

**Difficulty:** 🔴 Hard

**Companies:** Meta, Phonepe, Zomato
---

## Problem Description

Given an undirected graph with `n` nodes and `edges`, find the length of the **shortest cycle**. Return `-1` if no cycle exists.

---

## Approach: BFS from each node — O(V · (V+E))

```text
FUNCTION findShortestCycle(n, edges):
    // Build adjacency list
    graph ← adjacency list of size n
    minCycle ← infinity
    FOR src ← 0 TO n - 1:
        dist ← array of size n filled with -1
        parent ← array of size n filled with -1
        queue ← empty queue
        ENQUEUE(queue, src)
        dist[src] ← 0
        WHILE queue IS NOT EMPTY:
            u ← DEQUEUE(queue)
            FOR v IN graph[u]:
                IF dist[v] = -1:
                    dist[v] ← dist[u] + 1
                    parent[v] ← u
                    ENQUEUE(queue, v)
                ELSE IF parent[u] ≠ v: // found a cycle
                    cycleLen ← dist[u] + dist[v] + 1
                    minCycle ← MIN(minCycle, cycleLen)
    RETURN minCycle IF minCycle < infinity ELSE -1
```

---

## Examples

**Example 1:**
```
Input: n = 7, edges = [[0,1],[1,2],[2,0],[3,4],[4,5],[5,3]]
Output: 3
Explanation: The triangle formed by nodes 0‑1‑2 is the shortest cycle.
```

**Example 2:**
```
Input: n = 4, edges = [[0,1],[2,3]]
Output: -1
Explanation: The graph consists of two disconnected edges, no cycles exist.
```

---

## Walkthrough

Consider the first example with a triangle 0‑1‑2.

| Step | Action | Queue | dist | parent | minCycle |
|------|--------|-------|------|--------|----------|
| 1 | Start BFS from src=0 | [0] | [0,-1,-1,...] | [-1,-1,-1,...] | ∞ |
| 2 | Dequeue 0, visit 1 and 2 | [1,2] | [0,1,1,...] | [-1,0,0,...] | ∞ |
| 3 | Dequeue 1, neighbor 0 already visited (parent) – ignore; neighbor 2 visited and not parent → cycle length = dist[1]+dist[2]+1 = 1+1+1 = 3 → minCycle=3 |
| … | Remaining BFS steps do not find a shorter cycle. |

The algorithm discovers the triangle length 3, which is the answer.

---

## Complexity Analysis

- **Time:** For each source node we perform a BFS, costing O(V+E). Repeating for all V nodes yields O(V·(V+E)).
- **Space:** The adjacency list, distance, parent arrays, and BFS queue require O(V+E) space.

---

## Key Takeaway

> BFS from every node detects the shortest cycle passing through that node. When BFS finds an already‑visited non‑parent neighbor, the cycle length is `dist[u] + dist[v] + 1`.
