# 2876. Count Visited Nodes in a Directed Graph

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-visited-nodes-in-a-directed-graph](https://leetcode.com/problems/count-visited-nodes-in-a-directed-graph)
**Companies:** Bny Mellon

---

## Problem Description

There is a **directed** graph consisting of `n` nodes numbered from `0` to `n - 1` and `n` directed edges.

You are given a **0-indexed** array `edges` where `edges[i]` indicates that there is an edge from node `i` to node `edges[i]`.

Consider the following process on the graph:

- You start from a node `x` and keep visiting other nodes through edges until you reach a node that you have already visited before on this **same** process.

Return *an array* `answer` *where* `answer[i]` *is the number of **different** nodes that you will visit if you perform the process starting from node* `i`.

**Constraints:**
- `n == edges.length`
- `2 <= n <= 10^5`
- `0 <= edges[i] <= n - 1`
- `edges[i] != i`

---

## Examples

```
Example 1:
  Input: edges = [1,2,0,0]
  Output: [3,3,3,4]
  Explanation: We perform the process starting from each node in the following way:
  - Starting from node 0, we visit the nodes 0 -> 1 -> 2 -> 0. The number of different nodes we visit is 3.
  - Starting from node 1, we visit the nodes 1 -> 2 -> 0 -> 1. The number of different nodes we visit is 3.
  - Starting from node 2, we visit the nodes 2 -> 0 -> 1 -> 2. The number of different nodes we visit is 3.
  - Starting from node 3, we visit the nodes 3 -> 0 -> 1 -> 2 -> 0. The number of different nodes we visit is 4.
```

```
Example 2:
  Input: edges = [1,2,3,4,0]
  Output: [5,5,5,5,5]
  Explanation: Starting from any node we can visit every node in the graph in the process.
```

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
| 1 | 0 | Tail node, edge → 1 | will inherit result of node 1 + 1 |
| 2 | 1 | Tail node, edge → 2 | will inherit result of node 2 + 1 |
| 3 | 2 | Part of cycle (2-3-4) length 3 | result[2] ← 3 |
| 4 | 3 | Cycle node | result[3] ← 3 |
| 5 | 4 | Cycle node | result[4] ← 3 |
| 6 | Back-propagate | result[1] ← result[2] + 1 = 4 |
| 7 | Back-propagate | result[0] ← result[1] + 1 = 5 |

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
2. Can you compute the number of visited nodes for each node in a graph that contains self-loops and multiple components?

---

## Key Takeaway

> **Functional graphs = tails + cycles. Use topological sort to peel off tails, identify cycles, then propagate cycle length back along tails. Each node's answer = distance to cycle + cycle length.**