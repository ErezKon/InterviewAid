# 1605. Find Valid Matrix Given Row and Column Sums

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-valid-matrix-given-row-and-column-sums](https://leetcode.com/problems/find-valid-matrix-given-row-and-column-sums)
**Companies:** Google, Squarepoint Capital

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy — O(m · n) ✅](#3-approach-greedy--om--n-)
4. [Examples](#4-examples)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Walkthrough](#6-walkthrough)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given two arrays `rowSum` and `colSum` of non-negative integers where `rowSum[i]` is the sum of the elements in the `i^th` row and `colSum[j]` is the sum of the elements of the `j^th` column of a 2D matrix. In other words, you do not know the elements of the matrix, but you do know the sums of each row and column.

Find any matrix of **non-negative** integers of size `rowSum.length x colSum.length` that satisfies the `rowSum` and `colSum` requirements.

Return *a 2D array representing **any** matrix that fulfills the requirements*. It's guaranteed that **at least one **matrix that fulfills the requirements exists.

**Constraints:**
- `1 <= rowSum.length, colSum.length <= 500`
- `0 <= rowSum[i], colSum[i] <= 10^8`
- `sum(rowSum) == sum(colSum)`

---

## 2. Key Insight

> Greedily assign `matrix[i][j] = min(rowSum[i], colSum[j])`, then subtract from both. This always produces a valid matrix.

---

## 3. Approach: Greedy — O(m · n) ✅

```text
FUNCTION restoreMatrix(rowSum, colSum):
    m ← LENGTH(rowSum); n ← LENGTH(colSum)
    matrix ← m × n of 0
    FOR i ← 0 TO m - 1 DO
        FOR j ← 0 TO n - 1 DO
            val ← MIN(rowSum[i], colSum[j])
            matrix[i][j] ← val
            rowSum[i] -= val
            colSum[j] -= val
    RETURN matrix
```

---

## 4. Examples

**Example 1:**
```
Input: rowSum = [3,8], colSum = [4,7]
Output: [[3,0],
         [1,7]]
Explanation: 0^th row: 3 + 0 = 3 == rowSum[0]
1^st row: 1 + 7 = 8 == rowSum[1]
0^th column: 3 + 1 = 4 == colSum[0]
1^st column: 0 + 7 = 7 == colSum[1]
The row and column sums match, and all matrix elements are non-negative.
Another possible matrix is: [[1,2],
                             [3,5]]
```

**Example 2:**
```
Input: rowSum = [5,7,10], colSum = [8,6,8]
Output: [[0,5,0],
         [6,1,0],
         [2,0,8]]
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m · n) |
| **Space** | O(m · n) — the matrix |

---

## 6. Walkthrough

| Step | i | j | rowSum[i] | colSum[j] | val = min | matrix[i][j] |
|------|---|---|----------|----------|----------|--------------|
| 1 | 0 | 0 | 5 | 8 | 5 | 5 |
| 2 | 0 | 1 | 0 | 6 | 0 | 0 |
| 3 | 0 | 2 | 0 | 8 | 0 | 0 |
| 4 | 1 | 0 | 7 | 3 | 3 | 3 |
| … | … | … | … | … | … | … |

The greedy choice always reduces the remaining sums without violating feasibility.

---

## 7. Key Takeaway

> **Greedy min assignment** — at each cell, assign the minimum of remaining row/column sum. This always works because the total row sum equals total column sum.
