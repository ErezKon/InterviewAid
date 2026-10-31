# 2087. Minimum Cost Homecoming of a Robot in a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-homecoming-of-a-robot-in-a-grid](https://leetcode.com/problems/minimum-cost-homecoming-of-a-robot-in-a-grid)
**Companies:** Goldman Sachs, Hp, Oracle

---
## Problem Description
There is an `m x n` grid, where `(0, 0)` is the top-left cell and `(m - 1, n - 1)` is the bottom-right cell. You are given an integer array `startPos` where `startPos = [startrow, startcol]` indicates that **initially**, a **robot** is at the cell `(startrow, startcol)`. You are also given an integer array `homePos` where `homePos = [homerow, homecol]` indicates that its **home** is at the cell `(homerow, homecol)`.

The robot needs to go to its home. It can move one cell in four directions: **left**, **right**, **up**, or **down**, and it can not move outside the boundary. Every move incurs some cost. You are further given two **0-indexed** integer arrays: `rowCosts` of length `m` and `colCosts` of length `n`.
- If the robot moves **up** or **down** into a cell whose **row** is `r`, then this move costs `rowCosts[r]`.
- If the robot moves **left** or **right** into a cell whose **column** is `c`, then this move costs `colCosts[c]`.

Return *the **minimum total cost** for this robot to return home*.

**Constraints:**
- `m == rowCosts.length`
- `n == colCosts.length`
- `1 <= m, n <= 10⁵`
- `0 <= rowCosts[r], colCosts[c] <= 10⁴`
- `startPos.length == 2`
- `homePos.length == 2`
- `0 <= startrow, homerow < m`
- `0 <= startcol, homecol < n`

## Examples

```
Example 1:
  Input: startPos = [1, 0], homePos = [2, 3], rowCosts = [5, 4, 3], colCosts = [8, 2, 6, 7]
  Output: 18
  Explanation: One optimal path is that:
  Starting from (1, 0)
  -> It goes down to (2, 0). This move costs rowCosts[2] = 3.
  -> It goes right to (2, 1). This move costs colCosts[1] = 2.
  -> It goes right to (2, 2). This move costs colCosts[2] = 6.
  -> It goes right to (2, 3). This move costs colCosts[3] = 7.
  The total cost is 3 + 2 + 6 + 7 = 18
```

```
Example 2:
  Input: startPos = [0, 0], homePos = [0, 0], rowCosts = [5], colCosts = [26]
  Output: 0
  Explanation: The robot is already at its home. Since no moves occur, the total cost is 0.
```

## Approach
**Algorithm:** Direct sum of row and column costs
Since each row/column has a fixed traversal cost, any path from start to home incurs the same total cost: the sum of `rowCosts` for all rows between `sr` and `hr` (exclusive of the start row) plus the sum of `colCosts` for all columns between `sc` and `hc`.

```text
FUNCTION minCost(startPos, homePos, rowCosts, colCosts):
    sr ← startPos[0]
    sc ← startPos[1]
    hr ← homePos[0]
    hc ← homePos[1]
    total ← 0
    // rows
    step ← 1 IF hr > sr ELSE -1
    FOR r ← sr + step TO hr STEP step:
        total ← total + rowCosts[r]
    // columns
    step ← 1 IF hc > sc ELSE -1
    FOR c ← sc + step TO hc STEP step:
        total ← total + colCosts[c]
    RETURN total
```

## Walkthrough
For `startPos = [1,1]`, `homePos = [3,5]`:
- Row step = +1: add `rowCosts[2] = 3` and `rowCosts[3] = 1` → row sum = 4.
- Column step = +1: add `colCosts[2] = 2`, `colCosts[3] = 1`, `colCosts[4] = 3`, `colCosts[5] = ?` (if exists) → column sum = 8 (example assumes appropriate values). Total = 12.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(|hr-sr| + |hc-sc|) – linear in the number of traversed rows and columns |
| Space  | O(1) |

## Follow-Up Questions
1. How would the solution change if moving diagonally were allowed with its own cost matrix?
2. If row and column costs could be negative, what precautions are needed to avoid cycles?
3. Can you extend the approach to compute the minimum cost for multiple robots moving simultaneously without collisions?

## Key Takeaway
When each row and column has a fixed traversal cost, the total cost from start to home is path-independent and equals the sum of costs for all intermediate rows and columns.
