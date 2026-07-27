# 1034. Coloring A Border

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/coloring-a-border](https://leetcode.com/problems/coloring-a-border)
**Companies:** Bookingcom, Google, Microsoft

---

```
FUNCTION colorBorder(grid, row, col, color):
    m, n = dimensions; origColor = grid[row][col]
    visited = set(); border = []

    FUNCTION dfs(r, c):
        IF (r, c) IN visited: RETURN
        visited.ADD((r, c))
        isBorder = false
        FOR (nr, nc) IN neighbors:
            IF nr < 0 OR nr >= m OR nc < 0 OR nc >= n OR grid[nr][nc] != origColor:
                isBorder = true
            ELSE: dfs(nr, nc)
        IF isBorder: border.ADD((r, c))

    dfs(row, col)
    FOR r, c IN border: grid[r][c] = color
    RETURN grid
```
