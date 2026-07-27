# 3082. Find the Sum of the Power of All Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-sum-of-the-power-of-all-subsequences](https://leetcode.com/problems/find-the-sum-of-the-power-of-all-subsequences)
**Companies:** De Shaw, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP Knapsack + Contribution Counting — O(n · k) ✅](#3-approach-dp-knapsack--contribution-counting)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

The **power** of an array is the number of subsequences whose sum equals a given `k`. Return the sum of powers of all subsequences of `nums`, mod 10⁹+7.

**Constraints:**
- `1 <= n <= 100`
- `1 <= k <= 100`

---

## 2. Key Insight

> For each subsequence of size `s` that sums to `k`, it contributes `2^(n-s)` to the total (the remaining `n-s` elements can be independently included/excluded). So count subsequences of each size that sum to `k`, weighted by `2^(n-s)`.

---

## 3. Approach: DP Knapsack + Contribution Counting — O(n · k) ✅

```
FUNCTION sumOfPower(nums, k):
    // dp[j] = sum of 2^(n-size) over all subsets of sum j
    // Equivalently: dp[j] tracks weighted count
    dp ← array of size k+1, all 0
    dp[0] ← 1

    FOR num IN nums DO
        FOR j ← k DOWNTO num DO
            dp[j] = (dp[j] * 2 + dp[j - num]) % MOD
        FOR j ← 0 TO MIN(num-1, k) DO
            dp[j] = dp[j] * 2 % MOD

    RETURN dp[k]
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · k) |
| **Space** | O(k) |

---

## 5. Key Takeaway

> **Contribution trick**: each subset summing to k of size s contributes `2^(n-s)`. Fold the `2^(n-s)` factor into the DP transitions by multiplying non-selected states by 2.
