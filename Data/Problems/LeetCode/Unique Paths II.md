# 63. Unique Paths II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unique-paths-ii](https://leetcode.com/problems/unique-paths-ii)
**Companies:** Agoda, Amazon, Bloomberg, Google, Meta, Microsoft, Nvidia, Pinterest, Tcs, Tiktok, Zepto

---

## Problem Description

You are given an `m x n` integer array `grid`. There is a robot initially located at the **top-left corner** (i.e., `grid[0][0]`). The robot tries to move to the **bottom-right corner** (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.

An obstacle and space are marked as `1` or `0` respectively in `grid`. A path that the robot takes cannot include **any** square that is an obstacle.

Return *the number of possible unique paths that the robot can take to reach the bottom-right corner*.

The testcases are generated so that the answer will be less than or equal to `2 * 10^9`.

**Constraints:**
- `m == obstacleGrid.length`
- `n == obstacleGrid[i].length`
- `1 <= m, n <= 100`
- `obstacleGrid[i][j]` is `0` or `1`.

## Examples

**Example 1:**
```
Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
```

**Example 2:**
```
Input: obstacleGrid = [[0,1],[0,0]]
Output: 1
```

## Approach
Dynamic Programming – fill a DP table where `dp[i][j]` stores the number of ways to reach cell `(i,j)`.

```text
FUNCTION uniquePathsWithObstacles(grid):
    IF grid[0][0] == 1: RETURN 0
    m ← number of rows in grid
    n ← number of columns in grid
    dp ← m × n matrix initialized to 0
    dp[0][0] ← 1
    FOR i ← 0 TO m - 1:
        FOR j ← 0 TO n - 1:
            IF grid[i][j] == 1:
                dp[i][j] ← 0               // obstacle blocks path
            ELSE:
                IF i > 0: dp[i][j] += dp[i-1][j]
                IF j > 0: dp[i][j] += dp[i][j-1]
    RETURN dp[m-1][n-1]
```

## Walkthrough
Consider the first example grid.
| Cell | Value | dp[i][j] |
|------|-------|----------|
| (0,0) | 0 | 1 |
| (0,1) | 0 | 1 |
| (0,2) | 0 | 1 |
| (1,0) | 0 | 1 |
| (1,1) | 1 (obstacle) | 0 |
| (1,2) | 0 | 1 |
| (2,0) | 0 | 1 |
| (2,1) | 0 | 1 |
| (2,2) | 0 | 2 |
The bottom‑right cell yields `2` unique paths.

## Complexity Analysis
Time: O(m·n) – each cell processed once.
Space: O(m·n) for the DP table (can be reduced to O(n) with rolling array).

## Follow-Up Questions
* How would you modify the solution to use O(1) extra space?
* What if diagonal moves were allowed?
* Can you compute the number of paths modulo a large prime?

## Key Takeaway
Obstacles turn the classic grid‑path problem into a DP task where each cell accumulates paths from its top and left neighbours, skipping blocked cells.
