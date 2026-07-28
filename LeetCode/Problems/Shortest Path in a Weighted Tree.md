# 3515. Shortest Path in a Weighted Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-path-in-a-weighted-tree](https://leetcode.com/problems/shortest-path-in-a-weighted-tree)
**Companies:** Juspay

---

## Problem Description

Given a weighted tree with `n` nodes, support two types of operations: update the weight of an edge, and query the shortest distance between any two nodes. Each query should be answered efficiently.

---

## Approach: Euler Tour + BIT/Segment Tree

```text
// Preprocess tree with Euler tour to obtain entry/exit times for each node
// Compute depth‑wise prefix distances dist[u]
// LCA(u, v) via RMQ on Euler tour
// Distance(u, v) = dist[u] + dist[v] - 2 * dist[LCA(u, v)]
// For an edge weight update, adjust dist values of the subtree rooted at the deeper endpoint using a BIT or Segment Tree.
```

---

## Examples

| Operation | Explanation |
|-----------|-------------|
| `updateEdge(3, 5, 2)` | Change weight of edge (3,5) to 2; update subtree distances accordingly. |
| `query(1, 7)` | Returns shortest distance between node 1 and node 7 after any prior updates. |

---

## Walkthrough

1. **Euler Tour** – Perform a DFS to record the time each node is entered and exited; this linearises the tree.
2. **Prefix Distances** – While DFS, compute `dist[u]` as the sum of edge weights from the root to `u`.
3. **LCA via RMQ** – Store the depth sequence of the Euler tour; a Range Minimum Query (Sparse Table) yields the Lowest Common Ancestor in `O(1)`.
4. **Edge Update** – Identify the deeper endpoint of the updated edge; all nodes in its subtree have their `dist` shifted by the weight delta. Apply this delta with a BIT/Segment Tree over the Euler tour interval.
5. **Distance Query** – Retrieve `dist[u]` and `dist[v]` (including any pending BIT updates), compute `LCA(u,v)`, and apply the formula `dist[u] + dist[v] - 2*dist[LCA]`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| `O(log n)` per update/query (BIT/Segment Tree operations) | `O(n)` for Euler tour, depth array, and BIT/Segment Tree |

---

## Follow-Up Questions

* How would you handle edge deletions or insertions in the tree?
* Can you extend the solution to support path‑sum queries with arbitrary functions (e.g., max edge weight on the path)?
* What changes are needed if the tree is rooted dynamically for each query?

---

## Key Takeaway

> Combining **Euler tour** for LCA with a **BIT/Segment Tree** over the tour interval enables fast updates and queries on weighted‑tree distances.
