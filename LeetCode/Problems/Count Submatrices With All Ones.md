# 1504. Count Submatrices With All Ones

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-submatrices-with-all-ones](https://leetcode.com/problems/count-submatrices-with-all-ones)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `m × n` binary matrix `mat`, return the number of submatrices (any rectangle, not just squares) that have **all ones**.

**Constraints:**
- `1 <= m, n <= 150`

---

## Key Insight

For each cell `(r, c)`, precompute `mat[r][c]` = consecutive ones to the right. Then for each cell, expand upwards, tracking the minimum width. Each minimum width at height `k` contributes `minWidth` submatrices (rectangles of width 1..minWidth with that bottom-left corner).

---

## Approach

```
FUNCTION numSubmat(mat):
    m, n = dimensions
    // For each cell, compute consecutive 1s to the right (histogram)
    FOR r ← 0 TO m - 1:
        FOR c ← n - 2 DOWN TO 0:
            IF mat[r][c]: mat[r][c] += mat[r][c+1]

    count = 0
    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            minWidth = infinity
            FOR k ← r DOWN TO 0:
                IF mat[k][c] == 0: BREAK
                minWidth = MIN(minWidth, mat[k][c])
                count += minWidth

    RETURN count
```

---

## Walkthrough

**Input:** `mat = [[1,0,1],[1,1,0],[1,1,0]]`

After computing consecutive-right ones:
```
[[1,0,1],
 [1,1,0],
 [1,1,0]]
```
→ Already in this form (no consecutive pairs here).

For each `(r,c)`, expand upward and track min width. Sum all min widths = total all-ones submatrices.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m² × n) — for each cell, expand up to m rows upward |
| **Space** | O(1) extra (modifying mat in-place) |

---

## Key Takeaway

> **Count all-ones submatrices by precomputing consecutive ones to the right, then for each cell expand upward tracking the narrowest width. Each step adds that width to the count. This generalizes the histogram approach from squares to arbitrary rectangles.**
