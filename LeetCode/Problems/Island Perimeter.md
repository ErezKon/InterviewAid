# 463. Island Perimeter

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/island-perimeter](https://leetcode.com/problems/island-perimeter)
**Companies:** Amazon, Apple, Bloomberg, Cadence, Google, Josh Technology, Meta, Microsoft, Oracle, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Count + Subtract — O(m·n) ✅](#4-approach-count--subtract--omn-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an `m × n` grid where `1` = land and `0` = water, find the **perimeter** of the island (single connected island, no lakes).

**Constraints:**
- `1 <= m, n <= 100`
- `grid[i][j]` is 0 or 1.
- Exactly one island.

---

## 2. Examples

```
Input:  [[0,1,0,0],
         [1,1,1,0],
         [0,1,0,0],
         [1,1,0,0]]
Output: 16
```

---

## 3. Key Insight

Each land cell contributes **4** edges. Each shared edge with an adjacent land cell (above or left) removes **2** edges (one from each cell). Only check up and left to avoid double-counting.

---

## 4. Approach: Count + Subtract — O(m·n) ✅

```
FUNCTION islandPerimeter(grid):
    perimeter = 0
    FOR r, c where grid[r][c] == 1:
        perimeter += 4
        IF r > 0 AND grid[r-1][c] == 1: perimeter -= 2
        IF c > 0 AND grid[r][c-1] == 1: perimeter -= 2
    RETURN perimeter
```

---

## 5. Walkthrough

```
Grid:  0 1 0 0
       1 1 1 0
       0 1 0 0
       1 1 0 0

Land cells = 7 → 7 × 4 = 28 edges
Shared edges (up/left neighbors): 6 pairs → 6 × 2 = 12 removed
Perimeter = 28 - 12 = 16 ✅
```

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(m·n) | Single pass through grid |
| Space | O(1) | Just a counter |

---

## 7. Follow-Up Questions

### 7.1 What if there are multiple islands?

Run DFS/BFS per island and compute perimeter for each component separately.

### 7.2 What about lakes (water surrounded by land)?

Lakes are internal water cells. Each lake cell removes perimeter from the surrounding land — need to exclude internal water edges.

---

## 8. Key Takeaway

> **4 × land_cells - 2 × shared_edges** gives the perimeter. Only check up and left neighbors to avoid counting shared edges twice. Simple, elegant O(m·n) single-pass solution.
