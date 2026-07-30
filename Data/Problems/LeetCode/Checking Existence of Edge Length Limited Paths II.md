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

```text
FUNCTION buildReconstructionTree(n, edges):
    SORT edges BY weight ASC
    uf = UnionFind(2*n)  // supports new internal nodes
    nodeWeight = ARRAY[2*n]  // weight for each node, leaf weight = -∞
    nextId = n
    FOR each (u, v, w) IN edges:
        ru = uf.find(u)
        rv = uf.find(v)
        IF ru != rv:
            newNode = nextId
            nextId += 1
            nodeWeight[newNode] ← w
            uf.union(ru, newNode)
            uf.union(rv, newNode)
    RETURN (root of tree, nodeWeight)

FUNCTION query(u, v, limit, lcaStructure, nodeWeight):
    lcaNode ← findLCA(u, v, lcaStructure)
    RETURN nodeWeight[lcaNode] < limit
```

| Time | Space |
|------|-------|
| O(n log n) preprocessing, O(log n) per query | O(n) |

---

## 4. Examples

**Example 1:**
```
Input: n = 5, edges = [[0,1,2],[1,2,4],[2,3,6],[3,4,8]], queries = [[0,4,5],[1,3,7]]
Output: [true,false]
Explanation: For limit 5, the path 0‑1‑2 uses edges 2 and 4 (<5) so true. For limit 7, edge 2‑3 weight 6 is okay but 3‑4 weight 8 exceeds limit, so 1 and 3 are not connected.
```

**Example 2:**
```
Input: n = 3, edges = [[0,1,1],[1,2,2]], queries = [[0,2,2]]
Output: [false]
Explanation: The only path 0‑1‑2 contains edge weight 2 which is not < limit 2.
```

---

## 5. Walkthrough

Consider the first example with limit = 5 for query (0,4).
| Step | Action | Result |
|------|--------|--------|
| 1 | Build reconstruction tree: internal nodes created for edges weight 2,4,6,8. | Tree root weight = 8.
| 2 | Find LCA of nodes 0 and 4 → internal node with weight = 8. | LCA weight 8.
| 3 | Since 8 ≥ limit 5, we cannot use that LCA directly. We instead look at the highest ancestor whose weight < limit, which is the node with weight = 4 (covers vertices 0‑2). | Path exists using edges ≤4.
| 4 | Return true.

---

## 6. Complexity Analysis

- **Preprocessing:** O(n log n) to sort edges and build the reconstruction tree, plus O(n log n) for LCA binary lifting.
- **Per Query:** O(log n) to compute LCA and compare weight.
- **Space:** O(n) for the tree, union‑find structure, and LCA tables.

---

## 7. Follow-Up Questions

- How would the solution change if queries were offline instead of online?
- Can we support edge deletions and still answer queries efficiently?
- What if the graph is not a tree but a general undirected graph?

---

## Key Takeaway

> Kruskal's reconstruction tree transforms edge‑weight constraints into ancestor‑weight checks, enabling fast online queries via LCA.
