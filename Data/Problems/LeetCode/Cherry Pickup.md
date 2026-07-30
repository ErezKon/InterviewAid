# 741. Cherry Pickup

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cherry-pickup](https://leetcode.com/problems/cherry-pickup)
**Companies:** Akuna Capital, Amazon, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Phonepe, Uber

---

## Problem Description
Given an `n x n` grid where each cell contains a number of cherries (or `-1` representing a thorn), a person starts at the top‑left corner, moves to the bottom‑right corner, then returns to the start, collecting cherries on the way. A cherry can be collected at most once. Return the maximum total cherries that can be collected.

## Examples
**Example 1**
```
grid = [[0,1,-1],[1,0,-1],[1,1,1]]
Output: 5
Explanation: Path forward (0,0)->(0,1)->(1,1)->(2,1)->(2,2) collects 4 cherries.
Return path (2,2)->(2,1)->(1,1)->(1,0)->(0,0) collects 1 new cherry.
```

**Example 2**
```
grid = [[1,-1],[1,1]]
Output: 0
Explanation: No valid round‑trip exists because of thorns.
```

## Approach
Model the round‑trip as two people moving simultaneously from `(0,0)` to `(n-1,n-1)`. At step `t` both have taken `t` moves, so their positions are `(r1, c1)` and `(r2, c2)` with `c1 = t‑r1`, `c2 = t‑r2`. Use 3‑D DP `dp[t][r1][r2]` for the maximum cherries collected up to step `t`.

```text
FUNCTION cherryPickup(grid):
    n ← size of grid
    dp ← 3‑D array (2n‑1) × n × n filled with -∞
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

## Follow‑Up Questions
1. How would the solution change if the grid were rectangular (`m x n`)?
2. Can the problem be solved with memoized recursion instead of bottom‑up DP?
3. What if the traveler could move in four directions instead of only right/down?

## Key Takeaway
Viewing the round‑trip as two simultaneous paths enables a clean 3‑D DP formulation that captures overlapping cells and obstacles.
