# 2684. Maximum Number of Moves in a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-moves-in-a-grid](https://leetcode.com/problems/maximum-number-of-moves-in-a-grid)
**Companies:** Accenture, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **0-indexed** `m x n` matrix `grid` consisting of **positive** integers.

You can start at **any** cell in the first column of the matrix, and traverse the grid in the following way:

- From a cell `(row, col)`, you can move to any of the cells: `(row - 1, col + 1)`, `(row, col + 1)` and `(row + 1, col + 1)` such that the value of the cell you move to, should be **strictly** bigger than the value of the current cell.

Return *the **maximum** number of **moves** that you can perform.*

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `2 <= m, n <= 1000`
- `4 <= m * n <= 10^5`
- `1 <= grid[i][j] <= 10^6`

---

## Examples

```
Example 1:
  Input: grid = [[2,4,3,5],[5,4,9,3],[3,4,2,11],[10,9,13,15]]
  Output: 3
  Explanation: We can start at the cell (0, 0) and make the following moves:
    - (0, 0) -> (0, 1).
    - (0, 1) -> (1, 2).
    - (1, 2) -> (2, 3).
    It can be shown that it is the maximum number of moves that can be made.
```

```
Example 2:
  Input: grid = [[3,2,4],[2,1,9],[1,1,7]]
  Output: 0
  Explanation: Starting from any cell in the first column we cannot perform any moves.
```

---

## Key Insight

> **BFS/DP column by column**: process columns left to right. `dp[r][c]` = max moves to reach `(r, c)`. For each cell, check 3 predecessors in the previous column with strictly smaller values.

---

## Approach

```
FUNCTION maxMoves(grid)
    m, n ← dimensions
    dp ← m × n matrix, all -1
    // Initialize column 0
    FOR r ← 0 TO m-1 DO
        dp[r][0] ← 0

    result ← 0

    FOR c ← 1 TO n-1 DO
        FOR r ← 0 TO m-1 DO
            FOR dr IN [-1, 0, 1] DO
                pr ← r + dr    // predecessor row
                IF 0 ≤ pr < m AND dp[pr][c-1] ≥ 0 AND grid[r][c] > grid[pr][c-1] THEN
                    dp[r][c] ← MAX(dp[r][c], dp[pr][c-1] + 1)
                    result ← MAX(result, dp[r][c])

    RETURN result
END FUNCTION
```

---

## Walkthrough

```
grid = [[2,4,3,5],
        [5,4,9,3],
        [3,4,2,11],
        [10,9,13,15]]
```

Column 0: all cells start with dp=0.

Column 1: (0,1)=4>2 → dp=1; (1,1)=4<5 ❌ from (1,0), 4>2 ✓ from (0,0) → dp=1; (2,1)=4>3 → dp=1; (3,1)=9<10 ❌

Column 2: (1,2)=9>4 from (0,1) or (1,1) → dp=2; (3,2)=13>9? from (3,1)=-1, from (2,1)=1: 13>4 → dp=2

Column 3: (2,3)=11>2 from (2,2) (dp=-1), from (1,2)=2: 11>9 → dp=**3**; (3,3)=15>13 from (3,2)=2 → dp=**3**

**Result: 3** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(m × n)** — each cell checked with 3 predecessors |
| Space  | **O(m × n)** — dp table (can optimize to O(m)) |

---

## Follow-Up Questions

1. **Could BFS work instead of DP?**
   Yes — BFS from all column-0 cells, expanding right. Same complexity.

2. **What if moves could go left too?**
   Would need full BFS/DFS since the problem becomes graph traversal.

3. **What if we wanted maximum sum path instead of max moves?**
   Same DP structure but accumulate grid values.

---

## Key Takeaway

> **Column-wise DP** — process left to right, each cell considers 3 predecessors. O(mn) time gives the longest strictly increasing path moving rightward.
