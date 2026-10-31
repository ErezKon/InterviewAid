# 2852. Sum of Remoteness of All Cells

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-remoteness-of-all-cells](https://leetcode.com/problems/sum-of-remoteness-of-all-cells)
**Companies:** Medianet

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

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
Reachability between non-blocked cells is exactly membership in the same 4-connected component. For a non-blocked cell in a component with value sum `s`, the cells it cannot reach are all non-blocked cells outside its component, so `R = S − s`, where `S` is the sum of all non-blocked values.

Therefore every cell of a component with size `t` and sum `s` contributes `S − s`, and the component contributes `t · (S − s)` in total. Blocked cells contribute 0.
1. Compute `S` = sum of all positive values.
2. Flood-fill (iterative DFS/BFS) each unvisited non-blocked cell to get its component's size `t` and sum `s`.
3. Add `t · (S − s)` to the answer (use 64-bit integers: up to 9·10^4 cells × 9·10^10).

```text
FUNCTION sumRemoteness(grid)
    n ← number of rows of grid
    S ← sum of grid[i][j] over all cells with grid[i][j] > 0
    visited ← n x n array of false
    answer ← 0
    FOR i ← 0 TO n-1
        FOR j ← 0 TO n-1
            IF grid[i][j] > 0 AND NOT visited[i][j]
                visited[i][j] ← true
                stack ← [(i, j)]
                s ← 0; t ← 0
                WHILE stack not empty
                    (r, c) ← POP stack
                    s ← s + grid[r][c]
                    t ← t + 1
                    FOR (nr, nc) IN [(r-1,c), (r+1,c), (r,c-1), (r,c+1)]
                        IF inside grid AND grid[nr][nc] > 0 AND NOT visited[nr][nc]
                            visited[nr][nc] ← true
                            PUSH (nr, nc)
                answer ← answer + t * (S - s)   // each cell misses everything outside its component
    RETURN answer
```

## Walkthrough
Example 1: `grid = [[-1,1,-1],[5,-1,4],[-1,3,-1]]`. Non-blocked values: 1, 5, 4, 3 → `S = 13`. No two of them share an edge, so there are four single-cell components.

| Component | t | s | t · (S − s) | answer |
|-----------|---|---|-------------|--------|
| {(0,1)} | 1 | 1 | 12 | 12 |
| {(1,0)} | 1 | 5 | 8 | 20 |
| {(1,2)} | 1 | 4 | 9 | 29 |
| {(2,1)} | 1 | 3 | 10 | 39 |

Result: **39**.

## Complexity Analysis
Time: O(n²) — every cell is visited once by the flood fill.
Space: O(n²) for the visited array and the explicit stack.

## Follow-Up Questions
- How would you handle updates that block/unblock cells online? (Unblocking only: union-find with component sums; deletions need offline reverse processing.)
- How would the answer change with 8-directional movement? (Only the neighbor list changes.)
- Can you avoid the visited array? (Overwrite visited cells with -1 if mutating the input is allowed.)

## Key Takeaway
When a per-cell quantity depends only on which connected component the cell belongs to, compute component aggregates (size and sum) once and combine them with the global total, instead of solving reachability per cell.
