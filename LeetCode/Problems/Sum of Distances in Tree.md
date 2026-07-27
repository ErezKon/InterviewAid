# 834. Sum of Distances in Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-distances-in-tree](https://leetcode.com/problems/sum-of-distances-in-tree)
**Companies:** Amazon, Google, Meta, Microsoft, Phonepe

---

## Approach: Two DFS (Rerooting) — O(n) ✅

```
FUNCTION sumOfDistancesInTree(n, edges):
    graph = adjacency list
    count = [1] * n    // subtree size
    result = [0] * n

    // DFS 1: compute count[] and result[0]
    FUNCTION dfs1(node, parent):
        FOR child IN graph[node]:
            IF child == parent: CONTINUE
            dfs1(child, node)
            count[node] += count[child]
            result[0] += count[child]

    // DFS 2: reroot
    FUNCTION dfs2(node, parent):
        FOR child IN graph[node]:
            IF child == parent: CONTINUE
            result[child] = result[node] - count[child] + (n - count[child])
            dfs2(child, node)

    dfs1(0, -1)
    dfs2(0, -1)
    RETURN result
```

Moving root from parent to child: count[child] nodes get 1 closer, n-count[child] get 1 farther.
