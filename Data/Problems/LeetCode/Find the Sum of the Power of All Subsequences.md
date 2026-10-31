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

You are given an integer array `nums` of length `n` and a **positive** integer `k`.

The **power** of an array of integers is defined as the number of subsequences with their sum **equal** to `k`.

Return *the **sum** of **power** of all subsequences of* `nums`*.*

Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= n <= 100`
- `1 <= nums[i] <= 10^4`
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
Input:   nums = [1,2,3], k = 3
Output:   6
Explanation: There are 5 subsequences of nums with non-zero power:
- The subsequence [1,2,3] has 2 subsequences with sum == 3: [1,2,3] and [1,2,3].
- The subsequence [1,2,3] has 1 subsequence with sum == 3: [1,2,3].
- The subsequence [1,2,3] has 1 subsequence with sum == 3: [1,2,3].
- The subsequence [1,2,3] has 1 subsequence with sum == 3: [1,2,3].
- The subsequence [1,2,3] has 1 subsequence with sum == 3: [1,2,3].
Hence the answer is 2 + 1 + 1 + 1 + 1 = 6.
```

**Example 2:**
```
Input:   nums = [2,3,3], k = 5
Output:   4
Explanation: There are 3 subsequences of nums with non-zero power:
- The subsequence [2,3,3] has 2 subsequences with sum == 5: [2,3,3] and [2,3,3].
- The subsequence [2,3,3] has 1 subsequence with sum == 5: [2,3,3].
- The subsequence [2,3,3] has 1 subsequence with sum == 5: [2,3,3].
Hence the answer is 2 + 1 + 1 = 4.
```

**Example 3:**
```
Input:   nums = [1,2,3], k = 7
Output:   0
Explanation: There exists no subsequence with sum 7. Hence all subsequences of nums have power = 0.
```

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

> **Contribution trick**: each subset summing to k of size s contributes `2^(n-s)`. Fold the `2^(n-s)` factor into the DP transitions by multiplying non-selected states by 2.