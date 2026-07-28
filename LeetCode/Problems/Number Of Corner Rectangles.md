# 750. Number Of Corner Rectangles

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-corner-rectangles](https://leetcode.com/problems/number-of-corner-rectangles)
**Companies:** Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Count Column Pairs — O(m² · n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a binary grid, count the number of axis‑aligned rectangles where all four corners are `1`.

---

## 2. Examples

| grid | rectangles |
|------|------------|
| `[[1,0,1,0],[0,1,0,1],[1,0,1,0]]` | 1 |
| `[[1,1,1],[1,1,1]]` | 9 |

*Explanation*: In the first example, the only rectangle uses the `1`s at positions `(0,0)`, `(0,2)`, `(2,0)`, `(2,2)`. In the second example, any pair of rows combined with any pair of columns forms a rectangle, yielding `C(2,2) * C(3,2) = 1 * 3 = 3` per row pair, total `9`.

---

## 3. Key Insight

> Fix two rows. Count columns where both rows have a `1`. If `k` such columns exist, the number of rectangles from this row pair is `C(k, 2) = k(k‑1)/2`.

---

## 4. Approach: Count Column Pairs — O(m² · n) ✅

```text
FUNCTION countCornerRectangles(grid):
    m ← NUMBER OF ROWS(grid)
    n ← NUMBER OF COLUMNS(grid)
    total ← 0
    FOR r1 ← 0 TO m - 2:
        FOR r2 ← r1 + 1 TO m - 1:
            common ← 0
            FOR c ← 0 TO n - 1:
                IF grid[r1][c] == 1 AND grid[r2][c] == 1:
                    common ← common + 1
            total ← total + common * (common - 1) / 2
    RETURN total
```

---

## 5. Walkthrough

Consider the grid `[[1,1,1],[1,1,1]]`.

| Step | r1 | r2 | common columns | rectangles added |
|------|----|----|----------------|------------------|
| 1 | 0 | 1 | columns 0,1,2 → 3 | 3 * (3‑1) / 2 = 3 |

The algorithm iterates over the single pair of rows, finds three shared `1`s, and adds `3` rectangles, matching the expected answer.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m² · n) |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

1. How would you adapt the solution for a sparse grid using hash maps?
2. Can the algorithm be parallelized across row pairs?
3. What changes are needed if rectangles can be non‑axis aligned?

---

## 8. Key Takeaway

> **Combinatorics on row pairs.** For each pair of rows, count shared `1` columns. Rectangles = C(shared, 2). Optimizations with hash maps help for sparse inputs.
