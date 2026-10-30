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

Given an `m x n` integer matrix `grid` where each entry is only `0` or `1`, return *the number of **corner rectangles***.

A **corner rectangle** is four distinct `1`'s on the grid that forms an axis-aligned rectangle. Note that only the corners need to have the value `1`. Also, all four `1`'s used must be distinct.

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 200`
- `grid[i][j]` is either `0` or `1`.
- The number of `1`'s in the grid is in the range `[1, 6000]`.

---

## 2. Examples

```
Example 1:
  Input: grid = [[1,0,0,1,0],[0,0,1,0,1],[0,0,0,1,0],[1,0,1,0,1]]
  Output: 1
  Explanation: There is only one corner rectangle, with corners grid[1][2], grid[1][4], grid[3][2], grid[3][4].
```

```
Example 2:
  Input: grid = [[1,1,1],[1,1,1],[1,1,1]]
  Output: 9
  Explanation: There are four 2x2 rectangles, four 2x3 and 3x2 rectangles, and one 3x3 rectangle.
```

```
Example 3:
  Input: grid = [[1,1,1,1]]
  Output: 0
  Explanation: Rectangles must have four distinct corners.
```

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
