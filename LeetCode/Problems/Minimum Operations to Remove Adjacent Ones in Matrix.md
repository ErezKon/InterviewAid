# 2123. Minimum Operations to Remove Adjacent Ones in Matrix

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-remove-adjacent-ones-in-matrix](https://leetcode.com/problems/minimum-operations-to-remove-adjacent-ones-in-matrix)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Maximum Bipartite Matching — O(m·n·√(m·n))](#4-approach-maximum-bipartite-matching)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a binary matrix `grid`, you can flip a `1` to `0` in one operation. Return the **minimum** number of operations so that no two adjacent cells (horizontally or vertically) are both `1`.

**Constraints:**
- `1 <= m, n <= 300`
- `grid[i][j]` is `0` or `1`

---

## 2. Examples

```
Example 1:
  Input: grid = [[1,1,0],[0,1,1],[1,1,1]]
  Output: 3
  Explanation: Flip 3 cells so no two 1s are adjacent.

Example 2:
  Input: grid = [[0,0],[0,0]]
  Output: 0
  Explanation: No 1s exist; nothing to do.
```

---

## 3. Key Insight

> This is a **Minimum Vertex Cover** on a grid graph. By König's theorem, in a bipartite graph, minimum vertex cover = maximum matching. A grid is bipartite (checkerboard coloring), so we reduce to **maximum bipartite matching** using Hopcroft-Karp.

Each `1`-cell is a node. Edges connect adjacent `1`-cells. We need the minimum set of nodes (cells to flip to `0`) that covers every edge (pair of adjacent `1`s).

---

## 4. Approach: Maximum Bipartite Matching — O(m·n·√(m·n)) ✅

```
FUNCTION minOperations(grid):
    // Checkerboard partition: (r+c) % 2 == 0 → left set, == 1 → right set
    // Build bipartite graph: edge between adjacent 1-cells

    FOR each cell (r,c) where grid[r][c] == 1 AND (r+c) % 2 == 0:
        FOR each neighbor (nr,nc):
            IF grid[nr][nc] == 1:
                ADD edge from (r,c) to (nr,nc)

    // Run Hopcroft-Karp maximum matching
    RETURN HopcroftKarp(leftNodes, rightNodes, edges)


FUNCTION HopcroftKarp(left, right, edges):
    matchL = {}, matchR = {}
    matching = 0

    WHILE BFS finds augmenting paths:
        FOR each free node in left:
            IF DFS finds augmenting path:
                matching += 1

    RETURN matching
```

---

## 5. Walkthrough

```
grid = [[1,1,0],
        [0,1,1],
        [1,1,1]]

Checkerboard:
  (0,0)=B  (0,1)=W  (0,2)=B
  (1,0)=W  (1,1)=B  (1,2)=W
  (2,0)=B  (2,1)=W  (2,2)=B

1-cells: (0,0)B, (0,1)W, (1,1)B, (1,2)W, (2,0)B, (2,1)W, (2,2)B

Edges (adjacent 1-cells):
  (0,0)-(0,1), (0,1)-(1,1), (1,1)-(1,2), (1,1)-(2,1),
  (1,2)-(2,2), (2,0)-(2,1), (2,1)-(2,2)

Maximum matching = 3 (e.g., (0,0)-(0,1), (1,1)-(1,2), (2,0)-(2,1))
Minimum vertex cover = 3 → flip 3 cells ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n·√(m·n)) — Hopcroft-Karp on bipartite graph |
| **Space** | O(m·n) — adjacency lists and matching arrays |

---

## 7. Follow-Up Questions

**Q1: Why not use a greedy approach?**
Greedy doesn't guarantee optimal vertex cover. Consider a star graph: greedy might pick leaves instead of the center.

**Q2: What's the connection to Independent Set?**
Maximum Independent Set = Total nodes - Minimum Vertex Cover. So this also solves "maximum 1-cells you can keep."

**Q3: Why is Hopcroft-Karp needed vs. simple Hungarian?**
Hopcroft-Karp runs in O(E·√V) vs. O(V·E) for simple augmenting paths. For dense grids, this matters.

---

## 8. Key Takeaway

> **König's theorem is the bridge**: minimum vertex cover = maximum matching in bipartite graphs. Grid problems with "no two adjacent" constraints are bipartite by nature (checkerboard), making matching algorithms directly applicable.
