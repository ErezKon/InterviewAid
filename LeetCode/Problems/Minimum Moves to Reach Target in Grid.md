# 3609. Minimum Moves to Reach Target in Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-reach-target-in-grid](https://leetcode.com/problems/minimum-moves-to-reach-target-in-grid)
**Companies:** Bloomberg

---

## Problem Description

You are given a rectangular grid of size `m × n` containing empty cells (`0`) and blocked cells (`1`). You start at the top‑left cell `(0, 0)` and want to reach a target cell `(tx, ty)`. In one move you may travel to any of the four orthogonal neighboring cells that are inside the grid and not blocked. Return the minimum number of moves required to reach the target, or `-1` if it is unreachable.

Constraints:
- `1 ≤ m, n ≤ 10^3`
- `0 ≤ tx < m`, `0 ≤ ty < n`
- The start and target cells are guaranteed to be empty.

## Examples

**Example 1**
```
Input: grid = [[0,0,0],[1,1,0],[0,0,0]], target = [2,2]
Output: 4
Explanation: Path (0,0) → (0,1) → (0,2) → (1,2) → (2,2).
```

**Example 2**
```
Input: grid = [[0,1],[1,0]], target = [1,1]
Output: -1
Explanation: The target is isolated by blocked cells.
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
