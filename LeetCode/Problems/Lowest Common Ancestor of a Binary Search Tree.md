# 235. Lowest Common Ancestor of a Binary Search Tree

**Difficulty:** 🟡 Medium
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree)
**Companies:** Amazon, Apple, Bloomberg, Capgemini, Google, Linkedin, Meta, Microsoft, Twitter, Yandex

---

## 1. Problem Description

Given a BST, find the lowest common ancestor (LCA) of two given nodes `p` and `q`.

---

## 2. Approach: BST Property — O(h) ✅

In a BST, if both p and q are smaller than root, LCA is in the left subtree. If both are larger, LCA is in the right subtree. Otherwise, root is the LCA.

```
FUNCTION lowestCommonAncestor(root, p, q):
    WHILE root:
        IF p.val < root.val AND q.val < root.val:
            root = root.left
        ELSE IF p.val > root.val AND q.val > root.val:
            root = root.right
        ELSE:
            RETURN root
```

| Time | Space |
|------|-------|
| O(h) | O(1) iterative |

---

## Follow-Up

### LCA in a Binary Tree (LeetCode #236)?

Without BST property, use recursion: if either subtree returns non-null, that's where p or q is found. If both return non-null, current node is the LCA.

---

## Key Takeaway

> Exploit BST ordering to navigate directly to the LCA. No need for the general tree recursive approach.
