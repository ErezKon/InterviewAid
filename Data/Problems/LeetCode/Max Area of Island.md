# 695. Max Area of Island

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/max-area-of-island](https://leetcode.com/problems/max-area-of-island)
**Companies:** Amazon, Anduril, Apple, Bloomberg, Doordash, Expedia, Goldman Sachs, Google, Grubhub, Intuit, Linkedin, Meta, Microsoft, Oracle, Roku, Schlumberger, Snowflake, Tiktok, Zoho

---

## Problem Description
Given an `n × m` binary grid `grid` where `1` represents land and `0` represents water, return the area (number of cells) of the largest island. An island is a group of `1`s connected 4‑directionally.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[[0,0,1,0],[1,1,1,0],[0,1,0,0]]` | `5` | The central island contains 5 cells. |
| `[[0,0,0],[0,0,0]]` | `0` | No land cells, so area is 0.

## Approach
Perform a depth‑first search (DFS) or breadth‑first search (BFS) to label each island and count its cells. Iterate over the grid, launching a flood‑fill whenever an unvisited `1` is found, accumulating the size.

```text
FUNCTION maxAreaOfIsland(grid):
    n ← LENGTH(grid)
    m ← LENGTH(grid[0])
    visited ← SET
    maxArea ← 0
    FOR r FROM 0 TO n-1:
        FOR c FROM 0 TO m-1:
            IF grid[r][c] = 1 AND (r,c) NOT IN visited:
                area ← dfs(grid, r, c, visited)
                maxArea ← MAX(maxArea, area)
    RETURN maxArea

FUNCTION dfs(grid, r, c, visited):
    IF r < 0 OR r ≥ n OR c < 0 OR c ≥ m OR grid[r][c] = 0 OR (r,c) IN visited:
        RETURN 0
    ADD (r,c) TO visited
    size ← 1
    FOR (nr, nc) IN fourNeighbors(r, c, n, m):
        size ← size + dfs(grid, nr, nc, visited)
    RETURN size
```
`fourNeighbors` yields the four orthogonal adjacent cells.

## Walkthrough
For the first example, the DFS started at cell (0,2) discovers cells (0,2),(1,2),(1,1),(1,0),(2,1) – total 5, which becomes the maximum.

## Complexity Analysis
*Time*: **O(n·m)** – each cell is visited at most once.
*Space*: **O(n·m)** for the visited set (or in‑place marking).

## Follow‑Up Questions
1. How would you modify the algorithm to return the coordinates of the largest island?
2. Can the solution be adapted to count islands with diagonal connections?
3. What changes are needed if the grid is extremely large and cannot fit in memory?

## Key Takeaway
A simple flood‑fill (DFS/BFS) efficiently computes island areas by exploring each connected component exactly once.
