# 987. Vertical Order Traversal of a Binary Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree)
**Companies:** Amazon, Bitgo, Bloomberg, Deliveroo, Doordash, Google, Meta, Microsoft, Oracle, Roku, Salesforce, Samsung, Tiktok, Uber

---

## Approach: DFS + Sort — O(n log n) ✅

```
FUNCTION verticalTraversal(root):
    nodes = []    // (col, row, val)
    dfs(root, 0, 0, nodes)

    SORT nodes by (col, row, val)

    result = []
    prevCol = -infinity
    FOR (col, row, val) IN nodes:
        IF col != prevCol:
            result.ADD([])
            prevCol = col
        result.LAST().ADD(val)

    RETURN result
```

Sort by column, then row, then value. Group by column.
