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

You are given a **0-indexed binary** string `floor`, which represents the colors of tiles on a floor:

- `floor[i] = '0'` denotes that the `i^th` tile of the floor is colored **black**.
- On the other hand, `floor[i] = '1'` denotes that the `i^th` tile of the floor is colored **white**.

You are also given `numCarpets` and `carpetLen`. You have `numCarpets` **black** carpets, each of length `carpetLen` tiles. Cover the tiles with the given carpets such that the number of **white** tiles still visible is **minimum**. Carpets may overlap one another.

Return *the **minimum** number of white tiles still visible.*

**Constraints:**
- `1 <= carpetLen <= floor.length <= 1000`
- `floor[i]` is either `'0'` or `'1'`.
- `1 <= numCarpets <= 1000`

---

## 2. Key Insight

> DP: `dp[i][j]` = min white tiles in `floor[0..i-1]` using `j` carpets. At each position, either don't use a carpet (inherit `dp[i-1][j] + floor[i]`), or place a carpet ending at `i` (look back `carpetLen` positions: `dp[max(0, i-carpetLen)][j-1]`).

---

## 3. Approach: DP — O(n · k) ✅

```text
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

## 4. Examples

**Example 1:**
```
Input: floor = "10110101", numCarpets = 2, carpetLen = 2
Output: 2
Explanation: The figure above shows one way of covering the tiles with the carpets such that only 2 white tiles are visible.
No other way of covering the tiles with the carpets can leave less than 2 white tiles visible.
```

**Example 2:**
```
Input: floor = "11111", numCarpets = 2, carpetLen = 3
Output: 0
Explanation: The figure above shows one way of covering the tiles with the carpets such that no white tiles are visible.
Note that the carpets are able to overlap one another.
```

---

## 5. Walkthrough

Consider Example 1 (`floor = "10101", numCarpets = 2, carpetLen = 2`).

| i (1-based) | floor[i-1] | dp[i][0] (no carpet) | dp[i][1] | dp[i][2] |
|------------|-----------|----------------------|----------|----------|
| 0          | -         | 0                    | 0        | 0        |
| 1          | 1         | 1                    | 0 (cover) | 0        |
| 2          | 0         | 1                    | 0        | 0 (cover) |
| 3          | 1         | 2                    | 1        | 0        |
| 4          | 0         | 2                    | 1        | 0        |
| 5          | 1         | 3                    | 2        | 1        |

The final answer `dp[5][2] = 1` matches the expected output.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · numCarpets) |
| **Space** | O(n · numCarpets) |

---

## 7. Key Takeaway

> **Carpet placement DP** — at each tile, either expose it or end a carpet here (covering the last `carpetLen` tiles). Classic "place k items" DP pattern.
