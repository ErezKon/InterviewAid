# 741. Cherry Pickup

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cherry-pickup](https://leetcode.com/problems/cherry-pickup)
**Companies:** Akuna Capital, Amazon, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Phonepe, Uber

---

## Problem Description
You are given an `n x n` `grid` representing a field of cherries, each cell is one of three possible integers.

- `0` means the cell is empty, so you can pass through,
- `1` means the cell contains a cherry that you can pick up and pass through, or
- `-1` means the cell contains a thorn that blocks your way.

Return *the maximum number of cherries you can collect by following the rules below*:

- Starting at the position `(0, 0)` and reaching `(n - 1, n - 1)` by moving right or down through valid path cells (cells with value `0` or `1`).
- After reaching `(n - 1, n - 1)`, returning to `(0, 0)` by moving left or up through valid path cells.
- When passing through a path cell containing a cherry, you pick it up, and the cell becomes an empty cell `0`.
- If there is no valid path between `(0, 0)` and `(n - 1, n - 1)`, then no cherries can be collected.

**Constraints:**
- `n == grid.length`
- `n == grid[i].length`
- `1 <= n <= 50`
- `grid[i][j]` is `-1`, `0`, or `1`.
- `grid[0][0] != -1`
- `grid[n - 1][n - 1] != -1`

## Examples
```
Example 1:
  Input: grid = [[0,1,-1],[1,0,-1],[1,1,1]]
  Output: 5
  Explanation: The player started at (0, 0) and went down, down, right right to reach (2, 2).
  4 cherries were picked up during this single trip, and the matrix becomes [[0,1,-1],[0,0,-1],[0,0,0]].
  Then, the player went left, up, up, left to return home, picking up one more cherry.
  The total number of cherries picked up is 5, and this is the maximum possible.
```

```
Example 2:
  Input: grid = [[1,1,-1],[1,-1,1],[-1,1,1]]
  Output: 0
```

## Approach
Model the round-trip as two people moving simultaneously from `(0,0)` to `(n-1,n-1)`. At step `t` both have taken `t` moves, so their positions are `(r1, c1)` and `(r2, c2)` with `c1 = t-r1`, `c2 = t-r2`. Use 3-D DP `dp[t][r1][r2]` for the maximum cherries collected up to step `t`.

```text
FUNCTION cherryPickup(grid):
    n ← size of grid
    dp ← 3-D array (2n-1) × n × n filled with -∞
    dp[0][0][0] ← grid[0][0]
    FOR t ← 1 TO 2*n - 2:
        FOR r1 ← MAX(0, t-n+1) TO MIN(n-1, t):
            FOR r2 ← MAX(0, t-n+1) TO MIN(n-1, t):
                c1 ← t - r1; c2 ← t - r2
                IF grid[r1][c1] = -1 OR grid[r2][c2] = -1: CONTINUE
                cherries ← grid[r1][c1]
                IF r1 ≠ r2: cherries ← cherries + grid[r2][c2]
                bestPrev ← -∞
                FOR dr1 IN [0, -1]:
                    FOR dr2 IN [0, -1]:
                        pr1 ← r1 + dr1; pr2 ← r2 + dr2
                        IF 0 ≤ pr1 < n AND 0 ≤ pr2 < n:
                            bestPrev ← MAX(bestPrev, dp[t-1][pr1][pr2])
                dp[t][r1][r2] ← bestPrev + cherries
    RETURN MAX(0, dp[2*n-2][n-1][n-1])
```

## Walkthrough
For the first example, `dp[0][0][0] = 0`. At `t=1`, possible positions are `(0,1)` and `(1,0)` for each traveler; we update `dp[1]` accordingly. Continuing row by row, the DP table accumulates the best cherry counts, finally yielding `5` at `dp[4][2][2]`.

## Complexity Analysis
*Time*: `O(n³)` – three nested loops over `t`, `r1`, `r2`.
*Space*: `O(n³)` naïve, but can be reduced to `O(n²)` by keeping only the previous `t` layer.

## Follow-Up Questions
1. How would the solution change if the grid were rectangular (`m x n`)?
2. Can the problem be solved with memoized recursion instead of bottom-up DP?
3. What if the traveler could move in four directions instead of only right/down?

## Key Takeaway
Viewing the round-trip as two simultaneous paths enables a clean 3-D DP formulation that captures overlapping cells and obstacles.
