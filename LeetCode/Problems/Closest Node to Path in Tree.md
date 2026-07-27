# 2277. Closest Node to Path in Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/closest-node-to-path-in-tree](https://leetcode.com/problems/closest-node-to-path-in-tree)
**Companies:** Google

---

## 1. Problem Description

Given a tree, for each query `(start, end, node)`, find the node on the path from `start` to `end` that is closest (minimum distance) to `node`.

---

## 2. Key Insight

> The path from `start` to `end` passes through `LCA(start, end)`. The closest node on a path to a given node is the LCA of the query node with the path endpoints (projected onto the path). Specifically, the answer is the node on the path closest to `node`, which is the node among `{LCA(start,node), LCA(end,node), LCA(start,end)}` that lies on the path and minimizes distance.

---

## 3. Approach: LCA + Distance — O((n + q) log n) ✅

```
FUNCTION closestNode(n, edges, queries):
    // Preprocess: build tree, compute LCA with binary lifting, depths
    
    FOR each query (start, end, node):
        // The closest point on path(start,end) to node is:
        // Consider candidates: LCA(start,node), LCA(end,node)
        // The one that is on the path and closest to node wins
        lca_se = LCA(start, end)
        lca_sn = LCA(start, node)
        lca_en = LCA(end, node)
        
        // The answer is the deepest among lca_sn, lca_en that is 
        // an ancestor of lca_se or on the path
        candidates = {lca_se, lca_sn, lca_en}
        answer = argmin over candidates on path of dist(candidate, node)
        result.ADD(answer)
```

| Time | Space |
|------|-------|
| O((n + q) log n) | O(n log n) |

---

## Key Takeaway

> The closest point on a tree path to an external node involves LCA computations. The answer is always one of the LCA values between the query node and the path endpoints.
