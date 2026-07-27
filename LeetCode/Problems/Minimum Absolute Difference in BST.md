# 530. Minimum Absolute Difference in BST

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-difference-in-bst](https://leetcode.com/problems/minimum-absolute-difference-in-bst)
**Companies:** Amazon, Google, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given the root of a BST, return the minimum absolute difference between values of any two nodes.

---

## Key Insight

> BST **inorder traversal** yields sorted values. The minimum difference is always between consecutive values in sorted order.

---

## Approach: Inorder Traversal — O(n) ✅

```
FUNCTION getMinimumDifference(root):
    prev ← -INFINITY
    minDiff ← INFINITY

    FUNCTION inorder(node):
        IF node = NULL THEN RETURN
        inorder(node.left)
        minDiff ← MIN(minDiff, node.val - prev)
        prev ← node.val
        inorder(node.right)

    inorder(root)
    RETURN minDiff
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Inorder traversal | **O(n)** | **O(h)** stack depth |

---

## Key Takeaway

> **BST inorder = sorted order** — minimum difference must be between consecutive sorted values. Track `prev` during inorder to compute differences in a single pass.

---
