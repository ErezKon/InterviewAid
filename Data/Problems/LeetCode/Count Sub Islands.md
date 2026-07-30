# 1905. Count Sub Islands

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-sub-islands](https://leetcode.com/problems/count-sub-islands)
**Companies:** Amazon, Doordash, Google, Twitter, Zepto

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two `m × n` binary grids `grid1` and `grid2`, an island in `grid2` is a **sub-island** if every cell of that island is also land (`1`) in `grid1`. Return the number of sub-islands in `grid2`.

**Constraints:**
- `m == grid1.length == grid2.length`
- `n == grid1[0].length == grid2[0].length`
- `1 <= m, n <= 500`

---

## Examples

**Example 1:**
- **Input:** Two grids where grid2 has 3 islands, 2 of which are fully contained in grid1's land.
- **Output:** `2`

---

## Key Insight

DFS on each island in `grid2`. During the traversal, if **any** cell of the island is water (`0`) in `grid1`, the entire island is not a sub-island. Important: don't short-circuit the DFS — you must visit all cells to mark them visited.

---

## Approach

```
FUNCTION countSubIslands(grid1, grid2):
    m, n = dimensions
    count = 0

    FUNCTION dfs(r, c):
        IF out of bounds OR grid2[r][c] == 0: RETURN true
        grid2[r][c] = 0
        isSub = grid1[r][c] == 1
        FOR (nr, nc) IN 4 neighbors:
            IF NOT dfs(nr, nc): isSub = false
        RETURN isSub

    FOR r, c where grid2[r][c] == 1:
        IF dfs(r, c): count += 1

    RETURN count
```

**Critical:** Use `isSub = false` (not `return false`) to ensure all cells are visited and marked.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n) — each cell visited once |
| **Space** | O(m × n) — recursion stack in worst case |

---

## Follow-Up Questions

**Q1: Why not short-circuit when a non-sub cell is found?**
If you return early, unvisited cells remain marked as `1` in grid2. They'd be re-discovered as separate islands, leading to incorrect counts.

**Q2: Can this be solved with BFS?**
Yes — use a queue instead of recursion. Track `isSub` as a flag that gets set to false if any cell fails the grid1 check.

---

## Key Takeaway

> **Sub-island detection: DFS on grid2, cross-check each cell against grid1. Never short-circuit — always complete the traversal to properly mark all cells as visited.**
