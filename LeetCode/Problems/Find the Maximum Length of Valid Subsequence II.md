# 3202. Find the Maximum Length of Valid Subsequence II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-ii](https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP on Remainders — O(n·k) ✅](#3-approach-dp-on-remainders--onk-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given `nums` and integer `k`, find the maximum length of a subsequence where consecutive pairs all have the **same sum mod k**.

**Constraints:**
- `1 <= n <= 10³`
- `2 <= k <= n`

---

## 2. Key Insight

> For each target remainder `r` (0 to k-1), find the longest subsequence where consecutive elements sum to `r` mod k. For an element with `num % k == m`, the previous element must have `num % k == (r - m) % k`.

---

## 3. Approach: DP on Remainders — O(n·k) ✅

```
FUNCTION maximumLength(nums, k):
    // dp[r] = max length of valid subsequence where consecutive sum mod k == r
    // For each target remainder r:
    //   dp2[last_mod] = length of longest subsequence ending with element ≡ last_mod (mod k)
    //   where consecutive pairs sum to r (mod k)

    maxLen = 0
    FOR r ← 0 TO k - 1:
        dp = [0] * k
        FOR num IN nums:
            m = num % k
            need = (r - m + k) % k
            dp[m] = dp[need] + 1
            maxLen = MAX(maxLen, dp[m])

    RETURN maxLen
```

---

## 4. Walkthrough

```
nums = [1, 2, 3, 4, 5], k = 2

r=0: pairs must sum to 0 mod 2 (both even or both odd)
  1(m=1): dp[1]=dp[1]+1=1, 2(m=0): dp[0]=dp[0]+1=1
  3(m=1): dp[1]=dp[1]+1=2, 4(m=0): dp[0]=dp[0]+1=2
  5(m=1): dp[1]=dp[1]+1=3 → max so far = 3

r=1: pairs must sum to 1 mod 2 (alternating parity)
  ...
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · k) — k target remainders × n elements |
| **Space** | O(k) — DP array per remainder |

---

## 6. Key Takeaway

> **DP on mod-k remainders** generalizes the parity approach from part I. For each target pair-sum remainder, track the longest subsequence ending at each modular class.
