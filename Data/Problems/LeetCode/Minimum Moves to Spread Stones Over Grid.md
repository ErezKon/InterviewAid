# 2850. Minimum Moves to Spread Stones Over Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-spread-stones-over-grid](https://leetcode.com/problems/minimum-moves-to-spread-stones-over-grid)
**Companies:** Geico, Google, Guidewire, Microsoft, Tiktok

---

## Problem Description

You are given a **0-indexed** 2D integer matrix `grid` of size `3 * 3`, representing the number of stones in each cell. The grid contains exactly `9` stones, and there can be **multiple** stones in a single cell.

In one move, you can move a single stone from its current cell to any other cell if the two cells share a side.

Return *the **minimum number of moves** required to place one stone in each cell*.

**Constraints:**
- `grid.length == grid[i].length == 3`
- `0 <= grid[i][j] <= 9`
- Sum of `grid` is equal to `9`.

## Examples

**Example 1:**
```
Input: grid = [[1,1,0],[1,1,1],[1,2,1]]
Output: 3
Explanation: One possible sequence of moves to place one stone in each cell is:
1- Move one stone from cell (2,1) to cell (2,2).
2- Move one stone from cell (2,2) to cell (1,2).
3- Move one stone from cell (1,2) to cell (0,2).
In total, it takes 3 moves to place one stone in each cell of the grid.
It can be shown that 3 is the minimum number of moves required to place one stone in each cell.
```

**Example 2:**
```
Input: grid = [[1,3,0],[1,0,0],[1,0,3]]
Output: 4
Explanation: One possible sequence of moves to place one stone in each cell is:
1- Move one stone from cell (0,1) to cell (0,2).
2- Move one stone from cell (0,1) to cell (1,1).
3- Move one stone from cell (2,2) to cell (1,2).
4- Move one stone from cell (2,2) to cell (2,1).
In total, it takes 4 moves to place one stone in each cell of the grid.
It can be shown that 4 is the minimum number of moves required to place one stone in each cell.
```

## Approach

**Algorithm:** Brute‑force assignment using permutations (feasible for small numbers of stones).

1. List each stone individually according to its count, producing a `sources` list of coordinates.
2. List all empty cells (`targets`).
3. For every permutation mapping `sources[i] → targets[i]`, compute the sum of Manhattan distances.
4. Return the minimum sum.

This is essentially the assignment problem; for larger inputs a Hungarian algorithm or min‑cost flow would be needed, but the brute‑force works for the constraints of the original problem.

```text
FUNCTION minimumMoves(grid):
    sources ← []
    targets ← []
    FOR r FROM 0 TO ROWS(grid)-1 DO
        FOR c FROM 0 TO COLS(grid)-1 DO
            IF grid[r][c] > 1 THEN
                REPEAT grid[r][c] - 1 TIMES:
                    APPEND (r, c) TO sources
            ELSE IF grid[r][c] = 0 THEN
                APPEND (r, c) TO targets
    minCost ← INFINITY
    FOR perm IN PERMUTATIONS(sources) DO
        cost ← 0
        FOR i FROM 0 TO LENGTH(sources)-1 DO
            cost ← cost + MANHATTAN_DISTANCE(perm[i], targets[i])
        IF cost < minCost THEN
            minCost ← cost
    RETURN minCost
```

## Walkthrough

For `grid = [[0,2],[1,0]]`:

- `sources = [(0,1)]` (one extra stone)
- `targets = [(0,0), (1,1)]`
- Permutations of one source give two assignments:
  1. `(0,1) → (0,0)` cost `1`
  2. `(0,1) → (1,1)` cost `1`
- Adding the mandatory move for the second stone (already at a target) yields total `2`.

## Complexity Analysis

- **Time:** `O(k! * k)` where `k` is the number of extra stones (factorial due to permutations). Suitable only for small `k`.
- **Space:** `O(k + t)` for storing source and target coordinates.

## Follow‑Up Questions

- How would you solve the problem efficiently for large `k`? (Hint: Hungarian algorithm or min‑cost max‑flow.)
- What if diagonal moves were allowed?
- Can the solution be adapted to minimize the maximum individual move instead of the sum?

## Key Takeaway

When the number of movable items is small, enumerating all assignments and picking the minimum Manhattan distance provides a simple and correct solution.
