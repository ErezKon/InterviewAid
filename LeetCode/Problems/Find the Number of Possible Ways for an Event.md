# 3317. Find the Number of Possible Ways for an Event

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-number-of-possible-ways-for-an-event](https://leetcode.com/problems/find-the-number-of-possible-ways-for-an-event)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Combinatorics with Stirling Numbers — O(n·x) ✅](#3-approach-combinatorics-with-stirling-numbers)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` performers, `x` acts, and `y` scores, count the number of ways to assign performers to acts and scores to acts. Each act must have ≥ 1 performer. Performers are distinguishable.

**Constraints:**
- `1 <= n, x, y <= 1000`

---

## 2. Key Insight

> For `k` acts used (1 ≤ k ≤ min(n, x)): choose which k acts from x (`C(x,k)`), partition n performers into k non-empty groups (Stirling numbers of 2nd kind `S(n,k)`), each act gets one of y scores (`y^k`).

---

## 3. Approach: Combinatorics with Stirling Numbers — O(n·x) ✅

```
FUNCTION numberOfWays(n, x, y):
    // Precompute Stirling numbers S(n, k) for k = 1..min(n, x)
    // Total = Σ C(x, k) × S(n, k) × y^k  for k = 1..min(n, x)

    result ← 0
    FOR k ← 1 TO MIN(n, x) DO
        result += C(x, k) * stirling(n, k) * pow(y, k)
        result %= MOD

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · x) — Stirling number DP |
| **Space** | O(n · x) |

---

## 5. Key Takeaway

> **Stirling numbers of the second kind** count ways to partition n distinguishable items into k non-empty groups. Combined with binomial coefficients and powers, this covers all event assignment possibilities.
