# 1368. Minimum Cost to Make at Least One Valid Path in a Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid](https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid)
**Companies:** Amazon, Cleartrip, De Shaw, Docusign, Google, Meta, Tcs, Uber

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: 0-1 BFS — O(m·n)](#approach-0-1-bfs--omn)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `m x n` grid. Each cell of the grid has a sign pointing to the next cell you should visit if you are currently in this cell. The sign of `grid[i][j]` can be:
- `1` which means go to the cell to the right. (i.e go from `grid[i][j]` to `grid[i][j + 1]`)
- `2` which means go to the cell to the left. (i.e go from `grid[i][j]` to `grid[i][j - 1]`)
- `3` which means go to the lower cell. (i.e go from `grid[i][j]` to `grid[i + 1][j]`)
- `4` which means go to the upper cell. (i.e go from `grid[i][j]` to `grid[i - 1][j]`)

Notice that there could be some signs on the cells of the grid that point outside the grid.

You will initially start at the upper left cell `(0, 0)`. A valid path in the grid is a path that starts from the upper left cell `(0, 0)` and ends at the bottom-right cell `(m - 1, n - 1)` following the signs on the grid. The valid path does not have to be the shortest.

You can modify the sign on a cell with `cost = 1`. You can modify the sign on a cell **one time only**.

Return *the minimum cost to make the grid have at least one valid path*.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 ≤ m, n ≤ 100`
- `1 ≤ grid[i][j] ≤ 4`

---

## Examples

```
Example 1:
  Input: grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]
  Output: 3
  Explanation: You will start at point (0, 0).
  The path to (3, 3) is as follows. (0, 0) --> (0, 1) --> (0, 2) --> (0, 3) change the arrow to down with cost = 1 --> (1, 3) --> (1, 2) --> (1, 1) --> (1, 0) change the arrow to down with cost = 1 --> (2, 0) --> (2, 1) --> (2, 2) --> (2, 3) change the arrow to down with cost = 1 --> (3, 3)
  The total cost = 3.
```

```
Example 2:
  Input: grid = [[1,1,3],[3,2,2],[1,1,4]]
  Output: 0
  Explanation: You can follow the path from (0, 0) to (2, 2).
```

```
Example 3:
  Input: grid = [[1,2],[4,3]]
  Output: 1
  Explanation: Change the sign at (0, 1) from 2 (left) to 3 (down) with cost = 1 to reach (1, 1).
```

---

## Key Insight

> Model this as a **shortest-path problem on a weighted graph** where following the arrow costs 0 and changing direction costs 1. Since edge weights are only 0 or 1, **0-1 BFS** (deque-based) runs in O(V + E) — faster than Dijkstra.

The deque ensures 0-cost edges are explored first (pushed to front), and 1-cost edges are explored after (pushed to back).

---

## Approach: 0-1 BFS — O(m·n) ✅

```
FUNCTION minCost(grid):
    m, n = dimensions
    dist = m×n matrix of infinity
    dist[0][0] = 0
    deque = [(0, 0, 0)]

    WHILE deque:
        (cost, r, c) = deque.POPLEFT()
        IF cost > dist[r][c]: CONTINUE

        FOR (nr, nc, direction) in 4 directions:
            // Cost 0 if following the arrow, cost 1 if not
            newCost = cost + (0 IF grid[r][c] == direction ELSE 1)
            IF newCost < dist[nr][nc]:
                dist[nr][nc] = newCost
                IF newCost == cost:
                    deque.PUSH_FRONT((newCost, nr, nc))
                ELSE:
                    deque.PUSH_BACK((newCost, nr, nc))

    RETURN dist[m-1][n-1]
```

---

## Walkthrough

```
Grid:  1  1  3
       3  2  2
       1  1  4

Directions: 1=right, 2=left, 3=down, 4=up
```

| Step | Cell | Arrow | Move To | Cost | Notes |
|------|------|-------|---------|------|-------|
| 1 | (0,0) | 1→right | (0,1) | 0 | Following arrow |
| 2 | (0,1) | 1→right | (0,2) | 0 | Following arrow |
| 3 | (0,2) | 3→down | (1,2) | 0 | Following arrow |
| 4 | (1,2) | 2→left | (1,1) | 0 | Following arrow |
| 5 | (1,1) | 2→left | (1,0) | 0 | Following arrow |
| 6 | (1,0) | 3→down | (2,0) | 0 | Following arrow |
| 7 | (2,0) | 1→right | (2,1) | 0 | Following arrow |
| 8 | (2,1) | 1→right | (2,2) | 0 | Following arrow |

**Result:** Cost = **0** — the arrows naturally lead to (2,2) ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) — each cell processed at most once |
| **Space** | O(m · n) — distance matrix and deque |

---

## Follow-Up Questions

1. **Why 0-1 BFS instead of Dijkstra?** Both work, but 0-1 BFS runs in O(V+E) vs. O(V log V) for Dijkstra — more efficient when weights are only 0 and 1.
2. **Can we use regular BFS?** No — BFS assumes uniform edge weights. Here weights are 0 or 1.
3. **What if we could only change direction to adjacent cells (not all 4)?** Same approach, just different neighbor generation logic.
4. **How does this generalize?** Any shortest-path problem with binary edge weights (0 or 1) is ideal for 0-1 BFS.

---

## Key Takeaway

> When edge weights are restricted to 0 and 1, **0-1 BFS with a deque** provides an optimal O(V+E) shortest-path solution — push 0-cost moves to the front and 1-cost moves to the back.
