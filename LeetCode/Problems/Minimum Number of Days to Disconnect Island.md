# 1568. Minimum Number of Days to Disconnect Island

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island](https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island)
**Companies:** Amazon, Argo Ai, Bloomberg, Google

---

```
FUNCTION minDays(grid):
    IF countIslands(grid) != 1: RETURN 0
    // Try removing each land cell
    FOR r, c where grid[r][c] == 1:
        grid[r][c] = 0
        IF countIslands(grid) != 1: RETURN 1
        grid[r][c] = 1
    RETURN 2    // always possible in at most 2 days (corner cell)
```

Answer is always 0, 1, or 2. Check 0, then try each single removal.
