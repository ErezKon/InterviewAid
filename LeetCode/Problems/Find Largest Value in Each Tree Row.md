# 515. Find Largest Value in Each Tree Row

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-largest-value-in-each-tree-row](https://leetcode.com/problems/find-largest-value-in-each-tree-row)
**Companies:** Amazon, Apple, Bloomberg, Google, Josh Technology, Linkedin, Meta, Microsoft

---

```
FUNCTION largestValues(root):
    IF root == null: RETURN []
    result = []
    queue = [root]
    WHILE queue:
        maxVal = -infinity
        nextLevel = []
        FOR node IN queue:
            maxVal = MAX(maxVal, node.val)
            IF node.left: nextLevel.ADD(node.left)
            IF node.right: nextLevel.ADD(node.right)
        result.ADD(maxVal)
        queue = nextLevel
    RETURN result
```

---

## Problem Description

Return the largest value in each row of a binary tree.

---

## Key Takeaway

> **BFS level-by-level, track max at each level. Standard level-order traversal with aggregation.**
