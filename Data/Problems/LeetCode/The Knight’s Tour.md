# 2664. The Knight’s Tour

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-knights-tour](https://leetcode.com/problems/the-knights-tour)
**Companies:** Microsoft

---

## Problem Description
Given two positive integers `m` and `n` which are the height and width of a **0-indexed** 2D-array `board`, a pair of positive integers `(r, c)` which is the starting position of the knight on the board.

Your task is to find an order of movements for the knight, in a manner that every cell of the `board` gets visited **exactly** once (the starting cell is considered visited and you **shouldn't** visit it again).

Return *the array* `board` *in which the cells' values show the order of visiting the cell starting from 0 (the initial place of the knight).*

Note that a **knight** can **move** from cell `(r1, c1)` to cell `(r2, c2)` if `0 <= r2 <= m - 1` and `0 <= c2 <= n - 1` and `min(abs(r1 - r2), abs(c1 - c2)) = 1` and `max(abs(r1 - r2), abs(c1 - c2)) = 2`.

**Constraints:**
- `1 <= m, n <= 5`
- `0 <= r <= m - 1`
- `0 <= c <= n - 1`
- The inputs will be generated such that there exists **at least** one possible order of movements with the given condition

## Examples
```
Example 1:
  Input: m = 1, n = 1, r = 0, c = 0
  Output: [[0]]
  Explanation: There is only 1 cell and the knight is initially on it so there is only a 0 inside the 1x1 grid.
```
```
Example 2:
  Input: m = 3, n = 4, r = 0, c = 0
  Output: [[0,3,6,9],[11,8,1,4],[2,5,10,7]]
  Explanation: By the following order of movements we can visit the entire board.
  (0,0)->(1,2)->(2,0)->(0,1)->(1,3)->(2,1)->(0,2)->(2,3)->(1,1)->(0,3)->(2,2)->(1,0)
```

## Approach
Use backtracking with Warnsdorff’s heuristic: always move the knight to the reachable cell with the fewest onward moves. This dramatically prunes the search space.

## Walkthrough
| Step | Current Position | Possible Moves | Chosen Next | Reason |
|------|------------------|----------------|-------------|--------|
| 1 | (0,0) | (2,1),(1,2) | (2,1) | Both have 2 onward moves, pick first |
| 2 | (2,1) | ... | ... | ... |
Continue until all 25 cells are visited or backtrack when dead-end is reached.

## Complexity Analysis
- Time: In the worst case exponential `O(n²!)`, but Warnsdorff’s rule makes it fast for typical board sizes (practically `O(n²)`).
- Space: `O(n²)` for the board and the current path.

## Follow-Up Questions
1. How would you modify the algorithm to find a closed tour (ending at the start cell)?
2. Can you prove that Warnsdorff’s heuristic always finds a tour for `n ≥ 5`?
3. How would you adapt the solution for a rectangular board `m × n`?

## Key Takeaway
Guided backtracking with a heuristic that chooses the most constrained next move can efficiently solve combinatorial search problems like the knight’s tour.
