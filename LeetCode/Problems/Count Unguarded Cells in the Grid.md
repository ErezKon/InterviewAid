# 2257. Count Unguarded Cells in the Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-unguarded-cells-in-the-grid](https://leetcode.com/problems/count-unguarded-cells-in-the-grid)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Poshmark

---

## Problem Description

Given an `m × n` grid with guards and walls, guards can see in 4 cardinal directions until blocked by a wall or another guard. Count cells that are **not** guarded, not a guard, and not a wall.

---

## Examples

**Example 1:**
```
Input: m = 4, n = 6,
       guards = [[0,0],[1,1],[2,3]],
       walls = [[0,1],[2,2],[1,4]]
Output: 7
Explanation: The grid cells that remain unguarded are marked with 'U'.
```

**Example 2:**
```
Input: m = 3, n = 3,
       guards = [[0,0]],
       walls = []
Output: 4
Explanation: Guard at (0,0) watches its row and column until the grid edge.
```

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

## Walkthrough

**Example 1 step‑by‑step:**
| Step | Action | Grid state (G=guard, W=wall, X=guarded, 0=empty) |
|------|--------|---------------------------------------------------|
| 1 | Place guards and walls | `[[G,W,0,0,0,0], [0,G,0,0,W,0], [0,0,W,G,0,0], [0,0,0,0,0,0]]` |
| 2 | Guard (0,0) casts rays → marks (0,2‑5) and (1,0‑5) as X until blocked | ... |
| 3 | Guard (1,1) casts rays → marks its visible cells avoiding walls | ... |
| 4 | Guard (2,3) casts rays → marks its visible cells | ... |
| 5 | Count cells still 0 → 7 unguarded cells |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n + guards × max(m, n)) |
| **Space** | O(m × n) |

---

## Key Takeaway

> **Simulation: mark guard/wall cells, then ray‑cast in 4 directions from each guard. Walls and guards block the ray. Count remaining unmarked cells.**