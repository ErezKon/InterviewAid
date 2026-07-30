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

```text
FUNCTION isSymmetric(root):
    RETURN isMirror(root, root)

FUNCTION isMirror(t1, t2):
    IF t1 == null AND t2 == null:
        RETURN true
    IF t1 == null OR t2 == null:
        RETURN false
    RETURN t1.val == t2.val
        AND isMirror(t1.left, t2.right)
        AND isMirror(t1.right, t2.left)
```

Iterative: BFS with a queue, enqueue pairs `(left.left, right.right)` and `(left.right, right.left)`.

---

## 3. Examples

| Tree | Symmetric? |
|------|------------|
| `[1,2,2,3,4,4,3]` | Yes |
| `[1,2,2,null,3,null,3]` | No |

*Explanation:* The first tree mirrors left and right subtrees perfectly; the second has mismatched leaf values.

---

## 4. Walkthrough

**Example Tree:** `[1,2,2,3,4,4,3]`

1. Call `isSymmetric(root)`, which calls `isMirror(root, root)`.
2. Compare root values (both 1) → continue.
3. Recurse on `isMirror(root.left, root.right)` → compare nodes with value 2.
4. Their left children (3 vs 4) differ, so `isMirror` returns false for that branch, but other branch matches.
5. Overall result is false for mismatched subtrees, thus the tree is not symmetric.

---

## 5. Complexity Analysis

- **Time:** O(n) – each node visited once.
- **Space:** O(h) recursion stack, where h is tree height (O(log n) for balanced, O(n) worst case).

---

## Key Takeaway

> Mirror check = compare left subtree of one with right subtree of the other, recursively.
