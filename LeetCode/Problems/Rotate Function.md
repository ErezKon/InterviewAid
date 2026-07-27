# 396. Rotate Function

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rotate-function](https://leetcode.com/problems/rotate-function)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given an array `nums`, define `F(k) = Σ(i * nums[(i+k) % n])` for rotation k. Return the **maximum** value of `F(k)` across all rotations.

---

## Key Insight

> `F(k) = F(k-1) + totalSum - n * nums[n-k]`. Each rotation shifts all weights up by 1, adding `totalSum`, but the element that wraps around drops from weight `n-1` to weight `0`, losing `n * nums[n-k]`.

---

## Approach

```
FUNCTION maxRotateFunction(nums):
    n = len(nums)
    totalSum = SUM(nums)
    F = SUM(i * nums[i] for i in range(n))
    maxF = F

    FOR k ← 1 TO n - 1:
        F = F + totalSum - n * nums[n - k]
        maxF = MAX(maxF, F)

    RETURN maxF
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Derive a recurrence between consecutive rotations to avoid recomputing each F(k) from scratch — transforms O(n²) brute force into O(n).
