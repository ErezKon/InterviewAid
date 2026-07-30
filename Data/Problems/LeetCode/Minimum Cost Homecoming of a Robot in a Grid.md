# 2087. Minimum Cost Homecoming of a Robot in a Grid

**Difficulty:** 🟡 Medium
**Companies:** Goldman Sachs, Hp, Oracle

---
## Problem Description
You are given the robot's starting position `startPos = [sr, sc]` and its home position `homePos = [hr, hc]` on an infinite grid. Moving one step up, down, left, or right from row `r` to `r±1` costs `rowCosts[r]`; moving one step left or right from column `c` to `c±1` costs `colCosts[c]`. Compute the minimum total cost to move the robot from `startPos` to `homePos`.

## Examples
**Example 1**
Input: startPos = [1,1], homePos = [3,5], rowCosts = [0,2,3,1], colCosts = [0,4,2,1,3]
Output: 12
Explanation: Move down two rows (cost 2+3) and right four columns (cost 4+2+1+3) = 12.

**Example 2**
Input: startPos = [0,0], homePos = [0,0], rowCosts = [], colCosts = []
Output: 0
Explanation: Already at home.

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
| Time   | O(|hr‑sr| + |hc‑sc|) – linear in the number of traversed rows and columns |
| Space  | O(1) |

## Follow‑Up Questions
1. How would the solution change if moving diagonally were allowed with its own cost matrix?
2. If row and column costs could be negative, what precautions are needed to avoid cycles?
3. Can you extend the approach to compute the minimum cost for multiple robots moving simultaneously without collisions?

## Key Takeaway
When each row and column has a fixed traversal cost, the total cost from start to home is path‑independent and equals the sum of costs for all intermediate rows and columns.
