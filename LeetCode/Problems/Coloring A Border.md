# 1034. Coloring A Border

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/coloring-a-border](https://leetcode.com/problems/coloring-a-border)
**Companies:** Bookingcom, Google, Microsoft
---

## Problem Description
Given a 2D grid of integers, a starting cell `(row, col)`, and a new color, recolor all cells on the border of the connected component containing the starting cell. A border cell is one that is on the grid edge or has a neighbor with a different color. Return the modified grid.

## Examples
- **Example 1:** `grid = [[1,1],[1,2]]`, `row = 0`, `col = 0`, `color = 3` → output `[[3,3],[3,2]]`.
- **Example 2:** `grid = [[1,2,2],[2,3,2]]`, `row = 0`, `col = 1`, `color = 1` → output `[[1,1,1],[2,3,1]]`.

## Approach
1. Perform DFS/BFS from the starting cell to identify the connected component of the original color.
2. For each visited cell, check its four neighbors; if any neighbor is out of bounds or has a different color, mark the cell as a border.
3. After traversal, recolor all marked border cells to the new color.

### Pseudocode
```text
FUNCTION colorBorder(grid, row, col, newColor):
    m ← NUMBER_OF_ROWS(grid); n ← NUMBER_OF_COLUMNS(grid)
    origColor ← grid[row][col]
    visited ← SET()
    border ← SET()

    FUNCTION dfs(r, c):
        IF (r, c) IN visited: RETURN
        visited.ADD((r, c))
        isBorder ← FALSE
        FOR (nr, nc) IN [(r-1,c),(r+1,c),(r,c-1),(r,c+1)]:
            IF nr < 0 OR nr >= m OR nc < 0 OR nc >= n OR grid[nr][nc] != origColor:
                isBorder ← TRUE
            ELSE:
                dfs(nr, nc)
        IF isBorder: border.ADD((r, c))

    dfs(row, col)
    FOR (r, c) IN border:
        grid[r][c] ← newColor
    RETURN grid
```

## Walkthrough
For `grid = [[1,1],[1,2]]` starting at `(0,0)`:
1. DFS visits cells `(0,0)`, `(0,1)`, `(1,0)` (all color 1).
2. `(0,1)` touches a different color `2` → border.
3. `(1,0)` is on grid edge → border.
4. `(0,0)` also on edge → border.
5. Recolor these three cells to `3` → `[[3,3],[3,2]]`.

## Complexity Analysis
Time: O(m·n) – each cell visited at most once.
Space: O(m·n) for recursion stack / visited set.

## Follow-Up Questions
- How would you modify the algorithm to return the size of the border instead of recoloring?
- Can the solution be implemented iteratively with a queue to avoid recursion depth limits?
- What changes are needed if diagonal neighbors also count as connectivity?

---

## Key Takeaway

> A flood‑fill traversal combined with neighbor checks cleanly isolates border cells, allowing an in‑place recolor in linear time.
