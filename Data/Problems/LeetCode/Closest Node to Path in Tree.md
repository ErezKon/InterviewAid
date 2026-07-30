# 2277. Closest Node to Path in Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/closest-node-to-path-in-tree](https://leetcode.com/problems/closest-node-to-path-in-tree)
**Companies:** Google

---

## 1. Problem Description

Given a tree, for each query `(start, end, node)`, find the node on the path from `start` to `end` that is closest (minimum distance) to `node`.

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
Input: n = 7, edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], queries = [[3,5,4]]
Output: [1]
Explanation: Path from 3 to 5 is 3‑1‑0‑2‑5. Node 4 is closest to node 1 on this path.
```

**Example 2:**
```
Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]], queries = [[0,4,2]]
Output: [2]
Explanation: The path 0‑1‑2‑3‑4 contains node 2, which is distance 0 from the query node.
```

---

## 5. Walkthrough

| Step | Action | Details |
|------|--------|---------|
| 1 | Build tree | Convert edge list to adjacency list and run DFS to compute depth of each node. |
| 2 | Preprocess LCA | Use binary lifting to fill `up[node][k]` for ancestors at 2^k distance. |
| 3 | Process query `(3,5,4)` | Compute `lca_se = LCA(3,5) = 0`, `lca_sn = LCA(3,4) = 1`, `lca_en = LCA(5,4) = 0`. |
| 4 | Filter candidates | `{0,1}` lie on path 3‑5; distances to node 4 are `dist(0,4)=2`, `dist(1,4)=1`. |
| 5 | Choose answer | Node `1` has minimum distance, so output `1`. |

---

## 6. Complexity Analysis

- **Time:** Preprocessing O(n log n). Each query O(log n) for LCA computations and constant‑time distance checks.
- **Space:** O(n log n) for ancestor tables and O(n) for adjacency list.

---

## Key Takeaway

> The closest point on a tree path to an external node involves LCA computations. The answer is always one of the LCA values between the query node and the path endpoints.
