# 1219. Path with Maximum Gold

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-with-maximum-gold](https://leetcode.com/problems/path-with-maximum-gold)
**Companies:** Amazon, Geico, Goldman Sachs, Google, Microsoft, Salesforce

---

```
FUNCTION getMaximumGold(grid):
    maxGold = 0
    FOR r, c where grid[r][c] > 0:
        maxGold = MAX(maxGold, dfs(grid, r, c))
    RETURN maxGold

FUNCTION dfs(grid, r, c):
    IF out of bounds OR grid[r][c] == 0: RETURN 0
    gold = grid[r][c]
    grid[r][c] = 0    // mark visited
    best = MAX(dfs in 4 directions)
    grid[r][c] = gold  // restore
    RETURN gold + best
```
