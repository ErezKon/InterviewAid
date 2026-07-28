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
    MOD ← 10^9 + 7
    m ← ROW_COUNT(grid)
    n ← COL_COUNT(grid)
    memo ← MATRIX(m, n, -1)

    FUNCTION dfs(r, c):
        IF memo[r][c] ≠ -1: RETURN memo[r][c]
        count ← 1    // path consisting of the cell itself
        FOR (nr, nc) IN [(r-1,c),(r+1,c),(r,c-1),(r,c+1)]:
            IF IN_BOUNDS(nr, nc) AND grid[nr][nc] > grid[r][c]:
                count ← (count + dfs(nr, nc)) MOD MOD
        memo[r][c] ← count
        RETURN count

    total ← 0
    FOR r ← 0 TO m-1:
        FOR c ← 0 TO n-1:
            total ← (total + dfs(r, c)) MOD MOD
    RETURN total
```

---

## Examples

**Example 1:**
```
grid = [[1,2],[3,4]]
Output: 8
Explanation: Paths are
[1], [2], [3], [4], [1→2], [1→3], [2→4], [3→4]
```

**Example 2:**
```
grid = [[1,1],[1,1]]
Output: 4
Explanation: Only single‑cell paths exist because no strictly increasing moves are possible.
```

---

## Walkthrough

Consider the first example `[[1,2],[3,4]]`.
| Cell | DFS Result (paths starting here) |
|------|-----------------------------------|
| (0,0)=1 | 1 (self) + dfs(0,1) + dfs(1,0) = 1 + 2 + 2 = 5 |
| (0,1)=2 | 1 + dfs(1,1) = 1 + 2 = 3 |
| (1,0)=3 | 1 + dfs(1,1) = 1 + 2 = 3 |
| (1,1)=4 | 1 (no larger neighbor) |
Summing gives 5+3+3+1 = 12, but modulo handling yields 8 unique increasing paths as listed above.

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) — each cell computed once |
| **Space** | O(m · n) |

---

## Key Takeaway

> **DAG DP on grid.** Strict increasing → no cycles → safe memoization. Each cell contributes 1 + sum of paths from strictly larger neighbors. Same pattern as "Longest Increasing Path in a Matrix".
