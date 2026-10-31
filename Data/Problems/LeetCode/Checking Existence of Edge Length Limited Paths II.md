# 1724. Checking Existence of Edge Length Limited Paths II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths-ii](https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths-ii)
**Companies:** Google, Oscar Health

---

## 1. Problem Description

An undirected graph of `n` nodes is defined by `edgeList`, where `edgeList[i] = [u_i, v_i, dis_i]` denotes an edge between nodes `u_i` and `v_i` with distance `dis_i`. Note that there may be **multiple** edges between two nodes, and the graph may not be connected.

Implement the `DistanceLimitedPathsExist` class:

- `DistanceLimitedPathsExist(int n, int[][] edgeList)` Initializes the class with an undirected graph.
- `boolean query(int p, int q, int limit)` Returns `true` if there exists a path from `p` to `q` such that each edge on the path has a distance **strictly less than** `limit`, and otherwise `false`.

**Constraints:**
- `2 <= n <= 10^4`
- `0 <= edgeList.length <= 10^4`
- `edgeList[i].length == 3`
- `0 <= u_i, v_i, p, q <= n - 1`
- `u_i != v_i`
- `p != q`
- `1 <= dis_i, limit <= 10^9`
- At most `10^4` calls will be made to `query`.

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

```
Example 1:
  Input:
  ["DistanceLimitedPathsExist", "query", "query", "query", "query"]
  [[6, [[0, 2, 4], [0, 3, 2], [1, 2, 3], [2, 3, 1], [4, 5, 5]]], [2, 3, 2], [1, 3, 3], [2, 0, 3], [0, 5, 6]]
  Output:
  [null, true, false, true, false]
  Explanation:
  DistanceLimitedPathsExist distanceLimitedPathsExist = new DistanceLimitedPathsExist(6, [[0, 2, 4], [0, 3, 2], [1, 2, 3], [2, 3, 1], [4, 5, 5]]);
  distanceLimitedPathsExist.query(2, 3, 2); // return true. There is an edge from 2 to 3 of distance 1, which is less than 2.
  distanceLimitedPathsExist.query(1, 3, 3); // return false. There is no way to go from 1 to 3 with distances strictly less than 3.
  distanceLimitedPathsExist.query(2, 0, 3); // return true. There is a way to go from 2 to 0 with distance < 3: travel from 2 to 3 to 0.
  distanceLimitedPathsExist.query(0, 5, 6); // return false. There are no paths from 0 to 5.
```

---

## 5. Walkthrough

Consider the first example with limit = 5 for query (0,4).
| Step | Action | Result |
|------|--------|--------|
| 1 | Build reconstruction tree: internal nodes created for edges weight 2,4,6,8. | Tree root weight = 8.
| 2 | Find LCA of nodes 0 and 4 → internal node with weight = 8. | LCA weight 8.
| 3 | Since 8 ≥ limit 5, we cannot use that LCA directly. We instead look at the highest ancestor whose weight < limit, which is the node with weight = 4 (covers vertices 0-2). | Path exists using edges ≤4.
| 4 | Return true.

---

## 6. Complexity Analysis

- **Preprocessing:** O(n log n) to sort edges and build the reconstruction tree, plus O(n log n) for LCA binary lifting.
- **Per Query:** O(log n) to compute LCA and compare weight.
- **Space:** O(n) for the tree, union-find structure, and LCA tables.

---

## 7. Follow-Up Questions

- How would the solution change if queries were offline instead of online?
- Can we support edge deletions and still answer queries efficiently?
- What if the graph is not a tree but a general undirected graph?

---

## Key Takeaway

> Kruskal's reconstruction tree transforms edge-weight constraints into ancestor-weight checks, enabling fast online queries via LCA.
