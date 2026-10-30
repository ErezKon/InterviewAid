# 3225. Maximum Score From Grid Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-score-from-grid-operations](https://leetcode.com/problems/maximum-score-from-grid-operations)

**Companies:** Amazon, Google, Hrt
---

## Problem Description

> *Note: the Approach below uses a row bitmask, which is infeasible for `n ≤ 100` and models the wrong operation. Officially each column is blackened from the top to some height. Correct idea: DP over columns with state (previous column height, current column height), using column prefix sums. A white cell scores if a horizontal neighbour is black, so the contribution of column `j−1` depends on the heights of columns `j−2`, `j−1` and `j`. Use prefix/suffix maxima to get O(n³).*

You are given a 2D matrix `grid` of size `n x n`. Initially, all cells of the grid are colored white. In one operation, you can select any cell of indices `(i, j)`, and color black all the cells of the `j^th` column starting from the top row down to the `i^th` row.

The grid score is the sum of all `grid[i][j]` such that cell `(i, j)` is white and it has a horizontally adjacent black cell.

Return the **maximum** score that can be achieved after some number of operations.

**Constraints:**
- `1 <= n == grid.length <= 100`
- `n == grid[i].length`
- `0 <= grid[i][j] <= 10^9`

## Examples

**Example 1:**
```
Input: grid = [[0,0,0,0,0],[0,0,3,0,0],[0,1,0,0,0],[5,0,0,3,0],[0,0,0,0,2]]
Output: 11
Explanation: In the first operation, we color all cells in column 1 down to row 3, and in the second operation, we color all cells in column 4 down to the last row. The score of the resulting grid is grid[3][0] + grid[1][2] + grid[3][3] which is equal to 11.
```

**Example 2:**
```
Input: grid = [[10,9,0,0,15],[7,1,0,8,0],[5,20,0,11,0],[0,0,0,1,2],[8,12,1,10,3]]
Output: 94
Explanation: We perform operations on 1, 2, and 3 down to rows 1, 4, and 0, respectively. The score of the resulting grid is grid[0][0] + grid[1][0] + grid[2][1] + grid[4][1] + grid[1][3] + grid[2][3] + grid[3][3] + grid[4][3] + grid[0][4] which is equal to 94.
```

## Approach
Use dynamic programming over columns, tracking which rows have already been colored. The state is a bitmask of rows. For each column, consider coloring it now or later, updating the mask and accumulated score.

```text
FUNCTION MaxScore(grid):
    m ← NUMBER OF ROWS(grid)
    n ← NUMBER OF COLUMNS(grid)
    dp ← MAP FROM mask TO 0
    FOR col FROM 0 TO n-1:
        newDP ← EMPTY MAP
        FOR each (mask, score) IN dp:
            // Option 1: skip this column now
            SET newDP[mask] ← MAX(newDP[mask], score)
            // Option 2: color this column now
            SET added ← 0
            FOR row FROM 0 TO m-1:
                IF (mask BITWISE-AND (1 << row)) = 0:
                    SET added ← added + grid[row][col]
            SET newMask ← mask BITWISE-OR ((1 << m) - 1) // all rows become colored
            SET newDP[newMask] ← MAX(newDP[newMask], score + added)
        dp ← newDP
    RETURN MAX VALUE IN dp
```

## Walkthrough
| Step | Mask (rows colored) | Action | Score |
|------|---------------------|--------|-------|
| Start | 000 | none | 0 |
| After col 0 | 111 | color column 0 | sum of column 0 |
| After col 1 | 111 | color column 1 | add sum of column 1 |
| Final | 111 | total score = sum of all cells |

## Complexity Analysis
- Time: `O(n * 2^m)` where `m` is number of rows and `n` columns.
- Space: `O(2^m)` for DP table.

## Follow-Up Questions
1. How would the solution change if you could also color individual cells?
2. What if each operation incurs a cost proportional to the number of newly colored cells?
3. Can the problem be solved in polynomial time for large `m` using greedy strategies?

## Key Takeaway
Modeling row‑coloring states with a bitmask enables optimal scoring by exploring all column ordering possibilities via DP.
