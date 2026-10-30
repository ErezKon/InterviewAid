# 980. Unique Paths III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/unique-paths-iii](https://leetcode.com/problems/unique-paths-iii)
**Companies:** Amazon, Bloomberg, Databricks, Goldman Sachs, Google, Meta, Microsoft

---

## Problem Description

You are given an `m x n` integer array `grid` where `grid[i][j]` could be:

- `1` representing the starting square. There is exactly one starting square.
- `2` representing the ending square. There is exactly one ending square.
- `0` representing empty squares we can walk over.
- `-1` representing obstacles that we cannot walk over.

Return *the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once*.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 20`
- `1 <= m * n <= 20`
- `-1 <= grid[i][j] <= 2`
- There is exactly one starting cell and one ending cell.

## Examples

**Example 1:**
```
Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
Output: 2
Explanation: We have the following two paths:
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)
```

**Example 2:**
```
Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]
Output: 4
Explanation: We have the following four paths:
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)
```

**Example 3:**
```
Input: grid = [[0,1],[2,0]]
Output: 0
Explanation: There is no path that walks over every empty square exactly once.
Note that the starting and ending square can be anywhere in the grid.
```

## Approach
Backtracking – explore all possible moves from the current cell, marking cells as visited, and backtrack when a dead‑end is reached.

```text
FUNCTION uniquePathsIII(grid):
    rows ← number of rows in grid
    cols ← number of columns in grid
    empty ← 0
    startRow, startCol ← 0, 0
    FOR r ← 0 TO rows - 1:
        FOR c ← 0 TO cols - 1:
            IF grid[r][c] == 1:
                startRow ← r; startCol ← c
            IF grid[r][c] != -1:
                empty += 1               // count non‑obstacle cells
    count ← 0

    FUNCTION dfs(r, c, remaining):
        IF grid[r][c] == 2:
            IF remaining == 1: count += 1   // all cells visited
            RETURN
        temp ← grid[r][c]
        grid[r][c] ← -1                     // mark visited
        FOR (nr, nc) IN [(r+1,c),(r-1,c),(r,c+1),(r,c-1)]:
            IF 0 ≤ nr < rows AND 0 ≤ nc < cols AND grid[nr][nc] != -1:
                dfs(nr, nc, remaining - 1)
        grid[r][c] ← temp                    // backtrack

    dfs(startRow, startCol, empty)
    RETURN count
```

## Walkthrough
For the first example, the algorithm starts at `(0,0)`. It recursively explores four directions, pruning paths that hit obstacles or revisit cells. Only two complete traversals reach `(2,2)` after covering all 7 non‑obstacle cells.

## Complexity Analysis
Time: O(4^{m·n}) in the worst case (explores every permutation of moves). Practical input sizes are limited by constraints.
Space: O(m·n) recursion stack plus the grid itself.

## Follow‑Up Questions
* How can memoization be applied to reduce repeated sub‑problems?
* What changes if diagonal moves are allowed?
* Can the solution be adapted to count paths modulo `10^9+7` for large grids?

## Key Takeaway
Backtracking systematically tries every possible ordering of moves, ensuring each non‑obstacle cell is visited exactly once, which is essential for Hamiltonian‑path‑style grid problems.
