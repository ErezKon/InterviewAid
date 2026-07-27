# 3850. Count Sequences to K

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-sequences-to-k](https://leetcode.com/problems/count-sequences-to-k)
**Companies:** Google, Linkedin

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Count the number of valid sequences that sum to `k`, given specific constraints on element choices and ordering. Return the answer modulo `10^9 + 7`.

---

## Key Insight

This is a combinatorial counting problem that typically requires **DP with state tracking** on the running sum and constraints. Depending on the exact rules, it may involve knapsack-style DP, generating functions, or inclusion-exclusion.

---

## Approach

```
FUNCTION countSequences(n, k):
    MOD = 10^9 + 7
    // dp[sum] = number of valid sequences reaching this sum
    dp = [0] * (k + 1)
    dp[0] = 1

    FOR step ← 1 TO n DO
        newDp = [0] * (k + 1)
        FOR s ← 0 TO k DO
            IF dp[s] > 0 THEN
                FOR choice IN validChoices(step) DO
                    IF s + choice <= k THEN
                        newDp[s + choice] = (newDp[s + choice] + dp[s]) % MOD
        dp = newDp

    RETURN dp[k]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × k × choices) |
| **Space** | O(k) |

---

## Key Takeaway

> **Sequence counting to a target sum is a variant of the bounded knapsack/coin-change problem. Track running sum as DP state and enumerate valid choices at each step.**
