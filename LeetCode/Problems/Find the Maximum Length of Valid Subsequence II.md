# 3202. Find the Maximum Length of Valid Subsequence II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-ii](https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP on Remainders — O(n·k) ✅](#3-approach-dp-on-remainders--onk-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array `nums` and an integer `k`, find the maximum length of a subsequence where the sum of every consecutive pair of elements has the same remainder when divided by `k`.

**Constraints:**
- `1 <= n <= 10³`
- `2 <= k <= n`

---

## 2. Key Insight

> For each possible target remainder `r` (0 … k‑1), the subsequence must satisfy: for any two consecutive elements `a` and `b`, `(a + b) % k = r`. This implies that if an element has remainder `m = a % k`, the next element must have remainder `(r - m) % k`. Tracking the longest subsequence ending with each remainder yields a DP solution.

---

## 3. Approach: DP on Remainders — O(n·k) ✅

```text
FUNCTION maximumLength(nums, k):
    maxLen ← 0
    FOR r ← 0 TO k - 1 DO
        dp ← ARRAY of size k filled with 0   // dp[m] = longest subsequence ending with remainder m
        FOR num IN nums DO
            m ← num % k
            need ← (r - m + k) % k           // remainder required for previous element
            dp[m] ← dp[need] + 1
            maxLen ← MAX(maxLen, dp[m])
    RETURN maxLen
```

---

## 4. Examples

**Example 1:**
```
Input: nums = [1, 2, 3, 4, 5], k = 2
Output: 3
Explanation: Choose subsequence [1,3,5]; each consecutive pair sums to an even number (remainder 0). Length 3 is maximal.
```

**Example 2:**
```
Input: nums = [2, 5, 8, 11], k = 3
Output: 4
Explanation: All consecutive pairs sum to 13, which %3 = 1. The whole array is valid, so length 4.
```

---

## 5. Walkthrough

Consider `nums = [1, 2, 3, 4, 5]`, `k = 2`.
1. **r = 0** (pairs must sum to an even number):
   - Initialize `dp = [0,0]`.
   - Process 1 (m=1): need = (0‑1+2)%2 = 1 → dp[1] = dp[1] + 1 = 1.
   - Process 2 (m=0): need = 0 → dp[0] = dp[0] + 1 = 1.
   - Process 3 (m=1): need = 1 → dp[1] = dp[1] + 1 = 2.
   - Process 4 (m=0): need = 0 → dp[0] = dp[0] + 1 = 2.
   - Process 5 (m=1): need = 1 → dp[1] = dp[1] + 1 = 3.
   - `maxLen` becomes 3.
2. **r = 1** (pairs must sum to an odd number): similar updates yield a maximum length of 2.
The overall answer is the larger of the two, **3**.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · k) — iterate over k remainders and n elements |
| **Space** | O(k) — DP array for each remainder |

---

## 7. Key Takeaway

> By fixing the target pair‑sum remainder and maintaining a DP of longest subsequences ending with each modular class, we solve the problem in linear time per remainder.
