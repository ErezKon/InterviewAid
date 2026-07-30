# 2617. Minimum Number of Visited Cells in a Grid

**Difficulty:** 🔴 Hard
**Companies:** De Shaw, Huawei, Worldquant

---

## Problem Description
You are given an `m x n` matrix `grid` where each cell `grid[i][j]` contains a non‑negative integer representing the maximum jump length from that cell. From any cell you may move either right or down by any distance `d` such that `1 ≤ d ≤ grid[i][j]`. Starting at the top‑left cell `(0,0)`, determine the minimum number of cells that must be visited (including the start and end cells) to reach the bottom‑right cell `(m‑1, n‑1)`. If the destination cannot be reached, return `-1`.

## Examples
| grid | Output | Explanation |
|---|---|---|
| `[[2,1,2],[1,1,1],[1,1,1]]` | 3 | Path: `(0,0) → (0,2) → (2,2)` visits 3 cells. |
| `[[0,2],[3,0]]` | -1 | No move possible from start; destination unreachable. |
| `[[3,0,0],[0,0,0],[0,0,0]]` | 2 | Jump directly from `(0,0)` to `(2,0)` then to `(2,2)`. |

## Approach
The grid can be viewed as a directed graph where each cell has edges to reachable cells to its right and down. The goal is a shortest‑path problem measured by number of visited cells. A naïve BFS exploring all possible jumps is O(m·n·maxJump) and too slow. Instead, we maintain for each row and column a **monotonic set** of unvisited column/row indices. When processing a cell, we query the set for all indices within the jump range, enqueue them, and remove them from the set so they are visited only once. This yields an overall O(m·n·log(m+n)) solution.

### Pseudocode
```text
FUNCTION minVisited(grid):
    SET m ← NUMBER OF ROWS(grid)
    SET n ← NUMBER OF COLUMNS(grid)
    // Sets of unvisited positions for each row and column
    SET rowSet[0..m-1] ← LIST OF TREES CONTAINING 0..n-1
    SET colSet[0..n-1] ← LIST OF TREES CONTAINING 0..m-1
    // Queue stores (r, c, steps)
    INITIALIZE queue
    ENQUEUE (0, 0, 1) INTO queue
    REMOVE 0 FROM rowSet[0]
    REMOVE 0 FROM colSet[0]
    WHILE queue NOT EMPTY:
        (r, c, steps) ← DEQUEUE(queue)
        IF r = m-1 AND c = n-1:
            RETURN steps
        SET jump ← grid[r][c]
        // Explore rightward cells in same row
        FOR each col IN rowSet[r].RANGE(c+1, MIN(c+jump, n-1)):
            ENQUEUE (r, col, steps+1) INTO queue
            REMOVE col FROM rowSet[r]
            REMOVE r FROM colSet[col]
        // Explore downward cells in same column
        FOR each row IN colSet[c].RANGE(r+1, MIN(r+jump, m-1)):
            ENQUEUE (row, c, steps+1) INTO queue
            REMOVE row FROM colSet[c]
            REMOVE c FROM rowSet[row]
    RETURN -1
```

## Walkthrough
Consider `grid = [[2,1,2],[1,1,1],[1,1,1]]` (3×3).
1. Start `(0,0)`, jump = 2. Rightward reachable columns: 1 and 2. Enqueue `(0,1)` and `(0,2)`. Downward reachable rows: 1 and 2. Enqueue `(1,0)` and `(2,0)`.
2. Dequeue `(0,1)`, jump = 1 → can move to `(0,2)` (already visited) or `(1,1)`. Enqueue `(1,1)`.
3. Dequeue `(0,2)`, jump = 2 → down to `(1,2)` and `(2,2)`. `(2,2)` is the target, steps = 3. Return 3.
The algorithm visits each cell at most once, guaranteeing optimality.

## Complexity Analysis
- **Time:** O(m·n·log(m+n)) – each cell is removed from its row and column sets once; set range queries cost logarithmic time.
- **Space:** O(m·n) – storage for the sets and BFS queue.

## Follow-Up Questions
- How would the solution adapt if moves were allowed in all four directions?
- Can the algorithm be optimized to O(m·n) using bucketed queues when jump lengths are bounded?
- What changes are needed if each move incurs a variable cost and we need the minimum total cost path?

## Key Takeaway
Modeling the grid as a graph and using monotonic sets to efficiently retrieve reachable cells enables a fast BFS that finds the minimum number of visited cells.
