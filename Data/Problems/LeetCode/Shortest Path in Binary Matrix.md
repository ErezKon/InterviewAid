# 1091. Shortest Path in Binary Matrix

**Difficulty:** 🟡 Medium
**Acceptance:** 47.0%
**LeetCode:** [https://leetcode.com/problems/shortest-path-in-binary-matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix)
**Companies:** Airbnb, Amazon, Anduril, Apple, Applied Intuition, Bloomberg, Databricks, Goldman Sachs, Google, Intuit, Meta, Microsoft, Snapchat, Tiktok, Uber, Yahoo

---

## Problem Description

Given an n×n binary grid, return the length of the shortest clear path from top-left to bottom-right. A clear path only visits `0` cells and moves 8-directionally. Return -1 if no path.

---

## Approach: BFS — O(n²) ✅

```text
FUNCTION shortestPathBinaryMatrix(grid):
    IF grid[0][0] != 0 OR grid[n-1][n-1] != 0:
        RETURN -1

    queue ← [(0, 0, 1)]   // row, col, distance
    grid[0][0] ← 1        // mark visited
    dirs ← [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]

    WHILE queue NOT EMPTY:
        (r, c, dist) ← DEQUEUE(queue)
        IF r = n-1 AND c = n-1:
            RETURN dist
        FOR (dr, dc) IN dirs:
            nr ← r + dr
            nc ← c + dc
            IF nr IN BOUNDS AND nc IN BOUNDS AND grid[nr][nc] = 0:
                grid[nr][nc] ← 1
                ENQUEUE(queue, (nr, nc, dist + 1))

    RETURN -1
```

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[[0,1,0],[1,0,1],[0,1,0]]` | `4` | Path: (0,0)→(1,1)→(2,0)→(2,2). |
| `[[0,0,0],[1,1,0],[1,1,0]]` | `2` | Direct diagonal from (0,0) to (2,2). |
| `[[1,0,0],[0,1,0],[0,0,1]]` | `-1` | Start or end blocked.

---

## Walkthrough

Take grid `[[0,1,0],[1,0,1],[0,1,0]]`.
1. Start at (0,0) distance 1, enqueue its 8‑neighbors that are `0` → (1,1).
2. Dequeue (1,1) distance 2, its valid neighbors → (0,2), (2,0), (2,2).
3. (2,2) is the target, distance returned = 4.

---

## Complexity Analysis

- **Time:** O(n²) – each cell is visited at most once.
- **Space:** O(n²) – queue and visited marks stored in the grid.

---

## Follow-Up Questions

1. How would you adapt the algorithm for weighted cells (different movement costs)?
2. Can you use A* search with a heuristic to speed up large grids?
3. What changes if only 4‑directional moves are allowed?

---

## Key Takeaway

Standard BFS over an 8‑directional grid finds the shortest clear path in linear time relative to the number of cells.
