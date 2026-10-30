# 695. Maximum Area of Island

**Difficulty:** 🟡 Medium
**Acceptance:** 75.0%
**LeetCode:** [https://leetcode.com/problems/max-area-of-island](https://leetcode.com/problems/max-area-of-island)
**Companies:** Amazon, Anduril, Apple, Bloomberg, Doordash, Expedia, Goldman Sachs, Google, Grubhub, Intuit, Linkedin, Meta, Microsoft, Oracle, Roku, Schlumberger, Snowflake, Tiktok, Zoho

---

## 1. Problem Description

You are given an `m x n` binary matrix `grid`. An island is a group of `1`'s (representing land) connected **4-directionally** (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The **area** of an island is the number of cells with a value `1` in the island.

Return *the maximum **area** of an island in *`grid`. If there is no island, return `0`.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `grid[i][j]` is either `0` or `1`.

---

## 2. Approach: DFS — O(m·n) ✅

```text
FUNCTION maxAreaOfIsland(grid):
    maxArea = 0
    FOR r ← 0 TO m-1:
        FOR c ← 0 TO n-1:
            IF grid[r][c] == 1:
                maxArea = MAX(maxArea, dfs(grid, r, c))
    RETURN maxArea

FUNCTION dfs(grid, r, c):
    IF out of bounds OR grid[r][c] != 1: RETURN 0
    grid[r][c] = 0      // mark visited
    RETURN 1 + dfs(grid, r+1, c) + dfs(grid, r-1, c) + dfs(grid, r, c+1) + dfs(grid, r, c-1)
```

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) stack |

---

## Examples

**Example 1:**
```
Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.
```

**Example 2:**
```
Input: grid = [[0,0,0,0,0,0,0,0]]
Output: 0
```

---

## Walkthrough

| Step | Action | Reason |
|------|--------|--------|
| 1 | Iterate over each cell in the grid. | Locate potential island starting points. |
| 2 | When a `1` is found, launch DFS to explore the entire connected component. | Marks all cells of the island and counts its area. |
| 3 | During DFS, set visited cells to `0` to avoid revisiting. | Prevents infinite recursion and double‑counting. |
| 4 | DFS returns the size of the current island; update `maxArea` if larger. | Tracks the largest island seen so far. |
| 5 | Continue scanning the grid until all cells processed. | Ensures all islands are considered. |

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DFS Flood Fill | **O(m·n)** | **O(m·n)** (recursion stack) |

---

## Follow-Up Questions

- How would you modify the algorithm to count the number of distinct islands?
- Can you implement the solution iteratively using a stack or queue to avoid recursion depth limits?
- What changes are needed if diagonal adjacency also counts as connected?

---

## Key Takeaway

> **Use DFS (or BFS) flood fill to explore each island and compute its area, updating the maximum found.**
