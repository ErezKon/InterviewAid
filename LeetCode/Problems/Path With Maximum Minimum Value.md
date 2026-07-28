# 1102. Path With Maximum Minimum Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-with-maximum-minimum-value](https://leetcode.com/problems/path-with-maximum-minimum-value)
**Companies:** Amazon, Geico, Google

---

## Problem Description
Given an `m × n` grid of integers, you start at the top‑left cell `(0,0)` and want to reach the bottom‑right cell `(m‑1,n‑1)`. The score of a path is the minimum value among all cells on that path. Return the maximum possible score among all such paths.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `grid = [[5,4,5],[1,2,6],[7,4,6]]` | `4` | The optimal path `5→4→5→6→6` has minimum value `4`. |
| `grid = [[2,2,1,2,2,2],[1,2,1,2,1,2]]` | `2` | Any path must include a `1`, but the best we can do is achieve a minimum of `2`. |

## Approach
Use a variant of Dijkstra where the priority is the **maximum** of the path‑minimum so far. A max‑heap stores `(currentMin, row, col)`. For each neighbor, the new path minimum is `min(currentMin, grid[nr][nc])`. If this value improves the best known for that cell, push it onto the heap. The first time we pop the target cell, we have the optimal answer.

```text
FUNCTION maximumMinimumPath(grid):
    SET m ← NUMBER OF ROWS in grid
    SET n ← NUMBER OF COLUMNS in grid
    // max‑heap: store negative for max behaviour
    SET heap ← PRIORITY_QUEUE containing ( -grid[0][0], 0, 0 )
    SET best ← MATRIX m×n filled with -∞
    SET best[0][0] ← grid[0][0]
    SET directions ← [(1,0),(-1,0),(0,1),(0,-1)]

    WHILE heap IS NOT EMPTY:
        SET negMin, r, c ← POP(heap)
        SET curMin ← -negMin
        IF r = m-1 AND c = n-1:
            RETURN curMin
        FOR each (dr, dc) IN directions:
            SET nr ← r + dr
            SET nc ← c + dc
            IF nr < 0 OR nr ≥ m OR nc < 0 OR nc ≥ n: CONTINUE
            SET pathMin ← MIN(curMin, grid[nr][nc])
            IF pathMin > best[nr][nc]:
                SET best[nr][nc] ← pathMin
                PUSH(heap, ( -pathMin, nr, nc ))
    RETURN -1  // unreachable (should not happen)
```

## Walkthrough
For the first example grid:

| Step | Pop (r,c) | curMin | Neighbors considered | Updated best values |
|------|-----------|--------|----------------------|----------------------|
| 1 | (0,0) | 5 | (1,0)→1, (0,1)→4 | best[1,0]=1, best[0,1]=4 |
| 2 | (0,1) | 4 | (0,2)→5, (1,1)→2 | best[0,2]=4, best[1,1]=2 |
| 3 | (0,2) | 4 | (1,2)→6 | best[1,2]=4 |
| 4 | (1,2) | 4 | (2,2)→6 | best[2,2]=4 (target reached) |

The returned minimum is `4`.

## Complexity Analysis
- **Time:** O(m·n log(m·n)) – each cell may be pushed to the heap once.
- **Space:** O(m·n) for the `best` matrix and the heap.

## Follow‑Up Questions
1. How would you solve the problem using binary search on the answer combined with BFS?
2. Can the algorithm be adapted for weighted edges where the weight is the cell value?
3. What changes are needed if movement is allowed diagonally?

## Key Takeaway
Treat the path score as a bottleneck and use a max‑heap Dijkstra variant to greedily expand the highest‑possible minimum first.
