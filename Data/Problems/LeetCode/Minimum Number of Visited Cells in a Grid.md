# 2617. Minimum Number of Visited Cells in a Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-visited-cells-in-a-grid](https://leetcode.com/problems/minimum-number-of-visited-cells-in-a-grid)
**Companies:** De Shaw, Huawei, Worldquant

---

## Problem Description

You are given a **0-indexed** `m x n` integer matrix `grid`. Your initial position is at the **top-left** cell `(0, 0)`.

Starting from the cell `(i, j)`, you can move to one of the following cells:

- Cells `(i, k)` with `j < k <= grid[i][j] + j` (rightward movement), or
- Cells `(k, j)` with `i < k <= grid[i][j] + i` (downward movement).

Return *the minimum number of cells you need to visit to reach the **bottom-right** cell* `(m - 1, n - 1)`. If there is no valid path, return `-1`.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 10^5`
- `1 <= m * n <= 10^5`
- `0 <= grid[i][j] < m * n`
- `grid[m - 1][n - 1] == 0`

## Examples

**Example 1:**
```
Input: grid = [[3,4,2,1],[4,2,3,1],[2,1,0,0],[2,4,0,0]]
Output: 4
Explanation: The image above shows one of the paths that visits exactly 4 cells.
```

**Example 2:**
```
Input: grid = [[3,4,2,1],[4,2,1,1],[2,1,1,0],[3,4,1,0]]
Output: 3
Explanation: The image above shows one of the paths that visits exactly 3 cells.
```

**Example 3:**
```
Input: grid = [[2,1,0],[1,0,0]]
Output: -1
Explanation: It can be proven that no path exists.
```

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
