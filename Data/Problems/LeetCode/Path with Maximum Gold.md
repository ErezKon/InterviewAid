# 1219. Path with Maximum Gold

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-with-maximum-gold](https://leetcode.com/problems/path-with-maximum-gold)
**Companies:** Amazon, Geico, Goldman Sachs, Google, Microsoft, Salesforce

---

## Problem Description
In a gold mine `grid` of size `m x n`, each cell in this mine has an integer representing the amount of gold in that cell, `0` if it is empty.

Return the maximum amount of gold you can collect under the conditions:

- Every time you are located in a cell you will collect all the gold in that cell.
- From your position, you can walk one step to the left, right, up, or down.
- You can't visit the same cell more than once.
- Never visit a cell with `0` gold.
- You can start and stop collecting gold from **any** position in the grid that has some gold.

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 15`
- `0 <= grid[i][j] <= 100`
- There are at most **25** cells containing gold.

## Examples

```
Example 1:
  Input: grid = [[0,6,0],[5,8,7],[0,9,0]]
  Output: 24
  Explanation:
  [[0,6,0],
   [5,8,7],
   [0,9,0]]
  Path to get the maximum gold, 9 -> 8 -> 7.
```

```
Example 2:
  Input: grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]
  Output: 28
  Explanation:
  [[1,0,7],
   [2,0,6],
   [3,4,5],
   [0,3,0],
   [9,0,20]]
  Path to get the maximum gold, 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7.
```

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
