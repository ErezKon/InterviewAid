# 3511. Make a Positive Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-a-positive-array](https://leetcode.com/problems/make-a-positive-array)
**Companies:** Ukg

---

## 1. Problem Description

Find the minimum number of operations to make all prefix sums positive.

---

## 2. Approach: Greedy with Prefix Sum ✅

```
// Track running prefix sum
// When prefix sum drops ≤ 0, increment to make it positive
// Count total increments needed
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Greedily fix prefix sums as you scan left to right. Each fix at position i propagates to all subsequent prefix sums.
