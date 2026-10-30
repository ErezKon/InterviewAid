# 2556. Disconnect Path in a Binary Matrix by at Most One Flip

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/disconnect-path-in-a-binary-matrix-by-at-most-one-flip](https://leetcode.com/problems/disconnect-path-in-a-binary-matrix-by-at-most-one-flip)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Two DFS Passes](#approach-two-dfs-passes)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **0-indexed** `m x n` **binary** matrix `grid`. You can move from a cell `(row, col)` to any of the cells `(row + 1, col)` or `(row, col + 1)` that has the value `1`. The matrix is **disconnected** if there is no path from `(0, 0)` to `(m - 1, n - 1)`.

You can flip the value of **at most one** (possibly none) cell. You **cannot flip** the cells `(0, 0)` and `(m - 1, n - 1)`.

Return `true` *if it is possible to make the matrix disconnect or *`false`* otherwise*.

**Note** that flipping a cell changes its value from `0` to `1` or from `1` to `0`.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 1000`
- `1 <= m * n <= 10^5`
- `grid[i][j]` is either `0` or `1`.
- `grid[0][0] == grid[m - 1][n - 1] == 1`

---

## Examples

**Example 1:**
```
Input: grid = [[1,1,1],[1,0,0],[1,1,1]]
Output: true
Explanation: We can change the cell shown in the diagram above. There is no path from (0, 0) to (2, 2) in the resulting grid.
```

**Example 2:**
```
Input: grid = [[1,1,1],[1,0,1],[1,1,1]]
Output: false
Explanation: It is not possible to change at most one cell such that there is not path from (0, 0) to (2, 2).
```

---

## Key Insight

> If there exist **two node-disjoint paths** from `(0,0)` to `(m-1,n-1)`, then flipping one cell can block at most one path. So the answer is `true` iff there do **NOT** exist two node-disjoint paths.

To check: find one path via DFS/BFS, **mark all its internal cells as 0** (block them), then check if a second path still exists. If no second path → answer is `true`.

---

## Approach: Two DFS Passes ✅

```
FUNCTION isPossibleToCutPath(grid):
    m, n ← dimensions of grid

    FUNCTION dfs(r, c):
        IF r = m-1 AND c = n-1 THEN RETURN true
        grid[r][c] ← 0    // mark visited (block this cell)
        
        IF r+1 < m AND grid[r+1][c] = 1 THEN
            IF dfs(r+1, c) THEN RETURN true
        IF c+1 < n AND grid[r][c+1] = 1 THEN
            IF dfs(r, c+1) THEN RETURN true
        
        RETURN false

    // First DFS: find a path and block it
    IF NOT dfs(0, 0) THEN RETURN true   // no path at all

    // Restore start cell (it was blocked by dfs)
    grid[0][0] ← 1

    // Second DFS: check if another path exists
    RETURN NOT dfs(0, 0)
END FUNCTION
```

The trick: the first DFS zeroes out cells as it visits them. After finding a path, those cells are blocked. If a second DFS can't find an alternative path, one flip suffices.

---

## Walkthrough

```
grid = [[1,1,1],
        [1,0,1],
        [1,1,1]]
```

**First DFS from (0,0):** finds path `(0,0)→(0,1)→(0,2)→(1,2)→(2,2)`, zeros them out:
```
[[0,0,0],
 [1,0,0],
 [1,1,1]]
```

Restore `(0,0)`: `grid[0][0] = 1`

**Second DFS from (0,0):** finds path `(0,0)→(1,0)→(2,0)→(2,1)→(2,2)` → path exists!

Two disjoint paths exist → return `false` (can't disconnect with one flip) ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(m × n) | Two DFS traversals |
| **Space** | O(m + n) | Recursion stack (moves only right/down) |

---

## Follow-Up Questions

**Q1: Why does blocking one path's cells work?**
> If the second path shares no internal cells with the first, it survives. If all alternative paths share at least one cell with the first, then there's a bottleneck we can flip.

**Q2: Is this related to max-flow / min-cut?**
> Yes — by Menger's theorem, the max number of node-disjoint paths equals the min vertex cut. We're checking if the min vertex cut is ≤ 1 (excluding source and sink).

**Q3: Why restore (0,0) before the second DFS?**
> The first DFS zeros `(0,0)`, but we need the starting cell available for the second path.

---

## Key Takeaway

> **To check if one cell removal can disconnect all paths: find one path, block it, and check if another exists. Two node-disjoint paths mean no single cut suffices — this is Menger's theorem in action.**
