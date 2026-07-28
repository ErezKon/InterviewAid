# 3082. Find the Sum of the Power of All Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-sum-of-the-power-of-all-subsequences](https://leetcode.com/problems/find-the-sum-of-the-power-of-all-subsequences)
**Companies:** De Shaw, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP Knapsack + Contribution Counting — O(n · k) ✅](#3-approach-dp-knapsack--contribution-counting)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

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

```text
FUNCTION sumOfPower(nums, k):
    // dp[j] = weighted count of subsets with sum j
    SET dp[0..k] ← 0
    SET dp[0] ← 1
    FOR each num IN nums DO
        // update sums in reverse to avoid reuse
        FOR j ← k DOWNTO num DO
            SET dp[j] ← (dp[j] * 2 + dp[j - num]) MOD MOD
        // for sums that cannot include num, just double the count
        FOR j ← 0 TO MIN(num-1, k) DO
            SET dp[j] ← (dp[j] * 2) MOD MOD
    RETURN dp[k]
```

---

## 4. Examples

**Example 1:**
```
nums = [1,2,3], k = 3
```
Subsequences summing to 3 are `[3]` (size 1) and `[1,2]` (size 2). Their contributions are `2^(3-1)=4` and `2^(3-2)=2` respectively, total `6`.

**Example 2:**
```
nums = [2,2,2], k = 4
```
Valid subsequences: three ways to pick two `2`s. Each has size 2, contribution `2^(3-2)=2`, total `6`.

---

## 5. Walkthrough

Take `nums = [1,2,3]`, `k = 3`.

| Step | num | dp before | dp after (updates) |
|------|-----|-----------|--------------------|
| 0    | -   | `[1,0,0,0]` | — |
| 1    | 1   | update j=3..1 → dp[1]=1, others doubled → `[2,1,0,0]` |
| 2    | 2   | update j=3..2 → dp[3]=dp[1]=1, dp[2]=dp[0]=2, double lower j → dp[0]=4, dp[1]=2 → `[4,2,2,1]` |
| 3    | 3   | update j=3 → dp[3]=dp[3]*2 + dp[0]=1*2+4=6, double lower j → dp[0]=8, dp[1]=4, dp[2]=4 → final `dp[3]=6` |

Result `dp[3]=6` matches the manual contribution sum.

---

## 6. Complexity Analysis

- **Time:** O(n · k)
- **Space:** O(k)

---

## 7. Key Takeaway

> **Contribution trick**: each subset summing to k of size s contributes `2^(n-s)`. Fold the `2^(n-s)` factor into the DP transitions by multiplying non‑selected states by 2.