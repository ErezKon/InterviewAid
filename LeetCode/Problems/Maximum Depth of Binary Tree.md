# 104. Maximum Depth of Binary Tree

**Difficulty:** 🟢 Easy
**Acceptance:** 76.0%
**LeetCode:** [https://leetcode.com/problems/maximum-depth-of-binary-tree](https://leetcode.com/problems/maximum-depth-of-binary-tree)
**Companies:** Accenture, Amazon, Apple, Arista Networks, Avito, Bloomberg, Google, Infosys, Linkedin, Meta, Microsoft, Oracle, Qualcomm, Spotify, Uber, Yahoo

---

## 1. Problem Description

Given the root of a binary tree, return its maximum depth (longest path from root to leaf).

---

## 2. Approach: Recursion — O(n) ✅

```
FUNCTION maxDepth(root):
    IF root == null: RETURN 0
    RETURN 1 + MAX(maxDepth(root.left), maxDepth(root.right))
```

Iterative BFS: count levels.

| Time | Space |
|------|-------|
| O(n) | O(h) where h = height |

---

## Key Takeaway

> Depth = 1 + max(left depth, right depth). The simplest tree recursion problem — a building block for harder tree problems.
