# 3650. Minimum Cost Path with Edge Reversals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-path-with-edge-reversals](https://leetcode.com/problems/minimum-cost-path-with-edge-reversals)
**Companies:** Amazon, Asana, Bloomberg, Google, Meta, Microsoft, Oracle, Palantir

---

## Key Insight

> Traversing an edge in its original direction costs 0; reversing it costs 1. This is a **0-1 weighted graph** — use 0-1 BFS (deque-based) instead of Dijkstra.

---

## Approach: 0-1 BFS — O(V + E) ✅

```
FUNCTION minCost(n, edges, source, target):
    // Build bidirectional graph: forward=0, reverse=1
    graph ← adjacency list with (neighbor, cost)

    dist ← ARRAY(n, INFINITY)
    dist[source] ← 0
    deque ← [(0, source)]

    WHILE deque NOT EMPTY DO
        (cost, node) ← deque.POPLEFT()
        IF cost > dist[node] THEN CONTINUE

        FOR (neighbor, edgeCost) IN graph[node] DO
            newCost ← cost + edgeCost
            IF newCost < dist[neighbor] THEN
                dist[neighbor] ← newCost
                IF edgeCost = 0 THEN
                    deque.PUSH_FRONT((newCost, neighbor))
                ELSE
                    deque.PUSH_BACK((newCost, neighbor))

    RETURN dist[target] IF dist[target] ≠ INFINITY ELSE -1
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| 0-1 BFS | **O(V + E)** | **O(V + E)** |

---

## Key Takeaway

> **0-1 BFS for binary-weight graphs** — push cost-0 edges to front, cost-1 edges to back of the deque. Linear time shortest path.

---
