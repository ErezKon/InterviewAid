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

You are given a **0-indexed** integer array `arr`, and an `m x n` integer **matrix** `mat`. `arr` and `mat` both contain **all** the integers in the range `[1, m * n]`.

Go through each index `i` in `arr` starting from index `0` and paint the cell in `mat` containing the integer `arr[i]`.

Return *the smallest index* `i` *at which either a row or a column will be completely painted in* `mat`.

**Constraints:**
- `m == mat.length`
- `n = mat[i].length`
- `arr.length == m * n`
- `1 <= m, n <= 10^5`
- `1 <= m * n <= 10^5`
- `1 <= arr[i], mat[r][c] <= m * n`
- All the integers of `arr` are **unique**.
- All the integers of `mat` are **unique**.

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
Input: arr = [1,3,4,2], mat = [[1,4],[2,3]]
Output: 2
Explanation: The moves are shown in order, and both the first row and second column of the matrix become fully painted at arr[2].
```

**Example 2:**
```
Input: arr = [2,8,7,4,1,3,5,6,9], mat = [[3,2,5],[1,4,6],[8,7,9]]
Output: 3
Explanation: The second column becomes fully painted at arr[3].
```

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
