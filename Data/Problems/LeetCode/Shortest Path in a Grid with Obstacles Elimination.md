# 1293. Shortest Path in a Grid with Obstacles Elimination

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination)
**Companies:** Adobe, Amazon, Appfolio, Bloomberg, Databricks, Google, Imc, Meta, Nuro, Oracle, Pinterest, Snapchat, Tiktok, Uber

---

## Problem Description

You are given an `m x n` integer matrix `grid` where each cell is either `0` (empty) or `1` (obstacle). You can move up, down, left, or right from and to an empty cell in **one step**.

Return *the minimum number of **steps** to walk from the upper left corner* `(0, 0)` *to the lower right corner* `(m - 1, n - 1)` *given that you can eliminate **at most*** `k` *obstacles*. If it is not possible to find such walk return `-1`.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 40`
- `1 <= k <= m * n`
- `grid[i][j]` is either `0` **or** `1`.
- `grid[0][0] == grid[m - 1][n - 1] == 0`

---

## Approach: BFS with State (r, c, remaining) — O(m·n·k) ✅

```text
FUNCTION shortestPath(grid, k):
    m, n = dimensions of grid
    IF m = 1 AND n = 1: RETURN 0

    queue ← [(0, 0, k, 0)]   // row, col, remaining eliminations, steps
    visited ← {(0, 0, k)}

    WHILE queue NOT EMPTY:
        (r, c, rem, steps) ← DEQUEUE(queue)
        FOR (dr, dc) IN [(1,0),(-1,0),(0,1),(0,-1)]:
            nr ← r + dr
            nc ← c + dc
            IF nr OUT OF BOUNDS OR nc OUT OF BOUNDS: CONTINUE

            newRem ← rem - grid[nr][nc]
            IF newRem < 0: CONTINUE

            IF nr = m-1 AND nc = n-1: RETURN steps + 1

            IF (nr, nc, newRem) NOT IN visited:
                visited.ADD((nr, nc, newRem))
                ENQUEUE(queue, (nr, nc, newRem, steps + 1))

    RETURN -1
```

State includes remaining eliminations; revisiting a cell with more eliminations left is a distinct state.

---

## Examples

**Example 1:**
```
Input: grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], k = 1
Output: 6
Explanation:
The shortest path without eliminating any obstacle is 10.
The shortest path with one obstacle elimination at position (3,2) is 6. Such path is (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) -> (3,2) -> (4,2).
```

**Example 2:**
```
Input: grid = [[0,1,1],[1,1,1],[1,0,0]], k = 1
Output: -1
Explanation: We need to eliminate at least two obstacles to find such a walk.
```

---

## Walkthrough

Take the first example grid with `k = 1`.
1. Start at (0,0) with 1 elimination left.
2. Move right to (0,1) which is an obstacle; eliminate it → remaining 0.
3. Continue down to (1,1) (obstacle) – cannot because no eliminations left, so instead move down from (0,1) to (1,1) is blocked. The BFS explores alternative routes such as (0,0)→(1,0) (obstacle) eliminating it, then proceeds.
4. The algorithm eventually reaches (2,2) in 6 steps, the shortest possible with at most one elimination.

---

## Complexity Analysis

- **Time:** O(m·n·k) – each cell can be visited with each possible remaining elimination count.
- **Space:** O(m·n·k) – storing visited states (row, col, remaining).

---

## Follow-Up Questions

1. How would the solution change if you could eliminate obstacles at a cost rather than a fixed count?
2. Can you adapt the algorithm to return the actual path taken?
3. What is the impact on complexity if `k` is larger than `m·n`?

---

## Key Takeaway

Modeling the problem as BFS over a state space that includes remaining obstacle eliminations allows finding the shortest path while respecting the elimination limit.
