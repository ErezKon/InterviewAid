# 1091. Shortest Path in Binary Matrix

**Difficulty:** 🟡 Medium
**Acceptance:** 47.0%
**LeetCode:** [https://leetcode.com/problems/shortest-path-in-binary-matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix)
**Companies:** Airbnb, Amazon, Anduril, Apple, Applied Intuition, Bloomberg, Databricks, Goldman Sachs, Google, Intuit, Meta, Microsoft, Snapchat, Tiktok, Uber, Yahoo

---

## 1. Problem Description

Given an n×n binary grid, return the length of the shortest clear path from top-left to bottom-right. A clear path only visits `0` cells and moves 8-directionally. Return -1 if no path.

---

## 2. Approach: BFS — O(n²) ✅

```
FUNCTION shortestPathBinaryMatrix(grid):
    IF grid[0][0] != 0 OR grid[n-1][n-1] != 0:
        RETURN -1

    queue = [(0, 0, 1)]     // row, col, distance
    grid[0][0] = 1          // mark visited

    dirs = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]

    WHILE queue not empty:
        (r, c, dist) = queue.DEQUEUE()

        IF r == n-1 AND c == n-1:
            RETURN dist

        FOR (dr, dc) IN dirs:
            nr, nc = r + dr, c + dc
            IF in bounds AND grid[nr][nc] == 0:
                grid[nr][nc] = 1
                queue.ENQUEUE((nr, nc, dist + 1))

    RETURN -1
```

| Time | Space |
|------|-------|
| O(n²) | O(n²) |

---

## Key Takeaway

> Standard BFS for shortest path in an unweighted grid. 8-directional instead of 4-directional. A* with Manhattan distance heuristic can speed up in practice.
