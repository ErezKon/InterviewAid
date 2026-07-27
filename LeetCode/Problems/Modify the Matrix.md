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

## 2. Key Insight

> Precompute the max of each column. Then replace every `-1` with its column's max.

---

## 3. Approach: Column Max — O(m·n) ✅

```
FUNCTION modifiedMatrix(matrix):
    m, n = dimensions
    FOR j ← 0 TO n - 1:
        colMax = MAX(matrix[i][j] for i in range(m))
        FOR i ← 0 TO m - 1:
            IF matrix[i][j] == -1:
                matrix[i][j] = colMax
    RETURN matrix
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Simple column aggregation** — compute max per column, then fill in the -1 values.
