# 3071. Minimum Operations to Write the Letter Y on a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-write-the-letter-y-on-a-grid](https://leetcode.com/problems/minimum-operations-to-write-the-letter-y-on-a-grid)
**Companies:** Amazon, Capital One, Roblox, Tiktok, Uber, Visa, Ziprecruiter

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Enumerate Value Assignments — O(n²)](#4-approach-enumerate-value-assignments--on²)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an `n × n` grid (n is odd) where each cell contains `0`, `1`, or `2`, you want to make the letter **Y** visible. The Y consists of:
- Two diagonal lines from top-left and top-right corners meeting at center `(n/2, n/2)`
- A vertical line from center down to bottom

All Y cells must have the **same value**, and all non-Y cells must have a **different same value**. Each operation changes one cell's value. Return the **minimum** operations.

**Constraints:**
- `3 <= n <= 49`, n is odd
- `grid[i][j] ∈ {0, 1, 2}`

---

## 2. Examples

```
Example 1:
  Input: grid = [[1,0,2],[0,0,0],[2,0,1]], n=3
  Y cells: (0,0), (0,2), (1,1), (2,1)
  Non-Y cells: (0,1), (1,0), (1,2), (2,0), (2,2)
  Try Y=0, non-Y=1: change (0,0)→0(1op), (0,2)→0(1op), (2,1)→0(1op)
                     + non-Y to 1: (0,1)→1(1op), (2,0)→1(1op), (2,2)→1(0op)... etc.

Example 2:
  Input: grid = [[0,0,0],[0,0,0],[0,0,0]]
  Output: 0 if all Y cells = 0 and non-Y cells = some other value...
  Actually non-Y cells are also 0, so they need to change. Output depends on counts.
```

---

## 3. Key Insight

> There are only **3 × 2 = 6** possible assignments (Y-value ∈ {0,1,2}, non-Y-value ∈ {0,1,2} \ {Y-value}). For each, the cost is `(Y cells not matching Y-value) + (non-Y cells not matching non-Y-value)`. Pre-count frequencies to compute each in O(1).

---

## 4. Approach: Enumerate Value Assignments — O(n²) ✅

```
FUNCTION minimumOperationsToWriteY(grid):
    n = len(grid)
    // Identify Y cells and non-Y cells
    yCount = [0, 0, 0]
    nonYCount = [0, 0, 0]

    FOR r, c in grid:
        IF isYCell(r, c, n):
            yCount[grid[r][c]] += 1
        ELSE:
            nonYCount[grid[r][c]] += 1

    // Try all combinations: Y cells = value a, non-Y = value b (a != b)
    minOps = infinity
    FOR a ← 0 TO 2:
        FOR b ← 0 TO 2:
            IF a == b: CONTINUE
            ops = (totalY - yCount[a]) + (totalNonY - nonYCount[b])
            minOps = MIN(minOps, ops)

    RETURN minOps


FUNCTION isYCell(r, c, n):
    mid = n / 2
    // Upper-left diagonal of Y
    IF r <= mid AND c == r: RETURN TRUE
    // Upper-right diagonal of Y
    IF r <= mid AND c == n - 1 - r: RETURN TRUE
    // Vertical stem of Y
    IF r >= mid AND c == mid: RETURN TRUE
    RETURN FALSE
```

---

## 5. Walkthrough

```
grid = [[1,0,2],
        [0,0,0],
        [2,0,1]], n = 3, mid = 1

Y cells: (0,0)=1, (0,2)=2, (1,1)=0, (2,1)=0
  yCount = [2, 1, 1], totalY = 4

Non-Y cells: (0,1)=0, (1,0)=0, (1,2)=0, (2,0)=2, (2,2)=1
  nonYCount = [3, 1, 1], totalNonY = 5

Enumerate:
  a=0, b=1: (4-2)+(5-1) = 2+4 = 6
  a=0, b=2: (4-2)+(5-1) = 2+4 = 6
  a=1, b=0: (4-1)+(5-3) = 3+2 = 5
  a=1, b=2: (4-1)+(5-1) = 3+4 = 7
  a=2, b=0: (4-1)+(5-3) = 3+2 = 5
  a=2, b=1: (4-1)+(5-1) = 3+4 = 7

Answer = 5 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) — single pass to count, O(1) for 6 combinations |
| **Space** | O(1) — just two count arrays of size 3 |

---

## 7. Follow-Up Questions

**Q1: How do you identify Y cells efficiently?**
A cell (r,c) is a Y cell if: (1) `r ≤ mid AND c == r` (left diagonal), (2) `r ≤ mid AND c == n-1-r` (right diagonal), or (3) `r ≥ mid AND c == mid` (stem).

**Q2: What if there were more than 3 possible values?**
With `k` values, we'd have `k × (k-1)` combinations — still O(k²) which is fine.

**Q3: What if the shape weren't a Y but arbitrary?**
Same approach: partition cells into "shape" and "non-shape", count frequencies, enumerate assignments.

---

## 8. Key Takeaway

> **When the assignment space is tiny (6 options), enumerate all and pick the best.** Pre-counting frequencies makes each evaluation O(1), so the bottleneck is just reading the grid.
