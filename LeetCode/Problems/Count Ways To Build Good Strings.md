# 2466. Count Ways To Build Good Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-ways-to-build-good-strings](https://leetcode.com/problems/count-ways-to-build-good-strings)
**Companies:** Amazon, Google, Meta, Microsoft, Oracle, Squarepoint Capital

---

## Problem Description

Build binary strings by appending `zero` zeros or `one` ones at each step. Count strings with length in `[low, high]` modulo `10^9 + 7`.

---

## Key Insight

Like climbing stairs with step sizes `zero` and `one`. `dp[i]` = number of ways to build a string of length `i`. Sum `dp[low..high]` for the answer.

---

## Approach

```
FUNCTION countGoodStrings(low, high, zero, one):
    MOD = 10^9 + 7
    dp = [0] * (high + 1)
    dp[0] = 1

    FOR i ← 1 TO high:
        IF i >= zero: dp[i] = (dp[i] + dp[i - zero]) % MOD
        IF i >= one: dp[i] = (dp[i] + dp[i - one]) % MOD

    RETURN SUM(dp[low:high+1]) % MOD
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(high) |
| **Space** | O(high) |

---

## Key Takeaway

> **Building strings by appending fixed-length blocks = climbing stairs DP. Each step adds either `zero` or `one` characters. Sum over the valid length range.**
