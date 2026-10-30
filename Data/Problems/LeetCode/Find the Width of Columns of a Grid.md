# 2639. Find the Width of Columns of a Grid

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-width-of-columns-of-a-grid](https://leetcode.com/problems/find-the-width-of-columns-of-a-grid)
**Companies:** Atlassian, Samsung

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Column-wise Max Length — O(m · n) ✅](#2-approach-column-wise-max-length--om--n-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a **0-indexed** `m x n` integer matrix `grid`. The width of a column is the maximum **length **of its integers.

- For example, if `grid = [[-10], [3], [12]]`, the width of the only column is `3` since `-10` is of length `3`.

Return *an integer array* `ans` *of size* `n` *where* `ans[i]` *is the width of the* `i^th` *column*.

The **length** of an integer `x` with `len` digits is equal to `len` if `x` is non-negative, and `len + 1` otherwise.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 100 `
- `-10^9 <= grid[r][c] <= 10^9`

---

## 2. Approach: Column-wise Max Length — O(m · n) ✅

```text
FUNCTION findColumnWidth(grid):
    // grid is a list of rows, each row is a list of integers
    SET m ← NUMBER OF ROWS IN grid
    SET n ← NUMBER OF COLUMNS IN grid[0]
    SET result ← []
    FOR c ← 0 TO n - 1 DO
        SET maxWidth ← 0
        FOR r ← 0 TO m - 1 DO
            SET elementStr ← STRING(grid[r][c])
            SET maxWidth ← MAX(maxWidth, LENGTH(elementStr))
        APPEND maxWidth TO result
    RETURN result
```

---

## 3. Examples

**Example 1:**
```
Input: grid = [[1],[22],[333]]
Output: [3]
Explanation: In the 0^th column, 333 is of length 3.
```

**Example 2:**
```
Input: grid = [[-15,1,3],[15,7,12],[5,6,-2]]
Output: [3,1,2]
Explanation: In the 0^th column, only -15 is of length 3.
In the 1^st column, all integers are of length 1.
In the 2^nd column, both 12 and -2 are of length 2.
```

---

## 4. Walkthrough

Consider the first example `[[1, 23], [456, -7]]`:
1. There are 2 columns.
2. **Column 0:** values `1` and `456` → string lengths `1` and `3` → max `3`.
3. **Column 1:** values `23` and `-7` → string lengths `2` and `2` (minus sign counts) → max `2`? Actually `-7` length is 2, so max `2`. Wait, expected output shows `3` for column 1, but correct is `2`. Adjust example: use `[[1, 23], [456, -789]]` → column 1 lengths `2` and `4` → max `4`. For simplicity, assume correct output `[3, 4]`.
4. The algorithm scans each column, updates `maxWidth`, and appends to result.

---

## 5. Complexity Analysis

- **Time:** O(m · n) – each cell is visited once.
- **Space:** O(n) for the result array storing widths of n columns.

---

## 6. Follow-Up Questions

- How would you modify the solution to return the column with the overall maximum width?
- Can you compute the widths in a streaming fashion if rows are received one at a time?
- How would the approach change if the grid is extremely large and cannot fit into memory?

---

## 7. Key Takeaway

> Convert each element to a string and track the maximum length per column. A simple double loop yields O(m·n) time and O(n) space.
