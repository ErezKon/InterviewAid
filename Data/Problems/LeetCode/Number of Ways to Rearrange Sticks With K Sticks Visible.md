# 1866. Number of Ways to Rearrange Sticks With K Sticks Visible

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-rearrange-sticks-with-k-sticks-visible](https://leetcode.com/problems/number-of-ways-to-rearrange-sticks-with-k-sticks-visible)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP (Stirling Numbers) — O(n·k)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Arrange `n` sticks of unique heights so exactly `k` are visible from the left. Count arrangements mod 10⁹+7.

---

## 2. Key Insight

> Consider the shortest stick. If it's not visible (n-1 positions behind a taller stick), multiply by `(n-1)`. If it IS visible (leftmost of its group), it must be first → recur on `(n-1, k-1)`. This gives unsigned Stirling numbers of the first kind.

---

## 3. Approach: DP (Stirling Numbers) — O(n·k) ✅

```text
FUNCTION rearrangeSticks(n, k):
    MOD ← 10^9 + 7
    // dp[i][j] = ways to arrange i sticks with j visible
    CREATE dp[0…n][0…k] INITIALIZED TO 0
    dp[1][1] ← 1
    FOR i ← 2 TO n:
        FOR j ← 1 TO MIN(i, k):
            // Shortest stick visible → dp[i-1][j-1]
            // Shortest stick hidden → (i-1) * dp[i-1][j]
            dp[i][j] ← (dp[i-1][j-1] + (i-1) * dp[i-1][j]) % MOD
    RETURN dp[n][k]
```

---

## 4. Examples

| n | k | Output |
|---|---|--------|
| 3 | 2 | 2 |
| 3 | 3 | 1 |
| 4 | 2 | 8 |

*Explanation*: For `n=3, k=2`, the visible arrangements are `[2,1,3]` and `[3,1,2]`.

---

## 5. Walkthrough

Take `n = 4, k = 2`.

1. Initialize `dp[1][1] = 1`.
2. For `i = 2`:
   - `j = 1`: `dp[2][1] = (dp[1][0] + 1*dp[1][1]) = 1`
   - `j = 2`: `dp[2][2] = (dp[1][1] + 1*dp[1][2]) = 1`
3. For `i = 3`:
   - `j = 1`: `dp[3][1] = (dp[2][0] + 2*dp[2][1]) = 2`
   - `j = 2`: `dp[3][2] = (dp[2][1] + 2*dp[2][2]) = 3`
   - `j = 3`: `dp[3][3] = (dp[2][2] + 2*dp[2][3]) = 1`
4. For `i = 4` and `j = 2`:
   - `dp[4][2] = (dp[3][1] + 3*dp[3][2]) = (2 + 3*3) = 11` → `11 % MOD = 11`.
5. The final answer for `(4,2)` is `dp[4][2] = 11` (modulo applied).

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · k) |
| **Space** | O(n · k) (optimizable to O(k)) |

---

## 7. Key Takeaway

> **Unsigned Stirling numbers of the first kind.** Shortest stick: visible (left) → `dp[n-1][k-1]`, hidden → `(n-1) · dp[n-1][k]`.
