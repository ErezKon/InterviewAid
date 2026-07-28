# 1219. Path with Maximum Gold

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-with-maximum-gold](https://leetcode.com/problems/path-with-maximum-gold)
**Companies:** Amazon, Geico, Goldman Sachs, Google, Microsoft, Salesforce

---

## Problem Description
Given a rectangular grid of cells where each cell contains a non‑negative integer representing gold, a miner can start at any cell containing gold and move to one of the four adjacent cells (up, down, left, right). The miner cannot visit a cell more than once in a single path. Return the maximum amount of gold the miner can collect.

Constraints: `1 ≤ rows, cols ≤ 15`; each cell value `0 ≤ gold ≤ 100`.

## Examples
| grid | Output | Explanation |
|------|--------|-------------|
| [[0,6,0],[5,8,7],[0,9,0]] | 24 | Path 9 → 8 → 7 → 6 collects 30? Actually optimal path 9→8→7→6 = 30, but due to movement constraints the maximum is 24 (9→8→7). |
| [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]] | 28 | Collect gold along a winding path without revisiting cells.

## Approach
Use backtracking (DFS) to explore all possible paths starting from each gold‑bearing cell.

1. Iterate over every cell; if `grid[r][c] > 0`, start a DFS.
2. In DFS, add current cell's gold to `currentSum`, mark the cell as visited by setting it to `0`.
3. Recurse into the four neighboring cells, keeping track of the maximum sum returned.
4. After exploring, restore the cell's original gold value (backtrack).
5. Keep a global `maxGold` to store the best sum across all starts.

## Walkthrough
For the first example, start at cell (1,1) with gold 8:
| Step | Position | gold added | currentSum |
|------|----------|------------|------------|
| 1 | (1,1) | 8 | 8 |
| 2 | move to (1,2) | 7 | 15 |
| 3 | move to (2,1) | 9 | 24 |
No further moves without revisiting, so path sum = 24, which becomes `maxGold`.

## Complexity Analysis
- Time: O((rows·cols)·4^{rows·cols}) in the worst case, but practical limits (≤15×15) keep it feasible.
- Space: O(rows·cols) recursion stack depth.

## Follow‑Up Questions
1. How would you adapt the algorithm for larger grids where exhaustive DFS is impractical?
2. Can memoization be applied if revisiting cells were allowed under different constraints?
3. What changes are needed if diagonal moves are permitted?

## Key Takeaway
Backtracking with in‑place marking efficiently enumerates all non‑repeating paths, enabling the miner to discover the maximum collectible gold.
