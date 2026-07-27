# 2876. Count Visited Nodes in a Directed Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-visited-nodes-in-a-directed-graph](https://leetcode.com/problems/count-visited-nodes-in-a-directed-graph)
**Companies:** Bny Mellon

---

## Problem Description

In a functional graph (each node has exactly one outgoing edge), for each node determine how many **distinct** nodes are visited starting from it (following edges until revisiting a node).

---

## Key Insight

A functional graph decomposes into **rho-shaped** components: tails leading into cycles. Nodes on a cycle visit exactly `cycle_length` nodes. Tail nodes visit `distance_to_cycle + cycle_length` nodes. Find cycles first, then process tails via reverse topological order.

---

## Approach

```
FUNCTION countVisitedNodes(edges):
    n = LENGTH(edges)
    result = [0] * n

    // Find cycles using in-degree + topological sort (Kahn's)
    inDeg = compute in-degrees
    queue = [nodes with inDeg == 0]
    visited = [False] * n

    // Remove tails (non-cycle nodes)
    WHILE queue NOT EMPTY:
        u = queue.pop()
        visited[u] = True
        v = edges[u]
        inDeg[v] -= 1
        IF inDeg[v] == 0: queue.ADD(v)

    // Remaining unvisited nodes are on cycles
    FOR each unvisited node, trace cycle, set result = cycle_length

    // Process tails in reverse (from cycle outward)
    // For each tail node: result[u] = result[edges[u]] + 1
    // Process in reverse topological order
    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Key Takeaway

> **Functional graphs = tails + cycles. Use topological sort to peel off tails, identify cycles, then propagate cycle length back along tails. Each node's answer = distance to cycle + cycle length.**
