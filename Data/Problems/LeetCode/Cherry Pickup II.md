# 1463. Cherry Pickup II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cherry-pickup-ii](https://leetcode.com/problems/cherry-pickup-ii)
**Companies:** Amazon, Flipkart, Google, Meta, Microsoft, Rubrik, Sprinklr

---

## Problem Description
Two robots start at the top row of an `m x n` grid of cherries. Robot 1 starts at column 0 and robot 2 at column `n-1`. Each robot moves down one row at a time and may shift left, stay, or shift right by one column. When a robot lands on a cell, it collects all cherries in that cell. If both robots land on the same cell, cherries are counted only once. Return the maximum total cherries both robots can collect.

## Examples
**Example 1**
```
grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
Output: 24
Explanation: Path of robot1: (0,0)->(1,0)->(2,0)->(3,0)
Path of robot2: (0,2)->(1,2)->(2,2)->(3,2)
Total cherries = 3+2+1+2 + 1+1+5+1 = 24
```

**Example 2**
```
grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]
Output: 5
```

## Approach
We use 3‑dimensional dynamic programming where `dp[r][c1][c2]` stores the maximum cherries collected when robot 1 is at column `c1` and robot 2 at column `c2` on row `r`.

```text
FUNCTION cherryPickup(grid):
    m, n ← dimensions of grid
    dp ← 2‑D array of size n×n filled with -∞
    dp[0][n-1] ← grid[0][0] + grid[0][n-1]
    FOR r ← 1 TO m-1:
        newDp ← 2‑D array of size n×n filled with -∞
        FOR c1 ← 0 TO n-1:
            FOR c2 ← 0 TO n-1:
                IF dp[c1][c2] = -∞: CONTINUE
                FOR dc1 IN [-1,0,1]:
                    FOR dc2 IN [-1,0,1]:
                        nc1 ← c1 + dc1; nc2 ← c2 + dc2
                        IF 0 ≤ nc1 < n AND 0 ≤ nc2 < n:
                            cherries ← grid[r][nc1]
                            IF nc1 ≠ nc2: cherries ← cherries + grid[r][nc2]
                            newDp[nc1][nc2] ← MAX(newDp[nc1][nc2], dp[c1][c2] + cherries)
        dp ← newDp
    RETURN MAX value in dp
```

## Walkthrough
Consider the first example grid. After initializing `dp[0][2] = 4`, we iterate row 1 and compute possible positions for both robots, updating `newDp`. Repeating this process row by row eventually yields the maximum value `24` in the final DP table.

## Complexity Analysis
*Time*: `O(m * n²)` – we process `m` rows and for each row examine all `n²` robot position pairs with constant 9 transitions.
*Space*: `O(n²)` – we keep only the DP table for the current row.

## Follow‑Up Questions
1. How would the solution change if robots could move more than one column per step?
2. Can the problem be solved with memoized recursion instead of bottom‑up DP?
3. What if the grid is extremely large and does not fit in memory?

## Key Takeaway
Modeling two simultaneous agents with a 3‑D DP state (`row, col1, col2`) captures all interactions and leads to an optimal solution.
