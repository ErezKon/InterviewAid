# 3609. Minimum Moves to Reach Target in Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-reach-target-in-grid](https://leetcode.com/problems/minimum-moves-to-reach-target-in-grid)
**Companies:** Bloomberg

---

## Problem Description

> *Note: the Approach below runs BFS on an invented obstacle grid. Officially each move adds `max(x, y)` to one coordinate. Work backwards from `(tx, ty)`, where the predecessor is essentially unique. For `tx > ty` it is `(tx/2, ty)` if `tx ≥ 2·ty` (tx must be even), else `(tx − ty, ty)`; symmetric for `ty > tx`. Equal coordinates and zeros need special care. Count steps until reaching `(sx, sy)`, or return -1 once you drop below it.*

You are given four integers `sx`, `sy`, `tx`, and `ty`, representing two points `(sx, sy)` and `(tx, ty)` on an infinitely large 2D grid.

You start at `(sx, sy)`.

At any point `(x, y)`, define `m = max(x, y)`. You can either:

- Move to `(x + m, y)`, or
- Move to `(x, y + m)`.

Return the **minimum** number of moves required to reach `(tx, ty)`. If it is impossible to reach the target, return -1.

**Constraints:**
- `0 <= sx <= tx <= 10^9`
- `0 <= sy <= ty <= 10^9`

## Examples

**Example 1:**
```
Input: sx = 1, sy = 2, tx = 5, ty = 4
Output: 2
Explanation: The optimal path is:
- Move 1: max(1, 2) = 2. Increase the y-coordinate by 2, moving from (1, 2) to (1, 2 + 2) = (1, 4).
- Move 2: max(1, 4) = 4. Increase the x-coordinate by 4, moving from (1, 4) to (1 + 4, 4) = (5, 4).
Thus, the minimum number of moves to reach (5, 4) is 2.
```

**Example 2:**
```
Input: sx = 0, sy = 1, tx = 2, ty = 3
Output: 3
Explanation: The optimal path is:
- Move 1: max(0, 1) = 1. Increase the x-coordinate by 1, moving from (0, 1) to (0 + 1, 1) = (1, 1).
- Move 2: max(1, 1) = 1. Increase the x-coordinate by 1, moving from (1, 1) to (1 + 1, 1) = (2, 1).
- Move 3: max(2, 1) = 2. Increase the y-coordinate by 2, moving from (2, 1) to (2, 1 + 2) = (2, 3).
Thus, the minimum number of moves to reach (2, 3) is 3.
```

**Example 3:**
```
Input: sx = 1, sy = 1, tx = 2, ty = 2
Output: -1
Explanation: - It is impossible to reach (2, 2) from (1, 1) using the allowed moves. Thus, the answer is -1.
```

## Approach

**Algorithm:** Breadth‑First Search (BFS) on the grid

BFS explores cells in order of increasing distance from the start, guaranteeing the first time we dequeue the target we have the shortest path length. We maintain a queue of `(row, col, distance)` and a visited matrix to avoid revisiting cells.

```text
FUNCTION minMoves(grid, target):
    m ← ROW_COUNT(grid)
    n ← COL_COUNT(grid[0])
    sr ← 0; sc ← 0
    tr ← target[0]; tc ← target[1]
    IF sr = tr AND sc = tc THEN RETURN 0
    visited ← MATRIX(m, n, FALSE)
    visited[sr][sc] ← TRUE
    queue ← [(sr, sc, 0)]   // (row, col, distance)
    directions ← [(1,0), (-1,0), (0,1), (0,-1)]
    WHILE queue NOT EMPTY DO
        (r, c, d) ← POP_FRONT(queue)
        FOR (dr, dc) IN directions DO
            nr ← r + dr; nc ← c + dc
            IF 0 ≤ nr < m AND 0 ≤ nc < n AND NOT visited[nr][nc] AND grid[nr][nc] = 0 THEN
                IF nr = tr AND nc = tc THEN RETURN d + 1
                visited[nr][nc] ← TRUE
                PUSH_BACK(queue, (nr, nc, d + 1))
            END IF
        END FOR
    END WHILE
    RETURN -1   // target unreachable
```

## Walkthrough

| Step | Dequeued cell `(r,c)` | Distance `d` | Enqueued neighbours |
|------|-----------------------|-------------|--------------------|
| 1 | (0,0) | 0 | (0,1) |
| 2 | (0,1) | 1 | (0,2) |
| 3 | (0,2) | 2 | (1,2) |
| 4 | (1,2) | 3 | (2,2) → target reached, return 4 |

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(m·n)** – each cell visited at most once |
| Space  | **O(m·n)** – visited matrix and queue |

## Follow‑Up Questions

1. How would the solution change if diagonal moves were allowed?
2. Can we compute the shortest path when each cell has a traversal cost (weighted grid) without using Dijkstra?
3. What modifications are needed to return the actual path, not just its length?

## Key Takeaway

A simple BFS on an unweighted grid yields the optimal number of moves to a reachable target, because it expands nodes in increasing distance order.
