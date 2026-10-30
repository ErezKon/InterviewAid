# 3286. Find a Safe Walk Through a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-a-safe-walk-through-a-grid](https://leetcode.com/problems/find-a-safe-walk-through-a-grid)
**Companies:** Bloomberg, Google

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented column-by-column problem. Officially you walk from `(0, 0)` to `(m - 1, n - 1)` in 4 directions and each `1` cell costs 1 health. Correct idea: 0-1 BFS / Dijkstra for the minimum number of unsafe cells on a path (including the start cell); return `health - cost >= 1`.*

You are given an `m x n` binary matrix `grid` and an integer `health`.

You start on the upper-left corner `(0, 0)` and would like to get to the lower-right corner `(m - 1, n - 1)`.

You can move up, down, left, or right from one cell to another adjacent cell as long as your health *remains* **positive**.

Cells `(i, j)` with `grid[i][j] = 1` are considered **unsafe** and reduce your health by 1.

Return `true` if you can reach the final cell with a health value of 1 or more, and `false` otherwise.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `2 <= m * n`
- `1 <= health <= m + n`
- `grid[i][j]` is either 0 or 1.

## Examples

**Example 1:**
```
Input: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]], health = 1
Output: true
Explanation: The final cell can be reached safely by walking along the gray cells below.
```

**Example 2:**
```
Input: grid = [[0,1,1,0,0,0],[1,0,1,0,0,0],[0,1,1,1,0,1],[0,0,1,0,1,0]], health = 3
Output: false
Explanation: A minimum of 4 health points is needed to reach the final cell safely.
```

**Example 3:**
```
Input: grid = [[1,1,1],[1,0,1],[1,1,1]], health = 5
Output: true
Explanation: The final cell can be reached safely by walking along the gray cells below.
Any path that does not go through the cell (1, 1) is unsafe since your health will drop to 0 when reaching the final cell.
```

## Approach
We use dynamic programming column‑by‑column. For each column we keep a boolean array `safeRows` indicating which rows can be reached safely up to that column.
1. Initialise `safeRows` for column 0 with `grid[i][0] == 0`.
2. For each subsequent column `j` compute a new array `nextRows` where `nextRows[i]` is true if `grid[i][j] == 0` **and** any of `safeRows[i-1]`, `safeRows[i]`, `safeRows[i+1]` (within bounds) is true.
3. Replace `safeRows` with `nextRows`. If at any point all entries become false, early‑exit with `false`.
4. After processing the last column, if any entry in `safeRows` is true, return `true`.

### Pseudocode
```text
FUNCTION hasSafeWalk(grid):
    m ← NUMBER OF ROWS(grid)
    n ← NUMBER OF COLUMNS(grid)
    SET safeRows ← ARRAY OF m FALSE
    FOR i ← 0 TO m-1:
        IF grid[i][0] == 0:
            SET safeRows[i] ← TRUE
    FOR j ← 1 TO n-1:
        SET nextRows ← ARRAY OF m FALSE
        FOR i ← 0 TO m-1:
            IF grid[i][j] == 0:
                IF (i > 0 AND safeRows[i-1]) OR safeRows[i] OR (i < m-1 AND safeRows[i+1]):
                    SET nextRows[i] ← TRUE
        SET safeRows ← nextRows
        IF ALL VALUES IN safeRows ARE FALSE:
            RETURN FALSE
    RETURN ANY VALUE IN safeRows IS TRUE
```

## Walkthrough
Consider `grid = [[0,1,0],[0,0,0],[1,0,1]]` (m=3, n=3).
| Column | safeRows (reachable rows) |
|--------|---------------------------|
| 0      | [T, T, F] (rows 0 and 1 are safe) |
| 1      | Row 0: grid[0][1]=1 → F; Row 1: grid[1][1]=0 and reachable from row0/1 → T; Row 2: grid[2][1]=0 but no reachable predecessor → F → [F, T, F] |
| 2      | Row 0: grid[0][2]=0 and reachable from row1 → T; Row 1: grid[1][2]=0 and reachable from row1 → T; Row 2: grid[2][2]=1 → F → [T, T, F] |
Since column 2 has a true entry, the answer is `true`.

## Complexity Analysis
- **Time:** O(m × n) – each cell is examined once.
- **Space:** O(m) – only two boolean arrays of size `m` are stored.

## Follow‑Up Questions
1. How would the solution change if you could also move leftwards?
2. What if the grid is extremely large and stored on disk? Discuss streaming or chunk‑wise processing.
3. Extend the problem to return the actual safe path, not just its existence.

## Key Takeaway
Dynamic programming across columns efficiently captures all possible safe positions, turning a seemingly exponential walk enumeration into a linear‑time solution.
