# 2661. First Completely Painted Row or Column

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/first-completely-painted-row-or-column](https://leetcode.com/problems/first-completely-painted-row-or-column)
**Companies:** Amazon, Bloomberg, Citadel, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Position Map + Row/Col Counters — O(m·n) ✅](#3-approach-position-map--rowcol-counters)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a painting order `arr` and an `m × n` matrix `mat`, find the index in `arr` at which a full row or column is first completely painted.

**Constraints:**
- `m · n == arr.length`
- `1 <= m, n <= 10⁵`

---

## 2. Key Insight

> Precompute each value's position in the matrix. As we paint in order, increment row/column counters. Return when any counter hits its target.

---

## 3. Approach: Position Map + Row/Col Counters — O(m·n) ✅

```text
FUNCTION firstCompleteIndex(arr, mat):
    pos ← HashMap: value → (row, col)
    FOR r ← 0 TO m-1 DO
        FOR c ← 0 TO n-1 DO
            pos[mat[r][c]] ← (r, c)

    rowCount ← ARRAY of zeros length m
    colCount ← ARRAY of zeros length n
    FOR i ← 0 TO LENGTH(arr)-1 DO
        r, c ← pos[arr[i]]
        rowCount[r] ← rowCount[r] + 1
        colCount[c] ← colCount[c] + 1
        IF rowCount[r] == n OR colCount[c] == m THEN
            RETURN i
```

---

## 4. Examples

**Example 1:**
```
mat = [[1,2],[3,4]]
arr = [1,3,2,4]
```
Paint order: paint 1 (row0 col0), rowCount[0]=1, colCount[0]=1.
Paint 3 (row1 col0), rowCount[1]=1, colCount[0]=2 → column 0 complete (m=2) → return index 1.

**Example 2:**
```
mat = [[5,6,7],[8,9,10]]
arr = [5,6,8,9,7,10]
```
After painting 5,6,8,9, row0 has 2/3 cells, row1 has 2/3 cells, no full row/col yet. Painting 7 completes row0 (3 cells) → return index 4.

---

## 5. Walkthrough

| Step | Painted Value | (r,c) | rowCount | colCount | Completion? |
|------|---------------|-------|----------|----------|--------------|
| 0 | 1 | (0,0) | [1,0] | [1,0] | No |
| 1 | 3 | (1,0) | [1,1] | [2,0] | Column 0 hits `m=2` → stop |

---

## 6. Complexity Analysis

- **Time:** O(m·n) – building the position map and scanning `arr`.
- **Space:** O(m·n) – storing positions for each matrix element.

---

## 7. Follow-Up Questions

- How would you adapt the solution if `arr` could contain duplicate values?
- Can you solve the problem using only O(m+n) extra space?

---

## 8. Key Takeaway

> **Position lookup + row/column counters** — paint in order, check completion on each step. O(m·n) single pass.
