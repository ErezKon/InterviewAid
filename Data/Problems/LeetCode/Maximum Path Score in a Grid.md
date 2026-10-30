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

You are given an `m x n` grid where each cell contains one of the values 0, 1, or 2. You are also given an integer `k`.

You start from the top-left corner `(0, 0)` and want to reach the bottom-right corner `(m - 1, n - 1)` by moving only **right** or **down**.

Each cell contributes a specific score and incurs an associated cost, according to their cell values:

- 0: adds 0 to your score and costs 0.
- 1: adds 1 to your score and costs 1.
- 2: adds 2 to your score and costs 1.

Return the **maximum** score achievable without exceeding a total cost of `k`, or -1 if no valid path exists.

**Note:** If you reach the last cell but the total cost exceeds `k`, the path is invalid.

**Constraints:**
- `1 <= m, n <= 200`
- `0 <= k <= 10^3`
- `grid[0][0] == 0`
- `0 <= grid[i][j] <= 2`

---

## Examples

```
Example 1:
  Input: grid = [[0, 1],[2, 0]], k = 1
  Output: 2
  Explanation: The optimal path is:
    Cell   | grid[i][j] | Score | Total Score | Cost | Total Cost
    (0, 0) | 0          | 0     | 0           | 0    | 0
    (1, 0) | 2          | 2     | 2           | 1    | 1
    (1, 1) | 0          | 0     | 2           | 0    | 1
    Thus, the maximum possible score is 2.
```

```
Example 2:
  Input: grid = [[0, 1],[1, 2]], k = 1
  Output: -1
  Explanation: There is no path that reaches cell (1, 1) without exceeding cost k. Thus, the answer is -1.
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
