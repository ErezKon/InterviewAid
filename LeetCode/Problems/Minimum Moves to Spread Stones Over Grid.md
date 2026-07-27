# 2850. Minimum Moves to Spread Stones Over Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-spread-stones-over-grid](https://leetcode.com/problems/minimum-moves-to-spread-stones-over-grid)
**Companies:** Geico, Google, Guidewire, Microsoft, Tiktok

---

## Approach: Brute Force / BFS on State — O(permutations) ✅

```
FUNCTION minimumMoves(grid):
    // Find sources (cells > 1) and targets (cells == 0)
    sources = [(r, c) for r, c if grid[r][c] > 1, repeated grid[r][c]-1 times]
    targets = [(r, c) for r, c if grid[r][c] == 0]

    // Try all assignments of sources to targets (permutation)
    minCost = infinity
    FOR perm IN permutations(sources):
        cost = SUM(manhattan(perm[i], targets[i]) for i)
        minCost = MIN(minCost, cost)

    RETURN minCost
```
