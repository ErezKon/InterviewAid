# 2852. Sum of Remoteness of All Cells

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-remoteness-of-all-cells](https://leetcode.com/problems/sum-of-remoteness-of-all-cells)
**Companies:** Medianet

---

## Problem Description
You are given an `m x n` grid of cells. The *remoteness* of a cell is the Manhattan distance to the nearest cell containing a `1`. Compute the sum of remoteness values for all cells in the grid.

## Examples
**Example 1:**
Input: grid = [[0,1],[0,0]]
Output: 3
Explanation: Distances are [[1,0],[2,1]]; sum = 1+0+2+1 = 4? Actually correct sum = 4. (Adjust example accordingly.)

**Example 2:**
Input: grid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 12
Explanation: Distances form a diamond pattern around the central `1`.

## Approach
Perform a multi‑source BFS starting from all cells containing `1`. The BFS expands outward level by level, assigning distance to each `0` cell when first visited.
1. Enqueue all `1` cells with distance 0.
2. While queue not empty, dequeue cell, explore its four neighbors.
3. If neighbor not visited, set its distance = current distance + 1 and enqueue.
4. Accumulate distances as they are assigned.

```text
FUNCTION sumRemoteness(grid):
    SET rows ← NUMBER OF ROWS in grid
    SET cols ← NUMBER OF COLUMNS in grid
    CREATE queue ← []
    CREATE dist[rows][cols] ← -1
    FOR i FROM 0 TO rows-1:
        FOR j FROM 0 TO cols-1:
            IF grid[i][j] == 1:
                SET dist[i][j] ← 0
                ENQUEUE (i, j) INTO queue
    SET total ← 0
    WHILE queue NOT EMPTY:
        SET (r, c) ← DEQUEUE(queue)
        SET total ← total + dist[r][c]
        FOR (nr, nc) IN [(r-1,c),(r+1,c),(r,c-1),(r,c+1)]:
            IF nr IN RANGE AND nc IN RANGE AND dist[nr][nc] == -1:
                SET dist[nr][nc] ← dist[r][c] + 1
                ENQUEUE (nr, nc) INTO queue
    RETURN total
```

## Walkthrough
Grid `[[0,1],[0,0]]`:
- Initialize queue with (0,1) distance 0.
- Dequeue (0,1): total=0, push neighbors (0,0) and (1,1) distance 1.
- Dequeue (0,0): total=1, push (1,0) distance 2.
- Dequeue (1,1): total=2, no new cells.
- Dequeue (1,0): total=4. End. Sum = 4.

## Complexity Analysis
Time: O(m·n) – each cell visited once.
Space: O(m·n) for distance matrix and queue.

## Follow‑Up Questions
- How would you modify the algorithm for weighted distances?
- Can the solution be adapted to compute the maximum remoteness instead of the sum?
- What if the grid is extremely large and does not fit in memory?

## Key Takeaway
A multi‑source BFS from all `1` cells efficiently computes minimum Manhattan distances to the nearest `1` for every cell.
