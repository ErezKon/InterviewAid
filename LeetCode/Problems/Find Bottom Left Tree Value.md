# 513. Find Bottom Left Tree Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-bottom-left-tree-value](https://leetcode.com/problems/find-bottom-left-tree-value)
**Companies:** Amazon, Bloomberg, Google, Gopuff, Josh Technology, Meta, Microsoft

---

## Problem Description

Return the leftmost value in the last (deepest) row of a binary tree.

---

## Approach: BFS Level Order — O(n) ✅

```
FUNCTION findBottomLeftValue(root):
    queue = [root]
    result = root.val
    WHILE queue:
        result = queue[0].val
        nextLevel = []
        FOR node IN queue:
            IF node.left: nextLevel.ADD(node.left)
            IF node.right: nextLevel.ADD(node.right)
        queue = nextLevel
    RETURN result
```

---

## Key Takeaway

> **BFS level-by-level: the first node of each level overwrites `result`. After BFS completes, `result` holds the leftmost value of the deepest level.**
