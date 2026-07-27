# 2209. Minimum White Tiles After Covering With Carpets

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-white-tiles-after-covering-with-carpets](https://leetcode.com/problems/minimum-white-tiles-after-covering-with-carpets)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n · k)](#3-approach-dp--on--k)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a binary string `floor` (1=white, 0=black), `numCarpets` carpets each of length `carpetLen`. Place carpets to cover tiles. Return the **minimum** white tiles remaining.

**Constraints:**
- `1 <= floor.length <= 1000`
- `1 <= numCarpets <= 1000`
- `1 <= carpetLen <= floor.length`

---

## 2. Key Insight

> DP: `dp[i][j]` = min white tiles in `floor[0..i-1]` using `j` carpets. At each position, either don't use a carpet (inherit `dp[i-1][j] + floor[i]`), or place a carpet ending at `i` (look back `carpetLen` positions: `dp[max(0, i-carpetLen)][j-1]`).

---

## 3. Approach: DP — O(n · k) ✅

```
FUNCTION minimumWhiteTiles(floor, numCarpets, carpetLen):
    n = len(floor)
    dp = (n+1) × (numCarpets+1) of 0

    FOR i ← 1 TO n:
        FOR j ← 0 TO numCarpets:
            dp[i][j] = dp[i-1][j] + (floor[i-1] == '1')
            IF j > 0:
                dp[i][j] = MIN(dp[i][j], dp[max(0, i-carpetLen)][j-1])

    RETURN dp[n][numCarpets]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · numCarpets) |
| **Space** | O(n · numCarpets) |

---

## 5. Key Takeaway

> **Carpet placement DP** — at each tile, either expose it or end a carpet here (covering the last `carpetLen` tiles). Classic "place k items" DP pattern.
