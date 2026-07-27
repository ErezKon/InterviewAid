# 100. Same Tree

**Difficulty:** 🟢 Easy
**Acceptance:** 62.0%
**LeetCode:** [https://leetcode.com/problems/same-tree](https://leetcode.com/problems/same-tree)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Google, Linkedin, Meta, Microsoft, Sap

---

## Problem Description

Given roots of two binary trees `p` and `q`, return `true` if they are structurally identical with the same node values.

---

## Approach: Recursive — O(n) ✅

```
FUNCTION isSameTree(p, q):
    IF p == null AND q == null: RETURN true
    IF p == null OR q == null: RETURN false
    RETURN p.val == q.val
       AND isSameTree(p.left, q.left)
       AND isSameTree(p.right, q.right)
```

| Time | Space |
|------|-------|
| O(n) | O(h) — recursion depth |

---

## Key Takeaway

> The three-case base pattern (both null → true, one null → false, compare values + recurse) is the foundation for all tree comparison problems.
