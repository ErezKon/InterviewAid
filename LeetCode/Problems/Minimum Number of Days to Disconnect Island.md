# 1568. Minimum Number of Days to Disconnect Island

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island](https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island)
**Companies:** Amazon, Argo Ai, Bloomberg, Google

---

## Problem Description

You are given a 2‑D grid `grid` of size `m × n` where `grid[i][j]` is `1` for land and `0` for water. An **island** is a group of adjacent land cells connected horizontally or vertically. In one day you may change any single land cell (`1`) to water (`0`). Return the minimum number of days required to make the grid contain **zero** or **more than one** island.

Constraints:
- `1 ≤ m, n ≤ 30`
- `grid[i][j] ∈ {0,1}`

## Examples

**Example 1**
```
Input: grid = [[1,1],[1,1]]
Output: 2
Explanation: The grid is a single 2×2 island. Removing any one cell leaves a still‑connected island, so at least two removals are needed.
```

**Example 2**
```
Input: grid = [[1,0,1],[0,1,0],[1,0,1]]
Output: 0
Explanation: The grid already has four separate islands.
```

## Approach

**Algorithm:** Brute‑force check for 0, 1, or 2 removals (the answer is always ≤ 2)

1. **Zero‑day case** – Count islands using DFS/BFS. If the count is `0` or `≥ 2`, return `0`.
2. **One‑day case** – For each land cell, temporarily turn it to water and recount islands. If the count becomes `0` or `≥ 2`, return `1`.
3. **Two‑day case** – If neither of the above succeeded, the answer is `2`. This follows from graph theory: a connected component with at least two land cells either has a bridge or a cut vertex; removing two appropriate cells always disconnects it.

```text
FUNCTION minDays(grid):
    IF countIslands(grid) ≠ 1 THEN RETURN 0
    FOR each cell (r, c) WHERE grid[r][c] = 1 DO
        grid[r][c] ← 0
        IF countIslands(grid) ≠ 1 THEN RETURN 1
        grid[r][c] ← 1
    END FOR
    RETURN 2

FUNCTION countIslands(grid):
    visited ← MATRIX(m, n, FALSE)
    islands ← 0
    FOR r ← 0 TO m-1 DO
        FOR c ← 0 TO n-1 DO
            IF grid[r][c] = 1 AND NOT visited[r][c] THEN
                islands ← islands + 1
                DFS(r, c, grid, visited)
            END IF
        END FOR
    END FOR
    RETURN islands

FUNCTION DFS(r, c, grid, visited):
    stack ← [(r, c)]
    WHILE stack NOT EMPTY DO
        (x, y) ← POP(stack)
        IF x < 0 OR x ≥ m OR y < 0 OR y ≥ n THEN CONTINUE
        IF visited[x][y] OR grid[x][y] = 0 THEN CONTINUE
        visited[x][y] ← TRUE
        FOR (dx, dy) IN [(1,0),(-1,0),(0,1),(0,-1)] DO
            PUSH(stack, (x+dx, y+dy))
        END FOR
    END WHILE
```

## Walkthrough (Example 1)

| Step | Action | Island count |
|------|--------|--------------|
| 0 | Original grid | 1 |
| 1 | Remove cell (0,0) → grid becomes [[0,1],[1,1]] | still 1 |
| 2 | Remove cell (1,1) (second removal) → grid [[0,1],[1,0]] | 2 islands → answer 2 |

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(m·n·k)** where `k` is the number of land cells (≤ m·n). In the worst case we run a DFS for each cell, giving `O((m·n)²)` – acceptable for `m,n ≤ 30`. |
| Space  | **O(m·n)** – visited matrix and recursion/stack for DFS |

## Follow‑Up Questions

1. How would the algorithm change if you could remove **any** cell (land or water) each day?
2. Can we determine the answer in `O(m·n)` time without trying every cell, e.g., by detecting bridges or articulation points?
3. What if the grid is huge (up to 10⁴ × 10⁴) but sparse; which data structure would help?

## Key Takeaway

Because a connected land component can be split by removing at most two cells, checking the zero‑day and one‑day cases suffices; otherwise the answer is guaranteed to be two.
