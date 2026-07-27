# 980. Unique Paths III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/unique-paths-iii](https://leetcode.com/problems/unique-paths-iii)
**Companies:** Amazon, Bloomberg, Databricks, Goldman Sachs, Google, Meta, Microsoft

---

## Approach: Backtracking — O(3^(m·n)) ✅

```
FUNCTION uniquePathsIII(grid):
    empty = 0
    start = null
    FOR r, c in grid:
        IF grid[r][c] == 1: start = (r, c)
        IF grid[r][c] != -1: empty += 1

    count = 0
    FUNCTION dfs(r, c, remaining):
        IF grid[r][c] == 2:
            IF remaining == 1: count += 1
            RETURN

        temp = grid[r][c]
        grid[r][c] = -1    // mark visited

        FOR (nr, nc) IN 4 directions:
            IF valid AND grid[nr][nc] != -1:
                dfs(nr, nc, remaining - 1)

        grid[r][c] = temp    // backtrack

    dfs(start[0], start[1], empty)
    RETURN count
```

Visit every non-obstacle cell exactly once. Backtracking explores all valid Hamiltonian paths.
