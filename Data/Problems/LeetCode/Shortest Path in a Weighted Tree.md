# 3515. Shortest Path in a Weighted Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-path-in-a-weighted-tree](https://leetcode.com/problems/shortest-path-in-a-weighted-tree)
**Companies:** Juspay

---

## Problem Description

> *Note: the Approach/Walkthrough below handle arbitrary `u`–`v` distance queries (LCA); the official problem only asks for root-to-`x` distances, so the LCA part is unnecessary: Euler tour + Fenwick tree with range add (edge update adds `w' − w` to the deeper endpoint's subtree range) and point query. O((n + q) log n).*

You are given an integer `n` and an undirected, weighted tree rooted at node 1 with `n` nodes numbered from 1 to `n`. This is represented by a 2D array `edges` of length `n - 1`, where `edges[i] = [u_i, v_i, w_i]` indicates an undirected edge from node `u_i` to `v_i` with weight `w_i`.

You are also given a 2D integer array `queries` of length `q`, where each `queries[i]` is either:

- `[1, u, v, w']` – **Update** the weight of the edge between nodes `u` and `v` to `w'`, where `(u, v)` is guaranteed to be an edge present in `edges`.
- `[2, x]` – **Compute** the **shortest** path distance from the root node 1 to node `x`.

Return an integer array `answer`, where `answer[i]` is the **shortest** path distance from node 1 to `x` for the `i`th query of `[2, x]`.

**Constraints:**
- `1 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i] == [u_i, v_i, w_i]`
- `1 <= u_i, v_i <= n`
- `1 <= w_i <= 10^4`
- The input is generated such that `edges` represents a valid tree.
- `1 <= queries.length == q <= 10^5`
- `queries[i].length == 2` or `4`
  - `queries[i] == [1, u, v, w']` or,
  - `queries[i] == [2, x]`
  - `1 <= u, v, x <= n`
  - `(u, v)` is always an edge from `edges`.
  - `1 <= w' <= 10^4`

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

**Example 1:**
```
Input: n = 2, edges = [[1,2,7]], queries = [[2,2],[1,1,2,4],[2,2]]
Output: [7,4]
Explanation:
- Query [2, 2]: The shortest path from root node 1 to node 2 is 7.
- Query [1, 1, 2, 4]: The weight of edge (1, 2) changes from 7 to 4.
- Query [2, 2]: The shortest path from root node 1 to node 2 is 4.
```

**Example 2:**
```
Input: n = 3, edges = [[1,2,2],[1,3,4]], queries = [[2,1],[2,3],[1,1,3,7],[2,2],[2,3]]
Output: [0,4,2,7]
Explanation:
- Query [2, 1]: The shortest path from root node 1 to node 1 is 0.
- Query [2, 3]: The shortest path from root node 1 to node 3 is 4.
- Query [1, 1, 3, 7]: The weight of edge (1, 3) changes from 4 to 7.
- Query [2, 2]: The shortest path from root node 1 to node 2 is 2.
- Query [2, 3]: The shortest path from root node 1 to node 3 is 7.
```

**Example 3:**
```
Input: n = 4, edges = [[1,2,2],[2,3,1],[3,4,5]], queries = [[2,4],[2,3],[1,2,3,3],[2,2],[2,3]]
Output: [8,3,2,5]
Explanation:
- Query [2, 4]: The shortest path from root node 1 to node 4 consists of edges (1, 2), (2, 3), and (3, 4) with weights 2 + 1 + 5 = 8.
- Query [2, 3]: The shortest path from root node 1 to node 3 consists of edges (1, 2) and (2, 3) with weights 2 + 1 = 3.
- Query [1, 2, 3, 3]: The weight of edge (2, 3) changes from 1 to 3.
- Query [2, 2]: The shortest path from root node 1 to node 2 is 2.
- Query [2, 3]: The shortest path from root node 1 to node 3 consists of edges (1, 2) and (2, 3) with updated weights 2 + 3 = 5.
```

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
