# 3225. Maximum Score From Grid Operations

**Difficulty:** 🔴 Hard

**Companies:** Amazon, Google, Hrt
---

## Problem Description
You are given an `m x n` grid of integers. In one operation you may select a row or a column and add the sum of its uncolored cells to your score, then mark all cells in that row or column as colored. Operations can be performed in any order until all cells are colored. Return the maximum possible total score.

## Examples
**Example 1:**
```
grid = [[1,2],[3,4]]
Maximum score = 1+2+3+4 = 10
```
*Choosing rows first yields the same total as choosing columns.*

**Example 2:**
```
grid = [[5,1,3],[2,4,6]]
Maximum score = 5+1+3+2+4+6 = 21
```
*Optimal order colors each row after all columns are colored, accumulating the full sum.*

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
