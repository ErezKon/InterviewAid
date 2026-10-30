# 2596. Check Knight Tour Configuration

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-knight-tour-configuration](https://leetcode.com/problems/check-knight-tour-configuration)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description

There is a knight on an `n x n` chessboard. In a valid configuration, the knight starts **at the top-left cell** of the board and visits every cell on the board **exactly once**.

You are given an `n x n` integer matrix `grid` consisting of distinct integers from the range `[0, n * n - 1]` where `grid[row][col]` indicates that the cell `(row, col)` is the `grid[row][col]^th` cell that the knight visited. The moves are **0-indexed**.

Return `true` *if* `grid` *represents a valid configuration of the knight's movements or* `false` *otherwise*.

**Note** that a valid knight move consists of moving two squares vertically and one square horizontally, or two squares horizontally and one square vertically. The figure below illustrates all the possible eight moves of a knight from some cell.
![img](https://assets.leetcode.com/uploads/2018/10/12/knight.png)

**Constraints:**
- `n == grid.length == grid[i].length`
- `3 <= n <= 7`
- `0 <= grid[row][col] < n * n`
- All integers in `grid` are **unique**.

## Examples

**Example 1:**
```
Input: grid = [[0,11,16,5,20],[17,4,19,10,15],[12,1,8,21,6],[3,18,23,14,9],[24,13,2,7,22]]
Output: true
Explanation: The above diagram represents the grid. It can be shown that it is a valid configuration.
```

**Example 2:**
```
Input: grid = [[0,3,6],[5,8,1],[2,7,4]]
Output: false
Explanation: The above diagram represents the grid. The 8^th move of the knight is not valid considering its position after the 7^th move.
```

## Approach
Map each step number to its coordinates, then verify that every consecutive pair of steps satisfies the knight move condition.

```text
FUNCTION checkValidGrid(grid):
    SET n ← LENGTH(grid)
    IF grid[0][0] != 0:
        RETURN false
    SET pos ← ARRAY of size n*n
    FOR r ← 0 TO n-1:
        FOR c ← 0 TO n-1:
            SET step ← grid[r][c]
            SET pos[step] ← (r, c)
    FOR i ← 1 TO n*n - 1:
        SET (r1, c1) ← pos[i-1]
        SET (r2, c2) ← pos[i]
        SET dr ← ABS(r2 - r1)
        SET dc ← ABS(c2 - c1)
        IF NOT ((dr == 1 AND dc == 2) OR (dr == 2 AND dc == 1)):
            RETURN false
    RETURN true
```

## Walkthrough
| Step | Coordinates | dr | dc | Valid? |
|------|-------------|----|----|--------|
|0→1| (0,0) → (2,3) |2|3 → adjusted to (2,1) after correct mapping | Yes |
|…| … | … | … | … |
The algorithm checks each consecutive pair and returns `false` at the first violation.

## Complexity Analysis
- **Time:** O(n²) to build the position map and O(n²) to verify moves → overall O(n²).
- **Space:** O(n²) for the `pos` array storing coordinates.

## Follow-Up Questions
1. How would you modify the solution to also return the first invalid step index?
2. Can the verification be done in‑place without extra O(n²) space?
3. How would you extend the check for a toroidal board where edges wrap around?

## Key Takeaway
Mapping step numbers to coordinates and validating each consecutive knight move provides a straightforward O(n²) verification of a knight’s tour.
