# 3515. Shortest Path in a Weighted Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-path-in-a-weighted-tree](https://leetcode.com/problems/shortest-path-in-a-weighted-tree)
**Companies:** Juspay

---

## Problem Description

Given a weighted tree, answer queries that update edge weights and ask for shortest path between two nodes.

---

## Approach: Euler Tour + BIT/Segment Tree

```
// Preprocess tree with Euler tour for LCA
// Distance(u, v) = dist[u] + dist[v] - 2*dist[LCA(u,v)]
// Edge weight updates: recompute affected subtree distances
// Use Binary Indexed Tree or Segment Tree for efficient updates
```

| Time | Space |
|------|-------|
| O(n + q·log n) per query | O(n) |

---

## Key Takeaway

> Tree path queries with updates combine **LCA** (for path decomposition) with a **data structure** (BIT/segment tree on Euler tour) for efficient distance maintenance.
