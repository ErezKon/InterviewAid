# 417. Pacific Atlantic Water Flow

**Difficulty:** 🟡 Medium
**Acceptance:** 56.0%
**LeetCode:** [https://leetcode.com/problems/pacific-atlantic-water-flow](https://leetcode.com/problems/pacific-atlantic-water-flow)
**Companies:** Adobe, Amazon, Bloomberg, Flipkart, Google, Meta, Microsoft, Nutanix, Servicenow, Tiktok, Uber, Urban Company

---

## 1. Problem Description

Given an `m × n` matrix of integer heights representing an island, water can flow from a cell to any of its four adjacent cells (up, down, left, right) if the adjacent cell's height is **less than or equal** to the current cell's height. The Pacific ocean touches the island's **top** and **left** edges, while the Atlantic ocean touches the **bottom** and **right** edges. Return **all coordinates** `[r, c]` from which water can flow to **both** oceans.

---

## 2. Examples

| Input `heights` | Output Coordinates |
|-----------------|--------------------|
| `[[1,2,2],[3,2,3],[2,4,5]]` | `[[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]` |
| `[[1,1],[1,1]]` | `[[0,0],[0,1],[1,0],[1,1]]` |

*Explanation*: Starting from each listed cell, water can travel uphill (or stay level) to reach both the Pacific (top/left) and Atlantic (bottom/right) borders.

---

## 3. Approach: Reverse BFS/DFS from Oceans — O(m·n) ✅

```text
FUNCTION pacificAtlantic(heights):
    m ← number of rows, n ← number of columns
    pacific ← m×n boolean matrix initialized to FALSE
    atlantic ← m×n boolean matrix initialized to FALSE

    // Start DFS/BFS from Pacific borders (top row + left column)
    FOR each cell (r, c) on top row OR left column:
        dfs(r, c, heights, pacific)

    // Start DFS/BFS from Atlantic borders (bottom row + right column)
    FOR each cell (r, c) on bottom row OR right column:
        dfs(r, c, heights, atlantic)

    result ← []
    FOR r ← 0 TO m-1:
        FOR c ← 0 TO n-1:
            IF pacific[r][c] AND atlantic[r][c]:
                APPEND [r, c] TO result
    RETURN result

FUNCTION dfs(r, c, heights, visited):
    visited[r][c] ← TRUE
    FOR each (dr, dc) IN [(1,0), (-1,0), (0,1), (0,-1)]:
        nr ← r + dr, nc ← c + dc
        IF nr IN [0,m) AND nc IN [0,n) AND NOT visited[nr][nc] AND heights[nr][nc] >= heights[r][c]:
            dfs(nr, nc, heights, visited)
```

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) |

---

## 4. Walkthrough

Consider the matrix:
```
1 2 2
3 2 3
2 4 5
```
1. **Pacific DFS** starts from cells `(0,0)`, `(0,1)`, `(0,2)`, `(1,0)`. It can reach cells `{(0,0),(0,1),(0,2),(1,0),(1,1),(2,0)}`.
2. **Atlantic DFS** starts from cells `(2,2)`, `(2,1)`, `(2,0)`, `(1,2)`. It can reach cells `{(2,2),(2,1),(2,0),(1,2),(0,2),(1,1),(0,1)}`.
3. **Intersection** of the two reachable sets yields the result coordinates listed in the example.

---

## 5. Complexity Analysis

- **Time:** Each cell is visited at most twice (once from each ocean) → **O(m·n)**.
- **Space:** Two boolean matrices of size `m·n` and recursion/queue stack → **O(m·n)** auxiliary space.

---

## 6. Follow-Up Questions

1. How would you adapt the solution to work with **diagonal** water flow?
2. Can you implement the same logic using an **iterative BFS** with a queue instead of recursion?
3. How would the algorithm change if the water could also flow **downhill** (to lower heights) as well as uphill?

---

## Key Takeaway

> Reverse the flow: instead of checking every cell individually, start from the oceans and flow **uphill**. This captures all cells that can reach each ocean in linear time.
