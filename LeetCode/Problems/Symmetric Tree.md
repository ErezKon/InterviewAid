# 101. Symmetric Tree

**Difficulty:** 🟢 Easy
**Acceptance:** 57.0%
**LeetCode:** [https://leetcode.com/problems/symmetric-tree](https://leetcode.com/problems/symmetric-tree)
**Companies:** Amazon, Apple, Bloomberg, Goldman Sachs, Google, Linkedin, Meta, Microsoft, Tiktok, Vk, Yandex

---

## 1. Problem Description

Given the root of a binary tree, check whether it is a mirror of itself (symmetric around its center).

---

## 2. Approach: Recursive — O(n) ✅

```
FUNCTION isSymmetric(root):
    RETURN isMirror(root, root)

FUNCTION isMirror(t1, t2):
    IF t1 == null AND t2 == null: RETURN true
    IF t1 == null OR t2 == null: RETURN false
    RETURN t1.val == t2.val
       AND isMirror(t1.left, t2.right)
       AND isMirror(t1.right, t2.left)
```

Iterative: BFS with a queue, enqueue pairs `(left.left, right.right)` and `(left.right, right.left)`.

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Mirror check = compare left subtree of one with right subtree of the other, recursively.
