# 1605. Find Valid Matrix Given Row and Column Sums

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-valid-matrix-given-row-and-column-sums](https://leetcode.com/problems/find-valid-matrix-given-row-and-column-sums)
**Companies:** Google, Squarepoint Capital

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy — O(m · n) ✅](#3-approach-greedy--om--n-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `rowSum` and `colSum` arrays, construct a non-negative matrix where each row sums to `rowSum[i]` and each column sums to `colSum[j]`.

**Constraints:**
- `1 <= m, n <= 500`

---

## 2. Key Insight

> Greedily assign `matrix[i][j] = min(rowSum[i], colSum[j])`, then subtract from both. This always produces a valid matrix.

---

## 3. Approach: Greedy — O(m · n) ✅

```
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

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m · n) |
| **Space** | O(m · n) — the matrix |

---

## 5. Key Takeaway

> **Greedy min assignment** — at each cell, assign the minimum of remaining row/column sum. This always works because the total row sum equals total column sum.
