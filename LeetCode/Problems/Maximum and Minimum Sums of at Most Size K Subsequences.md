# 3428. Maximum and Minimum Sums of at Most Size K Subsequences

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Bloomberg, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sort + Combinatorics — O(n log n)](#approach-sort--combinatorics--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and integer `k`, compute the sum over all subsequences of size ≤ k of `(max(subseq) + min(subseq))`. Return the result modulo 10⁹+7.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ k ≤ n`

---

## Key Insight

> Sort the array. For element `nums[i]` as the **maximum** of a subsequence, the other elements must come from `nums[0..i-1]`. The number of such subsequences of size ≤ k is `Σ C(i, j)` for j = 0 to min(k-1, i). Similarly handle each element as the minimum. Use precomputed factorials for fast binomial coefficients.

---

## Approach: Sort + Combinatorics — O(n log n) ✅

```
FUNCTION maxMinSum(nums, k):
    SORT nums
    MOD = 10^9 + 7
    precompute factorials and inverse factorials

    result = 0
    FOR i ← 0 TO n - 1:
        // nums[i] as max: choose up to k-1 from i elements before it
        countAsMax = SUM(C(i, j) for j = 0 to min(k-1, i))
        // nums[i] as min: choose up to k-1 from n-i-1 elements after it
        countAsMin = SUM(C(n-i-1, j) for j = 0 to min(k-1, n-i-1))
        result += nums[i] * (countAsMax + countAsMin)
        result %= MOD

    RETURN result
```

Optimize partial sums of binomial coefficients using prefix sums or recurrence.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + Combinatorics | **O(n log n + n·k)** | O(n) |

---

## Key Takeaway

> **"Sum of min+max over all subsequences" decomposes into contribution of each element as min and as max.** Sort the array, then use combinatorics to count how many subsequences each element anchors.
