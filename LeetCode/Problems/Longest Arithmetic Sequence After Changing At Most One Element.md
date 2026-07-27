# 3872. Longest Arithmetic Sequence After Changing At Most One Element

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-arithmetic-sequence-after-changing-at-most-one-element](https://leetcode.com/problems/longest-arithmetic-sequence-after-changing-at-most-one-element)
**Companies:** Amazon

---

## 1. Problem Description

Find the longest arithmetic (contiguous) subarray, where you may change at most one element to any value.

---

## 2. Approach: DP with One Change — O(n²) ✅

```
// For each common difference d:
//   Track length of arithmetic subarray ending at i with 0 or 1 changes
//   dp0[i] = length without changes
//   dp1[i] = length with at most 1 change
```

| Time | Space |
|------|-------|
| O(n²) or O(n) per diff | O(n) |

---

## 3. Key Takeaway

> Extend standard arithmetic subarray DP with a "change budget" dimension. When the difference breaks, use the one allowed change to bridge the gap.
