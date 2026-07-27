# 2659. Make Array Empty

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/make-array-empty](https://leetcode.com/problems/make-array-empty)
**Companies:** Google, Zepto

---

## 1. Problem Description

Repeatedly remove the smallest element from a circular array (rotating elements to front). Count total operations.

---

## 2. Approach: Sort + BIT/Fenwick Tree — O(n log n) ✅

```
// Sort indices by value
// Process removals in order of value
// Use BIT to track remaining elements and compute rotations
// Each removal: count elements between last position and current position
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## 3. Key Takeaway

> Process elements smallest to largest. Use a Fenwick tree to efficiently count remaining elements between positions to determine rotation cost.
