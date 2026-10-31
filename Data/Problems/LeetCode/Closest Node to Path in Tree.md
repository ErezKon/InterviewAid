# 2277. Closest Node to Path in Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/closest-node-to-path-in-tree](https://leetcode.com/problems/closest-node-to-path-in-tree)
**Companies:** Google

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given a positive integer `n` representing the number of nodes in a tree, numbered from `0` to `n - 1` (**inclusive**). You are also given a 2D integer array `edges` of length `n - 1`, where `edges[i] = [node1_i, node2_i]` denotes that there is a **bidirectional** edge connecting `node1_i` and `node2_i` in the tree.

You are given a **0-indexed** integer array `query` of length `m` where `query[i] = [start_i, end_i, node_i]` means that for the `i^th` query, you are tasked with finding the node on the path from `start_i` to `end_i` that is **closest** to `node_i`.

Return *an integer array *`answer`* of length *`m`*, where *`answer[i]`* is the answer to the *`i^th`* query*.

**Constraints:**
- `1 <= n <= 1000`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= node1_i, node2_i <= n - 1`
- `node1_i != node2_i`
- `1 <= query.length <= 1000`
- `query[i].length == 3`
- `0 <= start_i, end_i, node_i <= n - 1`
- The graph is a tree.

---

## 2. Key Insight

> The path from `start` to `end` passes through `LCA(start, end)`. The closest node on a path to a given node is the LCA of the query node with the path endpoints (projected onto the path). Specifically, the answer is the node among `{LCA(start,node), LCA(end,node), LCA(start,end)}` that lies on the path and minimizes distance.

---

## 3. Approach: LCA + Distance — O((n + q) log n) ✅

```text
FUNCTION closestNode(n, edges, queries):
    // Build adjacency list from edges
    BUILD adjacency list
    // Preprocess LCA with binary lifting and depth array
    PREPROCESS LCA structures
    
    FOR each query (start, end, node):
        lca_se ← LCA(start, end)
        lca_sn ← LCA(start, node)
        lca_en ← LCA(end, node)
        
        candidates ← {lca_se, lca_sn, lca_en}
        answer ← NULL
        minDist ← INFINITY
        FOR each c IN candidates:
            IF c lies on path(start, end):
                d ← DISTANCE(c, node)
                IF d < minDist:
                    minDist ← d
                    answer ← c
        RESULT.ADD(answer)
    RETURN RESULT
```

| Time | Space |
|------|-------|
| O((n + q) log n) | O(n log n) |

---

## 4. Examples

**Example 1:**
```
Input: n = 7, edges = [[0,1],[0,2],[0,3],[1,4],[2,5],[2,6]], query = [[5,3,4],[5,3,6]]
Output: [0,2]
Explanation: The path from node 5 to node 3 consists of the nodes 5, 2, 0, and 3.
The distance between node 4 and node 0 is 2.
Node 0 is the node on the path closest to node 4, so the answer to the first query is 0.
The distance between node 6 and node 2 is 1.
Node 2 is the node on the path closest to node 6, so the answer to the second query is 2.
```

**Example 2:**
```
Input: n = 3, edges = [[0,1],[1,2]], query = [[0,1,2]]
Output: [1]
Explanation: The path from node 0 to node 1 consists of the nodes 0, 1.
The distance between node 2 and node 1 is 1.
Node 1 is the node on the path closest to node 2, so the answer to the first query is 1.
```

**Example 3:**
```
Input: n = 3, edges = [[0,1],[1,2]], query = [[0,0,0]]
Output: [0]
Explanation: The path from node 0 to node 0 consists of the node 0.
Since 0 is the only node on the path, the answer to the first query is 0.
```

---

## 5. Walkthrough

| Step | Action | Details |
|------|--------|---------|
| 1 | Build tree | Convert edge list to adjacency list and run DFS to compute depth of each node. |
| 2 | Preprocess LCA | Use binary lifting to fill `up[node][k]` for ancestors at 2^k distance. |
| 3 | Process query `(3,5,4)` | Compute `lca_se = LCA(3,5) = 0`, `lca_sn = LCA(3,4) = 1`, `lca_en = LCA(5,4) = 0`. |
| 4 | Filter candidates | `{0,1}` lie on path 3-5; distances to node 4 are `dist(0,4)=2`, `dist(1,4)=1`. |
| 5 | Choose answer | Node `1` has minimum distance, so output `1`. |

---

## 6. Complexity Analysis

- **Time:** Preprocessing O(n log n). Each query O(log n) for LCA computations and constant-time distance checks.
- **Space:** O(n log n) for ancestor tables and O(n) for adjacency list.

---

## Key Takeaway

> The closest point on a tree path to an external node involves LCA computations. The answer is always one of the LCA values between the query node and the path endpoints.
