# 998. Maximum Binary Tree II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-binary-tree-ii](https://leetcode.com/problems/maximum-binary-tree-ii)
**Companies:** Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Rightmost Path Insertion — O(n)](#approach-rightmost-path-insertion--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a maximum binary tree (constructed from LC 654) and a new value `val` appended to the end of the original array, return the updated maximum binary tree.

---

## Key Insight

> Since `val` is appended to the right, it can only appear on the **rightmost path** of the tree. Walk down the right spine: if `val > node.val`, `val` becomes the new parent and the old subtree becomes the left child. Otherwise, continue right.

---

## Approach: Rightmost Path Insertion — O(n) ✅

```
FUNCTION insertIntoMaxTree(root, val):
    IF NOT root OR val > root.val:
        node = TreeNode(val)
        node.left = root
        RETURN node
    root.right = insertIntoMaxTree(root.right, val)
    RETURN root
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Right spine traversal | **O(h)** worst O(n) | O(h) |

---

## Key Takeaway

> **Appending to a maximum binary tree only affects the rightmost path.** Walk down the right spine and insert where val fits.
