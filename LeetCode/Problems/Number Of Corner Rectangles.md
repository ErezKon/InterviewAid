# 750. Number Of Corner Rectangles

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-corner-rectangles](https://leetcode.com/problems/number-of-corner-rectangles)
**Companies:** Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Count Column Pairs — O(m² · n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a binary grid, count the number of axis-aligned rectangles where all four corners are `1`.

---

## 2. Key Insight

> Fix two rows. Count columns where both rows have a `1`. If `k` such columns exist, the number of rectangles from this row pair is `C(k, 2) = k(k-1)/2`.

---

## 3. Approach: Count Column Pairs — O(m² · n) ✅

```
FUNCTION countCornerRectangles(grid):
    count = 0
    FOR r1 ← 0 TO m - 2:
        FOR r2 ← r1 + 1 TO m - 1:
            common = 0
            FOR c ← 0 TO n - 1:
                IF grid[r1][c] == 1 AND grid[r2][c] == 1:
                    common += 1
            count += common * (common - 1) / 2
    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m² · n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Combinatorics on row pairs.** For each pair of rows, count shared `1` columns. Rectangles = C(shared, 2). Can optimize with hash maps for sparse grids.
