# 542. 01 Matrix

**Difficulty:** 🟡 Medium
**Acceptance:** 48.0%
**LeetCode:** [https://leetcode.com/problems/01-matrix](https://leetcode.com/problems/01-matrix)
**Companies:** Accenture, Adobe, Amazon, Apple, Bloomberg, Doordash, Flipkart, Google, Graviton, Linkedin, Meta, Microsoft, Phonepe, Uber, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Multi-Source BFS — O(m·n) ✅](#4-approach-multi-source-bfs--omn-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an `m × n` binary matrix `mat`, return a matrix of the same dimensions where each cell contains the **distance to the nearest `0`**.

The distance between two adjacent cells (horizontally or vertically) is `1`.

**Constraints:**
- `m == mat.length`, `n == mat[i].length`
- `1 ≤ m, n ≤ 10⁴`
- `1 ≤ m × n ≤ 10⁴`
- `mat[i][j]` is either `0` or `1`
- There is at least one `0` in `mat`

---

## 2. Examples

```
Example 1:
  Input:  [[0,0,0],
           [0,1,0],
           [0,0,0]]
  Output: [[0,0,0],
           [0,1,0],
           [0,0,0]]
  Explanation: The only 1 is at (1,1), nearest 0 is distance 1 away.

Example 2:
  Input:  [[0,0,0],
           [0,1,0],
           [1,1,1]]
  Output: [[0,0,0],
           [0,1,0],
           [1,2,1]]
  Explanation: Cell (2,1) is distance 2 from the nearest 0.
```

Visual:
```
mat:         dist:
0 0 0        0 0 0
0 1 0   →    0 1 0
1 1 1        1 2 1
               ↑
          (2,1) nearest 0 is at (1,2) or (0,1) → distance 2
```

---

## 3. Key Insight

> Instead of searching from each `1` to find the nearest `0` (expensive), **reverse the problem**: start BFS simultaneously from ALL `0` cells. The BFS wavefront naturally computes the shortest distance for every `1` cell.

This is the **multi-source BFS** pattern — identical to filling water from multiple sources at once.

---

## 4. Approach: Multi-Source BFS — O(m·n) ✅

1. Initialize a distance matrix with `0` for all `0`-cells and `∞` for all `1`-cells.
2. Enqueue all `0`-cells as BFS sources.
3. Process BFS level by level — each cell updates unvisited neighbors with `dist + 1`.

```
FUNCTION updateMatrix(mat):
    m, n = dimensions
    dist = m×n matrix of infinity
    queue = []

    // Initialize: all 0-cells have distance 0
    FOR r ← 0 TO m-1:
        FOR c ← 0 TO n-1:
            IF mat[r][c] == 0:
                dist[r][c] = 0
                queue.ENQUEUE((r, c))

    // BFS from all 0-cells
    WHILE queue not empty:
        (r, c) = queue.DEQUEUE()
        FOR (dr, dc) IN [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r+dr, c+dc
            IF in bounds AND dist[nr][nc] > dist[r][c] + 1:
                dist[nr][nc] = dist[r][c] + 1
                queue.ENQUEUE((nr, nc))

    RETURN dist
```

---

## 5. Walkthrough

```
mat = [[0,0,0],
       [0,1,0],
       [1,1,1]]

Step 1 — Initialize:
  dist = [[0, 0, 0],
          [0, ∞, 0],
          [∞, ∞, ∞]]
  queue = [(0,0),(0,1),(0,2),(1,0),(1,2)]  ← all 0-cells

Step 2 — BFS Level 0 (process all 0-cells):
  From (0,0): neighbors already 0 or out of bounds
  From (0,1): neighbor (1,1) updated: dist=1
  From (0,2): neighbor (1,2) already 0
  From (1,0): neighbor (2,0) updated: dist=1
  From (1,2): neighbor (2,2) updated: dist=1
  
  dist = [[0, 0, 0],
          [0, 1, 0],
          [1, ∞, 1]]
  queue = [(1,1),(2,0),(2,2)]

Step 3 — BFS Level 1:
  From (1,1): neighbor (2,1) updated: dist=2
  From (2,0): neighbor (2,1) already queued
  From (2,2): neighbor (2,1) already queued
  
  dist = [[0, 0, 0],
          [0, 1, 0],
          [1, 2, 1]]  ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m·n) — each cell enqueued and processed at most once |
| **Space** | O(m·n) — for the distance matrix and queue |

---

## 7. Follow-Up Questions

### 7.1 Can you solve it with DP instead of BFS?

Yes. Two-pass DP:
- **Pass 1** (top-left → bottom-right): `dist[r][c] = min(dist[r-1][c], dist[r][c-1]) + 1`
- **Pass 2** (bottom-right → top-left): `dist[r][c] = min(dist[r][c], min(dist[r+1][c], dist[r][c+1]) + 1)`

Same O(m·n) time, but O(1) extra space (modifying in-place).

### 7.2 What other problems use multi-source BFS?

| Problem | Sources |
|---------|---------|
| **Walls and Gates** (#286) | All gate cells |
| **Rotting Oranges** (#994) | All rotten oranges |
| **Shortest Bridge** (#934) | All cells of one island |
| **Pacific Atlantic Water Flow** (#417) | Ocean border cells |

### 7.3 Why not BFS from each 1 individually?

That would be O(m·n) per `1`-cell, and up to O((m·n)²) total. Multi-source BFS does it all in one pass.

---

## 8. Key Takeaway

> Multi-source BFS from all target cells simultaneously gives shortest distances in one pass. Same pattern as Walls and Gates (#286) and Rotting Oranges (#994). When you need "distance to nearest X," think **reverse BFS from all X's**.
