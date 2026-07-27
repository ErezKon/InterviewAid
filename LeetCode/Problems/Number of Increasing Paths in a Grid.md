# 2328. Number of Increasing Paths in a Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-increasing-paths-in-a-grid](https://leetcode.com/problems/number-of-increasing-paths-in-a-grid)
**Companies:** Adobe, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DFS with Memoization — O(m·n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count the number of strictly increasing paths of any length in a grid. Paths move in 4 directions. Return mod 10⁹+7.

---

## 2. Key Insight

> Each cell can start a path. `dp[r][c]` = number of increasing paths starting from `(r, c)`. Use DFS with memoization. Since paths are strictly increasing, no cycles exist → DAG structure.

---

## 3. Approach: DFS with Memoization — O(m·n) ✅

```
FUNCTION countPaths(grid):
    MOD = 10^9 + 7
    memo = [[-1] * n for _ in range(m)]

    FUNCTION dfs(r, c):
        IF memo[r][c] != -1: RETURN memo[r][c]
        count = 1    // path of just this cell
        FOR (nr, nc) IN neighbors of (r, c):
            IF grid[nr][nc] > grid[r][c]:
                count = (count + dfs(nr, nc)) % MOD
        memo[r][c] = count
        RETURN count

    RETURN SUM(dfs(r, c) for all r, c) % MOD
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) — each cell computed once |
| **Space** | O(m · n) |

---

## 5. Key Takeaway

> **DAG DP on grid.** Strict increasing → no cycles → safe memoization. Each cell contributes 1 + sum of paths from strictly larger neighbors. Same pattern as "Longest Increasing Path in a Matrix".
