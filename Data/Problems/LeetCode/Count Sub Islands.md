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

You are given two `m x n` binary matrices `grid1` and `grid2` containing only `0`'s (representing water) and `1`'s (representing land). An **island** is a group of `1`'s connected **4-directionally** (horizontal or vertical). Any cells outside of the grid are considered water cells.

An island in `grid2` is considered a **sub-island **if there is an island in `grid1` that contains **all** the cells that make up **this** island in `grid2`.

Return the ***number** of islands in *`grid2` *that are considered **sub-islands***.

**Constraints:**
- `m == grid1.length == grid2.length`
- `n == grid1[i].length == grid2[i].length`
- `1 <= m, n <= 500`
- `grid1[i][j]` and `grid2[i][j]` are either `0` or `1`.

---

## Examples

**Example 1:**
```
Input: grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]], grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]
Output: 3
Explanation: In the picture above, the grid on the left is grid1 and the grid on the right is grid2.
The 1s colored red in grid2 are those considered to be part of a sub-island. There are three sub-islands.
```

**Example 2:**
```
Input: grid1 = [[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]], grid2 = [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]]
Output: 2
Explanation: In the picture above, the grid on the left is grid1 and the grid on the right is grid2.
The 1s colored red in grid2 are those considered to be part of a sub-island. There are two sub-islands.
```

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
