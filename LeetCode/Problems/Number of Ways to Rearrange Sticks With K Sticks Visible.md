# 1866. Number of Ways to Rearrange Sticks With K Sticks Visible

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-rearrange-sticks-with-k-sticks-visible](https://leetcode.com/problems/number-of-ways-to-rearrange-sticks-with-k-sticks-visible)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP (Stirling Numbers) — O(n·k)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Arrange `n` sticks of unique heights so exactly `k` are visible from the left. Count arrangements mod 10⁹+7.

---

## 2. Key Insight

> Consider the shortest stick. If it's not visible (n-1 positions behind a taller stick), multiply by `(n-1)`. If it IS visible (leftmost of its group), it must be first → recur on `(n-1, k-1)`. This gives unsigned Stirling numbers of the first kind.

---

## 3. Approach: DP (Stirling Numbers) — O(n·k) ✅

```
FUNCTION rearrangeSticks(n, k):
    MOD = 10^9 + 7
    dp[i][j] = ways to arrange i sticks with j visible
    dp[1][1] = 1
    FOR i ← 2 TO n:
        FOR j ← 1 TO MIN(i, k):
            dp[i][j] = (dp[i-1][j-1] + (i-1) * dp[i-1][j]) % MOD
    RETURN dp[n][k]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · k) |
| **Space** | O(n · k), optimizable to O(k) |

---

## 5. Key Takeaway

> **Unsigned Stirling numbers of the first kind.** Shortest stick: visible (left) → `dp[n-1][k-1]`, hidden → `(n-1) · dp[n-1][k]`.
