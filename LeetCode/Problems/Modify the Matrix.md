# 3033. Modify the Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/modify-the-matrix](https://leetcode.com/problems/modify-the-matrix)
**Companies:** Fidelity

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Column Max — O(m·n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Replace every `-1` in the matrix with the **maximum** value in its column.

**Constraints:**
- `1 <= m, n <= 50`

---

## Examples

**Example 1:**
```
Input: matrix = [[-1,2,3], [4,-1,6], [7,8,-1]]
Output: [[7,2,3], [4,8,6], [7,8,6]]
Explanation: Column maxes are [7,8,6]; replace each -1 accordingly.
```

**Example 2:**
```
Input: matrix = [[-1,-1], [-1,-1]]
Output: [[-1,-1], [-1,-1]]
Explanation: All values are -1, column max remains -1, so matrix unchanged.
```

---

## 2. Key Insight

> Precompute the max of each column. Then replace every `-1` with its column's max.

---

## 3. Approach: Column Max — O(m·n) ✅

```text
FUNCTION modifiedMatrix(matrix):
    m, n ← dimensions of matrix
    FOR j ← 0 TO n - 1:
        colMax ← -∞
        FOR i ← 0 TO m - 1:
            IF matrix[i][j] > colMax:
                colMax ← matrix[i][j]
        FOR i ← 0 TO m - 1:
            IF matrix[i][j] == -1:
                matrix[i][j] ← colMax
    RETURN matrix
```

---

## Walkthrough

Consider the first example matrix `[[ -1,2,3 ], [4,-1,6 ], [7,8,-1 ]]`.
1. Compute column maxes:
   - Column 0: max( -1, 4, 7 ) = 7
   - Column 1: max( 2, -1, 8 ) = 8
   - Column 2: max( 3, 6, -1 ) = 6
2. Replace `-1` values:
   - Position (0,0) becomes 7
   - Position (1,1) becomes 8
   - Position (2,2) becomes 6
Resulting matrix `[[7,2,3],[4,8,6],[7,8,6]]` matches the output.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n) |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would you modify the algorithm if the matrix could contain `null` values that should be ignored when computing column maxes?
2. Can you solve the problem in a single pass without storing the column maxes explicitly?
3. How would the solution change if you needed to replace `-1` with the **minimum** value of its column instead?

---

## Key Takeaway

> **Simple column aggregation** — compute max per column, then fill in the -1 values.
