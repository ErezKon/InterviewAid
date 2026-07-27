# 1302. Deepest Leaves Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/deepest-leaves-sum](https://leetcode.com/problems/deepest-leaves-sum)
**Companies:** Amazon, Google, Myntra, Tiktok

---

## Problem Description

Return the sum of values of the deepest leaves in a binary tree.

---

## Approach

```
FUNCTION deepestLeavesSum(root):
    queue = [root]
    WHILE queue:
        levelSum = SUM(node.val for node in queue)
        queue = [child for node in queue for child in [node.left, node.right] if child]
    RETURN levelSum
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) for BFS queue |

---

## Key Takeaway

> **BFS level-by-level: compute sum at each level, return the last one computed. The last level processed is automatically the deepest.**
