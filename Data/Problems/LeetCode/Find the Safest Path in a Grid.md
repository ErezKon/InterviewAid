# 2812. Find the Safest Path in a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-safest-path-in-a-grid](https://leetcode.com/problems/find-the-safest-path-in-a-grid)

**Companies:** Google, Intuit, Uber
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Multi-source BFS + Binary Search — O(n² log n) ✅](#3-approach-multi-source-bfs--binary-search--on²-log-n-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a **0-indexed** 2D matrix `grid` of size `n x n`, where `(r, c)` represents:

- A cell containing a thief if `grid[r][c] = 1`
- An empty cell if `grid[r][c] = 0`

You are initially positioned at cell `(0, 0)`. In one move, you can move to any adjacent cell in the grid, including cells containing thieves.

The **safeness factor** of a path on the grid is defined as the **minimum** manhattan distance from any cell in the path to any thief in the grid.

Return *the **maximum safeness factor** of all paths leading to cell *`(n - 1, n - 1)`*.*

An **adjacent** cell of cell `(r, c)`, is one of the cells `(r, c + 1)`, `(r, c - 1)`, `(r + 1, c)` and `(r - 1, c)` if it exists.

The **Manhattan distance** between two cells `(a, b)` and `(x, y)` is equal to `|a - x| + |b - y|`, where `|val|` denotes the absolute value of val.

**Constraints:**
- `1 <= grid.length == n <= 400`
- `grid[i].length == n`
- `grid[i][j]` is either `0` or `1`.
- There is at least one thief in the `grid`.

---

## 2. Key Insight

> First compute the safety factor (min distance to any thief) for each cell using multi-source BFS. Then binary search on the answer: "can we reach (n-1,n-1) using only cells with safety ≥ mid?"

---

## 3. Approach: Multi-source BFS + Binary Search — O(n² log n) ✅

```text
FUNCTION maximumSafenessFactor(grid):
    // Step 1: Multi-source BFS from all thief cells
    dist ← BFS from all cells where grid[r][c] == 1

    // Step 2: Binary search on safety factor
    lo ← 0; hi ← n
    WHILE lo < hi DO
        mid ← (lo + hi + 1) / 2
        // BFS/DFS: can we reach (n-1,n-1) using cells with dist ≥ mid?
        IF reachable(dist, mid) THEN
            lo ← mid
        ELSE
            hi ← mid - 1

    RETURN lo
```

---

## 4. Examples

**Example 1:**
```
Input: grid = [[1,0,0],[0,0,0],[0,0,1]]
Output: 0
Explanation: All paths from (0, 0) to (n - 1, n - 1) go through the thieves in cells (0, 0) and (n - 1, n - 1).
```

**Example 2:**
```
Input: grid = [[0,0,1],[0,0,0],[0,0,0]]
Output: 2
Explanation: The path depicted in the picture above has a safeness factor of 2 since:
- The closest cell of the path to the thief at cell (0, 2) is cell (0, 0). The distance between them is | 0 - 0 | + | 0 - 2 | = 2.
It can be shown that there are no other paths with a higher safeness factor.
```

**Example 3:**
```
Input: grid = [[0,0,0,1],[0,0,0,0],[0,0,0,0],[1,0,0,0]]
Output: 2
Explanation: The path depicted in the picture above has a safeness factor of 2 since:
- The closest cell of the path to the thief at cell (0, 3) is cell (1, 2). The distance between them is | 0 - 1 | + | 3 - 2 | = 2.
- The closest cell of the path to the thief at cell (3, 0) is cell (3, 2). The distance between them is | 3 - 3 | + | 0 - 2 | = 2.
It can be shown that there are no other paths with a higher safeness factor.
```

---

## 5. Walkthrough

Consider Example 1 (3×3 grid). After multi‑source BFS, each cell receives its Manhattan distance to the thief:
| Cell | Distance |
|------|----------|
| (0,0) | 2 |
| (0,1) | 1 |
| (0,2) | 0 |
| (1,0) | 3 |
| (1,1) | 2 |
| (1,2) | 1 |
| (2,0) | 4 |
| (2,1) | 3 |
| (2,2) | 2 |

Binary search tries mid = 2. A BFS restricted to cells with distance ≥2 finds a path (0,0) → (1,0) → (2,0) → (2,1) → (2,2). Since reachable, lo becomes 2. Next mid = 3 fails, so answer = 2.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n² log n) — BFS + log n binary search iterations |
| **Space** | O(n²) |

---

## 7. Key Takeaway

> **Multi-source BFS** computes distances, then **binary search on answer** checks reachability. Alternative: max‑heap Dijkstra variant for a single‑pass O(n² log n) solution.
