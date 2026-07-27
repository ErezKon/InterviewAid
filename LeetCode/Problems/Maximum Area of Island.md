# 695. Maximum Area of Island

**Difficulty:** 🟡 Medium
**Acceptance:** 75.0%
**LeetCode:** [https://leetcode.com/problems/max-area-of-island](https://leetcode.com/problems/max-area-of-island)
**Companies:** Amazon, Anduril, Apple, Bloomberg, Doordash, Expedia, Goldman Sachs, Google, Grubhub, Intuit, Linkedin, Meta, Microsoft, Oracle, Roku, Schlumberger, Snowflake, Tiktok, Zoho

---

## 1. Problem Description

Given a binary grid, return the area of the largest island (connected `1`s). Return 0 if no island.

---

## 2. Approach: DFS — O(m·n) ✅

```
FUNCTION maxAreaOfIsland(grid):
    maxArea = 0
    FOR r ← 0 TO m-1:
        FOR c ← 0 TO n-1:
            IF grid[r][c] == 1:
                maxArea = MAX(maxArea, dfs(grid, r, c))
    RETURN maxArea

FUNCTION dfs(grid, r, c):
    IF out of bounds OR grid[r][c] != 1: RETURN 0
    grid[r][c] = 0      // mark visited
    RETURN 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1)
```

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) stack |

---

## Key Takeaway

> Same as Number of Islands but return the area (size of each DFS) instead of counting components.
