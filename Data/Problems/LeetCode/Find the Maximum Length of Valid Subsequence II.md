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

You are given an integer array `nums` and a **positive** integer `k`.

A subsequence `sub` of `nums` with length `x` is called **valid** if it satisfies:

- `(sub[0] + sub[1]) % k == (sub[1] + sub[2]) % k == ... == (sub[x - 2] + sub[x - 1]) % k`.

Return the length of the **longest valid** subsequence of `nums`.

**Constraints:**
- `2 <= nums.length <= 10³`
- `1 <= nums[i] <= 10⁷`
- `1 <= k <= 10³`

---

## 2. Key Insight

> For each possible target remainder `r` (0 … k-1), the subsequence must satisfy: for any two consecutive elements `a` and `b`, `(a + b) % k = r`. This implies that if an element has remainder `m = a % k`, the next element must have remainder `(r - m) % k`. Tracking the longest subsequence ending with each remainder yields a DP solution.

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

```
Example 1:
  Input: nums = [1,2,3,4,5], k = 2
  Output: 5
  Explanation: The longest valid subsequence is [1, 2, 3, 4, 5].

Example 2:
  Input: nums = [1,4,2,3,1,4], k = 3
  Output: 4
  Explanation: The longest valid subsequence is [1, 4, 1, 4].
```

---

## 5. Walkthrough

Consider `nums = [1, 2, 3, 4, 5]`, `k = 2`.
1. **r = 0** (pairs must sum to an even number):
   - Initialize `dp = [0,0]`.
   - Process 1 (m=1): need = (0-1+2)%2 = 1 → dp[1] = dp[1] + 1 = 1.
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

> By fixing the target pair-sum remainder and maintaining a DP of longest subsequences ending with each modular class, we solve the problem in linear time per remainder.
