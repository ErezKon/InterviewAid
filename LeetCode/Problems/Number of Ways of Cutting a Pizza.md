# 1444. Number of Ways of Cutting a Pizza

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-of-cutting-a-pizza](https://leetcode.com/problems/number-of-ways-of-cutting-a-pizza)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP + 2D Prefix Sum — O(k·m·n·(m+n))](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Cut a pizza into `k` pieces with horizontal/vertical cuts. Each piece must contain at least one apple. Count valid ways mod 10⁹+7.

---

## 2. Key Insight

> `dp[cuts][r][c]` = ways to cut the subgrid starting at (r,c) into `cuts` remaining pieces. Use suffix sum to quickly check if a piece has apples.

---

## 3. Approach: DP + 2D Prefix Sum — O(k·m·n·(m+n)) ✅

```
FUNCTION ways(pizza, k):
    MOD = 10^9 + 7
    // Precompute suffix apple count
    apples[r][c] = apples in subgrid (r,c) to (m-1,n-1)

    dp[cuts][r][c] = ways to cut remaining subgrid into cuts pieces
    dp[1][r][c] = 1 IF apples[r][c] > 0

    FOR cuts ← 2 TO k:
        FOR r, c:
            // Try horizontal cuts
            FOR r2 ← r+1 TO m-1:
                IF piece (r..r2-1) has apples:
                    dp[cuts][r][c] += dp[cuts-1][r2][c]
            // Try vertical cuts similarly

    RETURN dp[k][0][0]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(k · m · n · (m + n)) |
| **Space** | O(k · m · n) |

---

## 5. Key Takeaway

> **DP on remaining cuts + top-left corner.** Suffix apple sum for O(1) emptiness checks. Enumerate all valid cut positions per state.
