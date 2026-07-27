# 1650. Lowest Common Ancestor of a Binary Tree III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii)
**Companies:** Amazon, Apple, Atlassian, Google, Linkedin, Meta, Microsoft, Mongodb, Wix, Yandex

---

## 1. Problem Description

Find LCA of two nodes in a binary tree where each node has a parent pointer.

---

## 2. Approach: Two Pointers (like Linked List Intersection) — O(h) ✅

Same technique as Intersection of Two Linked Lists (#160).

```
FUNCTION lowestCommonAncestor(p, q):
    a, b = p, q
    WHILE a != b:
        a = a.parent IF a ELSE q
        b = b.parent IF b ELSE p
    RETURN a
```

| Time | Space |
|------|-------|
| O(h) | O(1) |

---

## 3. Key Takeaway

> With parent pointers, paths to root form two "linked lists". Use the intersection technique: when one reaches null, redirect to the other's start. They meet at LCA.
