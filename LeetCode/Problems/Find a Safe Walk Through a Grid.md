# 3286. Find a Safe Walk Through a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-a-safe-walk-through-a-grid](https://leetcode.com/problems/find-a-safe-walk-through-a-grid)
**Companies:** Bloomberg, Google

---

## Problem Description
You are given a binary matrix `grid` of size `m x n` where `grid[i][j] = 0` denotes a safe cell and `grid[i][j] = 1` denotes an unsafe cell. You may start from **any** safe cell in the first column (`j = 0`). From a cell `(i, j)` you can move to the next column (`j + 1`) to one of the three possible rows: `i‑1`, `i`, or `i+1` (if they exist). The walk is **safe** if every visited cell is safe (`0`). Return `true` if there exists at least one safe walk that reaches the last column, otherwise return `false`.

## Examples
**Example 1**
```
Input: grid = [[0,1,0],[0,0,0],[1,0,1]]
Output: true
Explanation: Start at (1,0) → (1,1) → (1,2). All cells are safe.
```

**Example 2**
```
Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: false
Explanation: No safe cell in the first column, so a walk is impossible.
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
