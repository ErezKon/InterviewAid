# 100. Same Tree

**Difficulty:** 🟢 Easy
**Acceptance:** 62.0%
**LeetCode:** [https://leetcode.com/problems/same-tree](https://leetcode.com/problems/same-tree)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Google, Linkedin, Meta, Microsoft, Sap

---

## Problem Description

Given roots of two binary trees `p` and `q`, return `true` if they are structurally identical with the same node values.

---

## Examples

**Example 1:**
```
Input: p = [1,2,3], q = [1,2,3]
Output: true
Explanation: Both trees have the same structure and node values.
```

**Example 2:**
```
Input: p = [1,2], q = [1,null,2]
Output: false
Explanation: The structures differ; the left child of the root in `q` is missing.
```

---

## Approach

Recursive depth‑first traversal comparing corresponding nodes.

```text
FUNCTION isSameTree(p, q):
    IF p == null AND q == null: RETURN true
    IF p == null OR q == null: RETURN false
    IF p.val != q.val: RETURN false
    RETURN isSameTree(p.left, q.left) AND isSameTree(p.right, q.right)
```

---

## Walkthrough

Consider Example 1 where `p` and `q` are `[1,2,3]`.
| Step | p node | q node | Action |
|------|--------|--------|--------|
| 1 | 1 | 1 | Values equal → recurse left & right |
| 2 | 2 | 2 | Values equal → recurse |
| 3 | null | null | Return true |
| 4 | 3 | 3 | Values equal → recurse leaves → true |
All recursive calls return true, so final result is true.

---

## Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(n) – each node visited once |
| Space  | O(h) – recursion stack, h = tree height |

---

## Follow-Up Questions

1. How would you solve this iteratively using a stack or queue?
2. How to handle very deep trees that could cause stack overflow?
3. Extend to check if two trees are mirrors of each other.

---

## Key Takeaway

> The three‑case base pattern (both null → true, one null → false, compare values + recurse) is the foundation for all tree comparison problems.
