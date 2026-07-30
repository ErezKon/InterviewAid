# 694. Number of Distinct Islands

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-distinct-islands](https://leetcode.com/problems/number-of-distinct-islands)
**Companies:** Amazon, Anduril, Aurora, Bloomberg, Coupang, Google, Microsoft, Oracle, Servicenow, Snapchat, Splunk, Tiktok, Walmart Labs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DFS + Path Signature — O(m·n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count the number of **distinct island shapes** in a binary grid. Two islands are the same if one can be translated to match the other.

---

## 2. Examples

**Example 1:**
```
Input: grid = [[1,1,0,0,0],[1,0,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]
Output: 1
Explanation: The two islands have the same shape after translation.
```

**Example 2:**
```
Input: grid = [[1,1,0,1,1],[1,0,0,0,1],[0,0,0,0,0],[1,1,0,1,1]]
Output: 2
Explanation: There are two distinct island shapes.
```

---

## 3. Key Insight

> Record each island as relative coordinates from the first cell found. Two islands with the same relative coordinate set have the same shape.

---

## 4. Approach: DFS + Path Signature — O(m·n) ✅

```
FUNCTION numDistinctIslands(grid):
    visited = set()
    shapes = set()

    FOR each cell (r, c) in grid:
        IF grid[r][c] == 1 AND (r, c) NOT IN visited:
            path = []
            dfs(grid, r, c, r, c, visited, path)
            shapes.ADD(tuple(path))

    RETURN len(shapes)

FUNCTION dfs(grid, r, c, baseR, baseC, visited, path):
    IF out of bounds OR visited OR grid[r][c] == 0: RETURN
    visited.ADD((r, c))
    path.ADD((r - baseR, c - baseC))    // relative coordinates
    dfs(grid, r+1, c, baseR, baseC, visited, path)
    dfs(grid, r-1, c, baseR, baseC, visited, path)
    dfs(grid, r, c+1, baseR, baseC, visited, path)
    dfs(grid, r, c-1, baseR, baseC, visited, path)
```

---

## 5. Walkthrough

| Step | Action |
|------|--------|
| 1 | Scan grid; first `1` at (0,0). Start DFS, record relative coords: (0,0), (0,1), (1,0).
| 2 | Continue scanning; next unvisited `1` at (2,3). DFS records (0,0), (0,1), (1,0) – same set as first island.
| 3 | Insert canonical shape `(0,0),(0,1),(1,0)` into set; second island yields identical shape, set size remains 1.
| 4 | End of grid; distinct shape count = 1.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) |
| **Space** | O(m · n) |

---

## 7. Key Takeaway

> **Relative coordinates as shape signature.** Translate each island to origin using offset from first cell. Store as tuple in a set for uniqueness. Alternative: record DFS traversal direction sequence.
