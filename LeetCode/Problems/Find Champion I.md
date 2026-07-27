# 2923. Find Champion I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-champion-i](https://leetcode.com/problems/find-champion-i)
**Companies:** Google

---

## Problem Description

Given a tournament matrix `grid` where `grid[i][j] = 1` means team `i` is stronger than `j`, find the champion (team that beats all others).

---

## Approach: Row Sum Check — O(n²) ✅

```
FUNCTION findChampion(grid):
    n = len(grid)
    FOR i ← 0 TO n - 1:
        IF SUM(grid[i]) == n - 1:  // beats all other teams
            RETURN i
```

---

## Key Takeaway

> **The champion has `n-1` wins (row sum = n-1). Simple scan of the adjacency matrix.**
