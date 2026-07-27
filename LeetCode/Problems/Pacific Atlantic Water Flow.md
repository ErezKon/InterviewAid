# 417. Pacific Atlantic Water Flow

**Difficulty:** 🟡 Medium
**Acceptance:** 56.0%
**LeetCode:** [https://leetcode.com/problems/pacific-atlantic-water-flow](https://leetcode.com/problems/pacific-atlantic-water-flow)
**Companies:** Adobe, Amazon, Bloomberg, Flipkart, Google, Meta, Microsoft, Nutanix, Servicenow, Tiktok, Uber, Urban Company

---

## 1. Problem Description

Given an m×n island with heights, water can flow to adjacent cells with equal or lower height. The Pacific ocean touches left/top edges; Atlantic touches right/bottom edges. Return all cells from which water can reach **both** oceans.

---

## 2. Approach: Reverse BFS/DFS from Oceans — O(m·n) ✅

Instead of checking each cell, start from the ocean borders and flow **uphill** (to cells with equal or greater height).

```
FUNCTION pacificAtlantic(heights):
    m, n = dimensions
    pacific = m×n boolean matrix
    atlantic = m×n boolean matrix

    // DFS/BFS from Pacific borders (top row + left column)
    FOR each cell on top row or left column:
        dfs(cell, pacific)

    // DFS/BFS from Atlantic borders (bottom row + right column)
    FOR each cell on bottom row or right column:
        dfs(cell, atlantic)

    // Intersection
    result = cells where pacific[r][c] AND atlantic[r][c]
    RETURN result

FUNCTION dfs(r, c, visited):
    visited[r][c] = true
    FOR (dr, dc) IN directions:
        nr, nc = r+dr, c+dc
        IF in bounds AND NOT visited[nr][nc] AND heights[nr][nc] >= heights[r][c]:
            dfs(nr, nc, visited)
```

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) |

---

## Key Takeaway

> Reverse the flow: instead of flowing downhill from each cell, flow uphill from the ocean. This avoids redundant computation and gives O(m·n) total.
