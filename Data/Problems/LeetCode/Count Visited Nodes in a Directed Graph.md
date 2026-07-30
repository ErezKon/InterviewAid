# 2876. Count Visited Nodes in a Directed Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-visited-nodes-in-a-directed-graph](https://leetcode.com/problems/count-visited-nodes-in-a-directed-graph)
**Companies:** Bny Mellon

---

## Problem Description

In a functional graph (each node has exactly one outgoing edge), for each node determine how many **distinct** nodes are visited starting from it (following edges until revisiting a node).

---

## Examples

**Example 1:**
```
edges = [2,0,1]
```
The graph forms a cycle 0 → 2 → 1 → 0. Starting from any node, we visit all three nodes, so the answer is `[3,3,3]`.

**Example 2:**
```
edges = [1,2,3,4,2]
```
Nodes 0→1→2→3→4→2 create a tail (0,1) leading into a cycle (2,3,4). The answers are `[5,5,3,3,3]` because tail nodes visit the three‑node cycle plus the nodes on the tail.

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

## Walkthrough

| Step | Node | Action | Result for node |
|------|------|--------|-----------------|
| 1 | 0 | Tail node, edge → 1 | will inherit result of node 1 + 1 |
| 2 | 1 | Tail node, edge → 2 | will inherit result of node 2 + 1 |
| 3 | 2 | Part of cycle (2‑3‑4) length 3 | result[2] ← 3 |
| 4 | 3 | Cycle node | result[3] ← 3 |
| 5 | 4 | Cycle node | result[4] ← 3 |
| 6 | Back‑propagate | result[1] ← result[2] + 1 = 4 |
| 7 | Back‑propagate | result[0] ← result[1] + 1 = 5 |

Thus the final array is `[5,4,3,3,3]`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Follow-Up Questions

1. How would you modify the algorithm if each node could have multiple outgoing edges? (Leads to general directed graphs and requires DFS/BFS.)
2. Can you compute the number of visited nodes for each node in a graph that contains self‑loops and multiple components?

---

## Key Takeaway

> **Functional graphs = tails + cycles. Use topological sort to peel off tails, identify cycles, then propagate cycle length back along tails. Each node's answer = distance to cycle + cycle length.**