# 2850. Minimum Moves to Spread Stones Over Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-spread-stones-over-grid](https://leetcode.com/problems/minimum-moves-to-spread-stones-over-grid)
**Companies:** Geico, Google, Guidewire, Microsoft, Tiktok

---

## Problem Description

You are given an `m × n` grid where each cell contains an integer representing the number of stones in that cell. Cells with a value greater than `1` are sources (multiple stones), and cells with value `0` are empty targets. In one move you can move a single stone to any of the four adjacent cells (up, down, left, right). Determine the minimum total number of moves required to spread the stones so that every stone occupies a distinct empty cell.

## Examples

1. **Input:** `grid = [[0,2],[1,0]]`
   **Output:** `2`
   **Explanation:** Move one stone from `(0,1)` to `(0,0)` (1 move) and the second stone from `(0,1)` to `(1,1)` (1 move).
2. **Input:** `grid = [[3,0,0],[0,0,0],[0,0,0]]`
   **Output:** `6`
   **Explanation:** The three stones must occupy three distinct empty cells; the optimal assignment yields total Manhattan distance `6`.

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
