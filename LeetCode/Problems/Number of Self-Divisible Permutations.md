# 2992. Number of Self-Divisible Permutations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-self-divisible-permutations](https://leetcode.com/problems/number-of-self-divisible-permutations)
**Companies:** Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask DP — O(n · 2ⁿ)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count permutations of `[1..n]` where for each position `i`, either `perm[i] % i == 0` or `i % perm[i] == 0`.

---

## 2. Key Insight

> n ≤ 12, so bitmask DP is feasible. `dp[mask]` = number of ways to fill the first `popcount(mask)` positions using the elements indicated by `mask`.

---

## 3. Approach: Bitmask DP — O(n · 2ⁿ) ✅

```
FUNCTION selfDivisiblePermutationCount(n):
    dp = [0] * (1 << n)
    dp[0] = 1
    FOR mask ← 0 TO (1 << n) - 1:
        pos = popcount(mask) + 1
        FOR num ← 1 TO n:
            IF NOT (mask & (1 << (num-1))):
                IF num % pos == 0 OR pos % num == 0:
                    dp[mask | (1 << (num-1))] += dp[mask]
    RETURN dp[(1 << n) - 1]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · 2ⁿ) |
| **Space** | O(2ⁿ) |

---

## 5. Key Takeaway

> **Bitmask DP for constrained permutations.** Small n allows enumeration of all subsets. Position = popcount(mask) + 1. Check divisibility constraint before placing.
