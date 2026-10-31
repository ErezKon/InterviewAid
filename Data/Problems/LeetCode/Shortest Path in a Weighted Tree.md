# 3515. Shortest Path in a Weighted Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-path-in-a-weighted-tree](https://leetcode.com/problems/shortest-path-in-a-weighted-tree)
**Companies:** Juspay

---

## Problem Description

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

## Approach: Euler Tour + BIT (Range Add, Point Query)

Since every query asks for the distance from the **root** to `x`, no LCA is needed. Let `dist[x]` be the root-to-`x` path weight. Changing the weight of edge `(p, c)` (where `p` is the parent of `c`) by `delta = w' − w` changes `dist` of **every node in the subtree of `c`** by `delta`, and nothing else.

1. Run an iterative DFS from node 1 to get `parent[]`, entry time `tin[]` and exit time `tout[]`; the subtree of `c` is the contiguous range `[tin[c], tout[c]]`.
2. Use a Fenwick tree over a difference array: "add `d` to range `[l, r]`" = `add(l, d)`, `add(r+1, −d)`; the point value at position `i` is `prefixSum(i)`.
3. Initialise by range-adding each edge weight `w(parent[v], v)` to the subtree range of `v`. Then `dist[x] = prefixSum(tin[x])`.
4. Update `[1, u, v, w']`: let `c` be the child endpoint (`c = v` if `parent[v] = u`, else `u`), apply `delta = w' − current weight` to `[tin[c], tout[c]]`, store the new weight.
5. Query `[2, x]`: append `prefixSum(tin[x])`.

```text
FUNCTION treeQueries(n, edges, queries):
    build adjacency list; weight[{u,v}] ← w for every edge
    // iterative DFS from root 1
    timer ← 0
    DFS(1): tin[u] ← ++timer; set parent[child] ← u; after children tout[u] ← timer
    BIT ← Fenwick tree of size n + 1
    FUNCTION rangeAdd(l, r, d):
        BIT.add(l, d); BIT.add(r + 1, -d)
    FOR v ← 2 TO n:
        rangeAdd(tin[v], tout[v], weight[{parent[v], v}])
    answer ← []
    FOR each query IN queries:
        IF query[0] = 1:
            (u, v, w') ← query[1..3]
            c ← v IF parent[v] = u ELSE u          // deeper endpoint
            delta ← w' - weight[{u, v}]
            weight[{u, v}] ← w'
            rangeAdd(tin[c], tout[c], delta)
        ELSE:
            x ← query[1]
            APPEND BIT.prefixSum(tin[x]) TO answer  // current dist[x]
    RETURN answer
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

**Example 3:** `n = 4`, `edges = [[1,2,2],[2,3,1],[3,4,5]]` (a chain 1–2–3–4).

1. **DFS** – `tin = {1:1, 2:2, 3:3, 4:4}`, `tout = {1:4, 2:4, 3:4, 4:4}`; parents: 2→1, 3→2, 4→3.
2. **Initialise BIT** – range-add 2 on `[2,4]` (edge 1–2), 1 on `[3,4]` (edge 2–3), 5 on `[4,4]` (edge 3–4). Point values: pos1 = 0, pos2 = 2, pos3 = 3, pos4 = 8.

| Query | Action | Result |
|-------|--------|--------|
| [2,4] | prefixSum(tin[4] = 4) = 2 + 1 + 5 | **8** |
| [2,3] | prefixSum(3) = 2 + 1 | **3** |
| [1,2,3,3] | child c = 3, delta = 3 − 1 = +2, range-add +2 on `[3,4]` | — |
| [2,2] | prefixSum(2) = 2 | **2** |
| [2,3] | prefixSum(3) = 2 + 1 + 2 | **5** |

Output: `[8,3,2,5]` — matches the expected output.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| `O(n log n)` to build, `O(log n)` per update/query → `O((n + q) log n)` total | `O(n)` for adjacency list, `tin`/`tout`/`parent`, edge weights and the BIT |

---

## Follow-Up Questions

* How would you answer arbitrary `u`–`v` distance queries? (Add LCA via binary lifting or Euler-tour RMQ: `dist[u] + dist[v] − 2·dist[LCA(u, v)]`, with each `dist` read from the BIT.)
* How would you support "maximum edge weight on the root-to-`x` path" with updates? (Point updates on edges plus heavy-light decomposition with a segment tree.)
* What if the root changes between queries? (Root-to-`x` distance becomes a general `u`–`x` distance query, so use the LCA formula above.)

---

## Key Takeaway

> An edge-weight change shifts the root distance of exactly one subtree; flattening the tree with an Euler tour turns that into a range add, and a Fenwick tree over a difference array answers each root-distance query with a prefix sum in `O(log n)`.
