# 396. Rotate Function

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rotate-function](https://leetcode.com/problems/rotate-function)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given an integer array `nums`, define `F(k) = Σ(i * nums[(i + k) % n])` where `n` is the length of the array and `k` is the number of rotations. Return the maximum value of `F(k)` for any `k`.

---

## Key Insight

> `F(k) = F(k-1) + totalSum - n * nums[n-k]`. Each rotation shifts all weights up by 1, adding `totalSum`, but the element that wraps around drops from weight `n-1` to weight `0`, losing `n * nums[n-k]`.

---

## Approach

```text
FUNCTION maxRotateFunction(nums):
    n ← LENGTH(nums)
    totalSum ← SUM(nums)
    F ← SUM(i * nums[i] FOR i ← 0 TO n-1)
    maxF ← F

    FOR k ← 1 TO n-1:
        F ← F + totalSum - n * nums[n - k]
        maxF ← MAX(maxF, F)

    RETURN maxF
```

---

## Examples

| nums | Output |
|------|--------|
| `[4,3,2,6]` | `26` |
| `[1,2,3,4,5]` | `55` |

---

## Walkthrough

1. Compute `totalSum = 4+3+2+6 = 15` and initial `F(0) = 0*4 + 1*3 + 2*2 + 3*6 = 25`.
2. For `k=1`: `F = 25 + 15 - 4*4 = 26` → update `maxF`.
3. Continue updating `F` using the recurrence for remaining rotations; the maximum remains `26`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Follow-Up Questions

* How would you adapt the solution if the array could be updated between queries?
* Can the recurrence be derived for a weighted sum with different coefficients?

---

## Key Takeaway

> Derive a recurrence between consecutive rotations to avoid recomputing each `F(k)` from scratch — transforms O(n²) brute force into O(n).
