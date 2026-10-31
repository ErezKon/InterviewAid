# 1091. Shortest Path in Binary Matrix

**Difficulty:** 🟡 Medium
**Acceptance:** 47.0%
**LeetCode:** [https://leetcode.com/problems/shortest-path-in-binary-matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix)
**Companies:** Airbnb, Amazon, Anduril, Apple, Applied Intuition, Bloomberg, Databricks, Goldman Sachs, Google, Intuit, Meta, Microsoft, Snapchat, Tiktok, Uber, Yahoo

---

## Problem Description

Given an `n x n` binary matrix `grid`, return *the length of the shortest **clear path** in the matrix*. If there is no clear path, return `-1`.

A **clear path** in a binary matrix is a path from the **top-left** cell (i.e., `(0, 0)`) to the **bottom-right** cell (i.e., `(n - 1, n - 1)`) such that:

- All the visited cells of the path are `0`.
- All the adjacent cells of the path are **8-directionally** connected (i.e., they are different and they share an edge or a corner).

The **length of a clear path** is the number of visited cells of this path.

**Constraints:**
- `n == grid.length`
- `n == grid[i].length`
- `1 <= n <= 100`
- `grid[i][j] is 0 or 1`

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

**Example 1:**
```
Input: grid = [[0,1],[1,0]]
Output: 2
```

**Example 2:**
```
Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4
```

**Example 3:**
```
Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: -1
```

---

## Walkthrough

Take grid `[[0,1,0],[1,0,1],[0,1,0]]`.
1. Start at (0,0) distance 1, enqueue its 8-neighbors that are `0` → (1,1).
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
3. What changes if only 4-directional moves are allowed?

---

## Key Takeaway

Standard BFS over an 8-directional grid finds the shortest clear path in linear time relative to the number of cells.
