# 2852. Sum of Remoteness of All Cells

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-remoteness-of-all-cells](https://leetcode.com/problems/sum-of-remoteness-of-all-cells)
**Companies:** Medianet

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode. The Approach/Walkthrough below solve an invented multi-source-BFS problem. Correct idea: let `cnt` = number of non-blocked cells; flood-fill each connected component to get its value sum `s` and size `t`; every cell outside the component (`cnt − t` cells) has `s` in its remoteness, so add `(cnt − t)·s` per component. O(n²).*

You are given a **0-indexed** matrix `grid` of order `n * n`. Each cell in this matrix has a value `grid[i][j]`, which is either a **positive** integer or `-1` representing a blocked cell.

You can move from a non-blocked cell to any non-blocked cell that shares an edge.

For any cell `(i, j)`, we represent its **remoteness** as `R[i][j]` which is defined as the following:

- If the cell `(i, j)` is a **non-blocked** cell, `R[i][j]` is the sum of the values `grid[x][y]` such that there is **no path** from the **non-blocked** cell `(x, y)` to the cell `(i, j)`.
- For blocked cells, `R[i][j] == 0`.

Return *the sum of* `R[i][j]` *over all cells.*

**Constraints:**
- `1 <= n <= 300`
- `1 <= grid[i][j] <= 10^6` or `grid[i][j] == -1`

## Examples

**Example 1:**
```
Input: grid = [[-1,1,-1],[5,-1,4],[-1,3,-1]]
Output: 39
Explanation: The sum of R[i][j] over all cells is 0 + 12 + 0 + 8 + 0 + 9 + 0 + 10 + 0 = 39.
For example, R[0][1] = 5 + 4 + 3 = 12 (cells that cannot reach (0, 1)), and R[1][2] = 1 + 5 + 3 = 9.
```

**Example 2:**
```
Input: grid = [[-1,3,4],[-1,-1,-1],[3,-1,-1]]
Output: 13
Explanation: The sum of R[i][j] over all cells is 3 + 3 + 0 + 0 + 0 + 0 + 7 + 0 + 0 = 13.
For example, R[0][2] = 3 and R[2][0] = 3 + 4 = 7.
```

**Example 3:**
```
Input: grid = [[1]]
Output: 0
Explanation: Since there are no other cells than (0, 0), R[0][0] is equal to 0. So the sum of R[i][j] over all cells would be 0.
```

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
