# 1463. Cherry Pickup II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cherry-pickup-ii](https://leetcode.com/problems/cherry-pickup-ii)
**Companies:** Amazon, Flipkart, Google, Meta, Microsoft, Rubrik, Sprinklr

---

## Problem Description
You are given a `rows x cols` matrix `grid` representing a field of cherries where `grid[i][j]` represents the number of cherries that you can collect from the `(i, j)` cell.

You have two robots that can collect cherries for you:

- **Robot #1** is located at the **top-left corner** `(0, 0)`, and
- **Robot #2** is located at the **top-right corner** `(0, cols - 1)`.

Return *the maximum number of cherries collection using both robots by following the rules below*:

- From a cell `(i, j)`, robots can move to cell `(i + 1, j - 1)`, `(i + 1, j)`, or `(i + 1, j + 1)`.
- When any robot passes through a cell, It picks up all cherries, and the cell becomes an empty cell.
- When both robots stay in the same cell, only one takes the cherries.
- Both robots cannot move outside of the grid at any moment.
- Both robots should reach the bottom row in `grid`.

**Constraints:**
- `rows == grid.length`
- `cols == grid[i].length`
- `2 <= rows, cols <= 70`
- `0 <= grid[i][j] <= 100`

## Examples
```
Example 1:
  Input: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
  Output: 24
  Explanation: Cherries taken by Robot #1, (3 + 2 + 5 + 2) = 12.
  Cherries taken by Robot #2, (1 + 5 + 5 + 1) = 12.
  Total of cherries: 12 + 12 = 24.
```

```
Example 2:
  Input: grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]
  Output: 28
  Explanation: Cherries taken by Robot #1, (1 + 9 + 5 + 2) = 17.
  Cherries taken by Robot #2, (1 + 3 + 4 + 3) = 11.
  Total of cherries: 17 + 11 = 28.
```

## Approach
We use 3-dimensional dynamic programming where `dp[r][c1][c2]` stores the maximum cherries collected when robot 1 is at column `c1` and robot 2 at column `c2` on row `r`.

```text
FUNCTION cherryPickup(grid):
    m, n ← dimensions of grid
    dp ← 2-D array of size n×n filled with -∞
    dp[0][n-1] ← grid[0][0] + grid[0][n-1]
    FOR r ← 1 TO m-1:
        newDp ← 2-D array of size n×n filled with -∞
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
Consider the first example grid. After initializing `dp[0][2] = 4`, we iterate row 1 and compute possible positions for both robots, updating `newDp`. Repeating this process row by row eventually yields the maximum value `24` in the final DP table.

## Complexity Analysis
*Time*: `O(m * n²)` – we process `m` rows and for each row examine all `n²` robot position pairs with constant 9 transitions.
*Space*: `O(n²)` – we keep only the DP table for the current row.

## Follow-Up Questions
1. How would the solution change if robots could move more than one column per step?
2. Can the problem be solved with memoized recursion instead of bottom-up DP?
3. What if the grid is extremely large and does not fit in memory?

## Key Takeaway
Modeling two simultaneous agents with a 3-D DP state (`row, col1, col2`) captures all interactions and leads to an optimal solution.
