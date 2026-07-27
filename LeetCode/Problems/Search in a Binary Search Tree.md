# 700. Search in a Binary Search Tree

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/search-in-a-binary-search-tree](https://leetcode.com/problems/search-in-a-binary-search-tree)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given the root of a BST and a target value, return the subtree rooted at the node with that value, or `null` if not found.

---

## Approach

```
FUNCTION searchBST(root, val):
    WHILE root AND root.val != val:
        root = root.left IF val < root.val ELSE root.right
    RETURN root
```

| Time | Space |
|------|-------|
| O(h) | O(1) |
