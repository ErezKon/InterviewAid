# 1325. Delete Leaves With a Given Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-leaves-with-a-given-value](https://leetcode.com/problems/delete-leaves-with-a-given-value)
**Companies:** Amazon, Google, Josh Technology, Microsoft

---

## Problem Description

Recursively remove leaf nodes with a given `target` value. After removal, new leaves may also match and should be removed.

---

## Approach

```
FUNCTION removeLeafNodes(root, target):
    IF NOT root: RETURN null
    root.left = removeLeafNodes(root.left, target)
    root.right = removeLeafNodes(root.right, target)
    IF NOT root.left AND NOT root.right AND root.val == target: RETURN null
    RETURN root
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(h) recursion stack |

---

## Key Takeaway

> **Post-order traversal naturally handles cascading leaf deletion: process children first, then check if the current node became a target leaf. Elegantly handles multi-level removal.**
