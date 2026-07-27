# 2257. Count Unguarded Cells in the Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-unguarded-cells-in-the-grid](https://leetcode.com/problems/count-unguarded-cells-in-the-grid)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Poshmark

---

## Problem Description

Given an `m × n` grid with guards and walls, guards can see in 4 cardinal directions until blocked by a wall or another guard. Count cells that are **not** guarded, not a guard, and not a wall.

---

## Approach

```
FUNCTION countUnguarded(m, n, guards, walls):
    grid = m×n of 0
    FOR [r, c] IN guards: grid[r][c] = 'G'
    FOR [r, c] IN walls: grid[r][c] = 'W'

    FOR [r, c] IN guards:
        FOR (dr, dc) IN 4 directions:
            nr, nc = r + dr, c + dc
            WHILE 0 <= nr < m AND 0 <= nc < n AND grid[nr][nc] NOT IN {'G', 'W'}:
                grid[nr][nc] = 'X'    // guarded
                nr += dr; nc += dc

    RETURN SUM(1 for r, c if grid[r][c] == 0)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n + guards × max(m, n)) |
| **Space** | O(m × n) |

---

## Key Takeaway

> **Simulation: mark guard/wall cells, then ray-cast in 4 directions from each guard. Walls and guards block the ray. Count remaining unmarked cells.**
