# 1724. Checking Existence of Edge Length Limited Paths II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths-ii](https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths-ii)
**Companies:** Google, Oscar Health

---

## 1. Problem Description

**Online version** of Edge Length Limited Paths. Given a weighted tree and online queries `[u, v, limit]`, determine if there's a path from `u` to `v` using only edges with weight < `limit`.

---

## 2. Key Insight

> Build a **Kruskal's reconstruction tree** (binary tree where internal nodes represent edge weights). For query (u, v, limit), find the LCA in this tree — if its weight < limit, u and v are connected by edges all < limit.

---

## 3. Approach: MST Reconstruction Tree + LCA — O(n log n + Q log n) ✅

```
FUNCTION DistanceLimitedPathsExist(n, edges):
    // Build MST via Kruskal (the tree IS the graph since it's already a tree)
    // Build reconstruction tree: sort edges by weight, union nodes
    // Each union creates a new parent node with weight = edge weight
    // For query(u,v,limit): find LCA, check if LCA.weight < limit
    
FUNCTION query(u, v, limit):
    lca = findLCA(u, v) in reconstruction tree
    RETURN lca.weight < limit
```

| Time | Space |
|------|-------|
| O(n log n) preprocessing, O(log n) per query | O(n) |

---

## Key Takeaway

> Kruskal's reconstruction tree enables online edge-limited path queries via LCA. The max edge weight on the path between two nodes equals their LCA's weight in the reconstruction tree.
