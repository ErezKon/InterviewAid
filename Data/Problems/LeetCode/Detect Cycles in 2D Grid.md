# 1559. Detect Cycles in 2D Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/detect-cycles-in-2d-grid](https://leetcode.com/problems/detect-cycles-in-2d-grid)
**Companies:** Amazon, Google, Meta, Microsoft, Nutanix, Weride

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: BFS with Parent Tracking](#approach-bfs-with-parent-tracking)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a 2D grid of characters, return `true` if there exists a **cycle** consisting of the **same character** in the grid.

A cycle is a path of length ≥ 4 that starts and ends at the same cell. From each cell, you can move to any of its 4-directional neighbors (up, down, left, right) **if** they have the **same value**. You cannot revisit the cell you just came from (no immediate U-turn).

**Constraints:**
- `1 <= m, n <= 500`
- `grid[i][j]` is a lowercase English letter.

---

## Examples

**Example 1:**
```
Grid:    a a a a
         a b b a
         a b b a
         a a a a

Output: true
Explanation: The 'a' cells on the border form a cycle.
             The 'b' cells in the center also form a cycle.
```

**Example 2:**
```
Grid:    a b b
         b z b
         b b a

Output: false
Explanation: No same-character cycle of length ≥ 4 exists.
```

---

## Key Insight

> In a graph traversal (BFS/DFS), a **cycle exists** if you encounter an **already-visited cell** that is **not the parent** you came from. By tracking the parent `(px, py)` of each cell, we distinguish a true cycle from simply looking back at where we came from.

This is the standard cycle-detection technique for undirected graphs applied to a 2D grid.

---

## Approach: BFS with Parent Tracking ✅

BFS/DFS within same-value regions. Cycle = revisiting a visited cell that isn't the parent.

```
FUNCTION containsCycle(grid):
    m, n = dimensions
    visited = m×n of false

    FUNCTION bfs(r, c):
        queue = [(r, c, -1, -1)]
        visited[r][c] = true
        WHILE queue:
            (x, y, px, py) = queue.DEQUEUE()
            FOR (nx, ny) IN neighbors:
                IF grid[nx][ny] != grid[x][y]: CONTINUE
                IF NOT visited[nx][ny]:
                    visited[nx][ny] = true
                    queue.ENQUEUE((nx, ny, x, y))
                ELSE IF (nx, ny) != (px, py):
                    RETURN true    // cycle found
        RETURN false

    FOR r, c: IF NOT visited[r][c] AND bfs(r, c): RETURN true
    RETURN false
```

**Alternative: Union-Find**
Instead of BFS, use Union-Find. For each cell, try to union with its right and bottom neighbors of the same value. If two cells are already in the same component before union → cycle detected.

---

## Walkthrough

```
Grid:  a a a
       a b a
       a a a
```

**BFS starting from (0,0) with value 'a':**

| Step | Cell  | Neighbors (same value) | Action |
|------|-------|------------------------|--------|
| 1    | (0,0) | (0,1), (1,0)          | Visit both, parent=(0,0) |
| 2    | (0,1) | (0,2), (0,0)←parent   | Visit (0,2) |
| 3    | (1,0) | (2,0), (0,0)←parent   | Visit (2,0) |
| 4    | (0,2) | (1,2)                 | Visit (1,2) |
| 5    | (2,0) | (2,1)                 | Visit (2,1) |
| 6    | (1,2) | (2,2)                 | Visit (2,2) |
| 7    | (2,1) | (2,2) already visited, not parent | **Cycle found!** ✅ |

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(m × n) | Each cell visited at most once |
| **Space** | O(m × n) | Visited array + BFS queue |

---

## Follow-Up Questions

**Q1: Can DFS be used instead of BFS?**
> Yes. DFS with parent tracking works identically — if you visit a neighbor that's already visited and isn't the parent, there's a cycle.

**Q2: How does Union-Find compare?**
> Union-Find avoids explicit BFS/DFS. Iterate cells left-to-right, top-to-bottom. For each cell, union with its right neighbor and bottom neighbor if same value. If they're already in the same set → cycle. Same O(m×n) time with near-O(1) amortized union/find operations.

**Q3: Why must the cycle length be ≥ 4?**
> In a grid, the shortest possible cycle visits 4 cells forming a 2×2 square. Length-2 cycles (A→B→A) are just going to a neighbor and back, which isn't a true cycle.

**Q4: What if diagonal moves were allowed?**
> Add 4 diagonal directions to the neighbor list. The algorithm stays the same, but cycles could be shorter (length 3 with diagonal + adjacent).

---

## Key Takeaway

> **Cycle detection in an undirected graph (or grid) reduces to a single BFS/DFS with parent tracking — if you reach a visited node that isn't your parent, a cycle exists.**
