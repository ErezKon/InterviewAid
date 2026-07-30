# 2664. The Knight’s Tour

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-knights-tour](https://leetcode.com/problems/the-knights-tour)
**Companies:** Microsoft

---

## Problem Description
Given an `n × n` chessboard and a starting cell `(row, col)`, determine a sequence of moves for a knight such that it visits every cell exactly once (a Hamiltonian path). Return any valid sequence of coordinates, or an empty list if no such tour exists.

## Examples
**Example 1:**
```
n = 5, start = (0,0)
Output: [(0,0),(2,1),(4,0), ...]  // a sequence of 25 positions covering the board
```
**Example 2:**
```
n = 3, start = (0,0)
Output: []
Explanation: No knight's tour exists on a 3×3 board.
```

## Approach
Use backtracking with Warnsdorff’s heuristic: always move the knight to the reachable cell with the fewest onward moves. This dramatically prunes the search space.

## Walkthrough
| Step | Current Position | Possible Moves | Chosen Next | Reason |
|------|------------------|----------------|-------------|--------|
| 1 | (0,0) | (2,1),(1,2) | (2,1) | Both have 2 onward moves, pick first |
| 2 | (2,1) | ... | ... | ... |
Continue until all 25 cells are visited or backtrack when dead‑end is reached.

## Complexity Analysis
- Time: In the worst case exponential `O(n²!)`, but Warnsdorff’s rule makes it fast for typical board sizes (practically `O(n²)`).
- Space: `O(n²)` for the board and the current path.

## Follow-Up Questions
1. How would you modify the algorithm to find a closed tour (ending at the start cell)?
2. Can you prove that Warnsdorff’s heuristic always finds a tour for `n ≥ 5`?
3. How would you adapt the solution for a rectangular board `m × n`?

## Key Takeaway
Guided backtracking with a heuristic that chooses the most constrained next move can efficiently solve combinatorial search problems like the knight’s tour.
