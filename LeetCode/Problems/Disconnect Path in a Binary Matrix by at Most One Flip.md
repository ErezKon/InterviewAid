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

Given an `m × n` binary matrix `grid`, you can move from `(0, 0)` to `(m-1, n-1)` by moving **right** or **down** through cells with value `1`.

Return `true` if it is possible to flip **at most one** cell from `1` to `0` such that **no path** exists from `(0,0)` to `(m-1,n-1)`. You cannot flip `(0,0)` or `(m-1,n-1)`.

**Constraints:**
- `1 <= m, n <= 1000`
- `grid[i][j]` is 0 or 1.

---

## Examples

**Example 1:**
```
grid = [[1,1,1],
        [1,0,0],
        [1,1,1]]
Output: true
Explanation: Flipping (0,2) or (2,0) disconnects all paths.
```

**Example 2:**
```
grid = [[1,1,1],
        [1,0,1],
        [1,1,1]]
Output: false
Explanation: There are two node-disjoint paths, so flipping one cell can't block both.
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
