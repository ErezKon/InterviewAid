# 3742. Maximum Path Score in a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-path-score-in-a-grid](https://leetcode.com/problems/maximum-path-score-in-a-grid)
**Companies:** Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `m × n` grid of integers, find a path from the top row to the bottom row (moving down, down-left, or down-right) that maximizes the **minimum value** along the path. Return that maximum minimum value.

**Constraints:**
- `m, n <= 100`

---

## Examples

**Example 1:**
```
Input:  grid = [[5,1],[4,5]]
Output: 5
Explanation: Path (0,0)→(1,1): min(5,5) = 5.
```

---

## Key Insight

> **DP**: `dp[r][c]` = maximum possible minimum value on any path ending at `(r, c)`. Transition: `dp[r][c] = min(grid[r][c], max(dp[r-1][c-1], dp[r-1][c], dp[r-1][c+1]))`.

---

## Approach

```
FUNCTION maxPathScore(grid)
    m, n ← dimensions
    dp ← copy of grid[0]

    FOR r ← 1 TO m-1 DO
        newDp ← array of n
        FOR c ← 0 TO n-1 DO
            best ← dp[c]
            IF c > 0 THEN best ← MAX(best, dp[c-1])
            IF c < n-1 THEN best ← MAX(best, dp[c+1])
            newDp[c] ← MIN(grid[r][c], best)
        dp ← newDp

    RETURN MAX(dp)
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(m × n)** — process each cell once |
| Space  | **O(n)** — single row DP |

---

## Key Takeaway

> **DP with max-min path** — track the maximum achievable minimum along paths column by column. Classic grid DP with min-max objective.
