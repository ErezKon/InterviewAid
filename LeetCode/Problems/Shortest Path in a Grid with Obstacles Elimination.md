# 1293. Shortest Path in a Grid with Obstacles Elimination

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination)
**Companies:** Adobe, Amazon, Appfolio, Bloomberg, Databricks, Google, Imc, Meta, Nuro, Oracle, Pinterest, Snapchat, Tiktok, Uber

---

## Problem Description

Given an `m×n` grid with obstacles (1) and empty cells (0), find the shortest path from top-left to bottom-right. You can eliminate at most `k` obstacles.

---

## Approach: BFS with State (r, c, remaining) — O(m·n·k) ✅

```
FUNCTION shortestPath(grid, k):
    m, n = dimensions
    IF m == 1 AND n == 1: RETURN 0

    queue = [(0, 0, k, 0)]    // (r, c, remaining eliminations, steps)
    visited = {(0, 0, k)}

    WHILE queue:
        (r, c, rem, steps) = queue.DEQUEUE()

        FOR (nr, nc) IN 4 directions:
            IF out of bounds: CONTINUE

            newRem = rem - grid[nr][nc]
            IF newRem < 0: CONTINUE

            IF nr == m-1 AND nc == n-1: RETURN steps + 1

            IF (nr, nc, newRem) NOT IN visited:
                visited.ADD((nr, nc, newRem))
                queue.ENQUEUE((nr, nc, newRem, steps + 1))

    RETURN -1
```

State includes remaining eliminations. Same cell with more eliminations left is a different state.
