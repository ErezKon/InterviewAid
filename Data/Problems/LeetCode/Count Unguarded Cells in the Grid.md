# 2257. Count Unguarded Cells in the Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-unguarded-cells-in-the-grid](https://leetcode.com/problems/count-unguarded-cells-in-the-grid)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Poshmark

---

## Problem Description

You are given two integers `m` and `n` representing a **0-indexed** `m x n` grid. You are also given two 2D integer arrays `guards` and `walls` where `guards[i] = [row_i, col_i]` and `walls[j] = [row_j, col_j]` represent the positions of the `i`-th guard and `j`-th wall respectively.

A guard can see **every** cell in the four cardinal directions (north, east, south, or west) starting from their position unless **obstructed** by a wall or another guard. A cell is **guarded** if there is **at least** one guard that can see it.

Return *the number of unoccupied cells that are **not** **guarded**.*

**Constraints:**
- `1 <= m, n <= 10^5`
- `2 <= m * n <= 10^5`
- `1 <= guards.length, walls.length <= 5 * 10^4`
- `2 <= guards.length + walls.length <= m * n`
- `guards[i].length == walls[j].length == 2`
- `0 <= row_i, row_j < m`
- `0 <= col_i, col_j < n`
- All the positions in `guards` and `walls` are **unique**.

---

## Examples

```
Example 1:
  Input: m = 4, n = 6, guards = [[0,0],[1,1],[2,3]], walls = [[0,1],[2,2],[1,4]]
  Output: 7
  Explanation: There are a total of 7 unguarded cells, so we return 7.
```

```
Example 2:
  Input: m = 3, n = 3, guards = [[1,1]], walls = [[0,1],[1,0],[2,1],[1,2]]
  Output: 4
  Explanation: The guard is boxed in by the four walls, so the four corner cells are unguarded. We return 4.
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

**Example 1 step-by-step:**
| Step | Action | Grid state (G=guard, W=wall, X=guarded, 0=empty) |
|------|--------|---------------------------------------------------|
| 1 | Place guards and walls | `[[G,W,0,0,0,0], [0,G,0,0,W,0], [0,0,W,G,0,0], [0,0,0,0,0,0]]` |
| 2 | Guard (0,0) casts rays → marks (0,2-5) and (1,0-5) as X until blocked | ... |
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

> **Simulation: mark guard/wall cells, then ray-cast in 4 directions from each guard. Walls and guards block the ray. Count remaining unmarked cells.**