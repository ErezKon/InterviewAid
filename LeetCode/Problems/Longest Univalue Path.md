# 687. Longest Univalue Path

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-univalue-path](https://leetcode.com/problems/longest-univalue-path)
**Companies:** Amazon, Bloomberg, Google, Meta, Snowflake, Sprinklr, Zepto

---

## 1. Problem Description

Find the longest path in a binary tree where all nodes have the same value. Path length = number of edges.

---

## 2. Approach: DFS — O(n) ✅

Same pattern as Diameter of Binary Tree (#543) but only extend path if values match.

```
FUNCTION longestUnivaluePath(root):
    maxLen = 0
    FUNCTION dfs(node):
        IF node == null: RETURN 0
        left = dfs(node.left)
        right = dfs(node.right)
        leftPath = left + 1 IF node.left AND node.left.val == node.val ELSE 0
        rightPath = right + 1 IF node.right AND node.right.val == node.val ELSE 0
        maxLen = MAX(maxLen, leftPath + rightPath)
        RETURN MAX(leftPath, rightPath)
    dfs(root)
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(h) |

---

## 3. Key Takeaway

> At each node, extend left/right paths only if child value matches. Update global max with `leftPath + rightPath`. Return single longest arm upward.
