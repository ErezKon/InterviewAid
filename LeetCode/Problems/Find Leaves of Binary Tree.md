# 366. Find Leaves of Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-leaves-of-binary-tree](https://leetcode.com/problems/find-leaves-of-binary-tree)
**Companies:** Amazon, Flipkart, Google, Linkedin, Oracle, Salesforce

---

```
FUNCTION findLeaves(root):
    result = []

    FUNCTION getHeight(node):
        IF node == null: RETURN -1
        h = 1 + MAX(getHeight(node.left), getHeight(node.right))
        IF h >= len(result): result.ADD([])
        result[h].ADD(node.val)
        RETURN h

    getHeight(root)
    RETURN result
```

---

## Problem Description

Collect leaves of a binary tree repeatedly until empty. Return groups of node values per round.

---

## Key Takeaway

> **Node height = max distance to any leaf. Group by height: leaves (h=0), their parents (h=1), etc. Single DFS computes heights and groups simultaneously.**
