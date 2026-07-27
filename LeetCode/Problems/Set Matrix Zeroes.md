# 73. Set Matrix Zeroes

**Difficulty:** 🟡 Medium
**Acceptance:** 56.0%
**LeetCode:** [https://leetcode.com/problems/set-matrix-zeroes](https://leetcode.com/problems/set-matrix-zeroes)
**Companies:** Amazon, Apple, Autodesk, Bloomberg, Ebay, Goldman Sachs, Google, Infosys, Jpmorgan, Juspay, Meta, Microsoft, Nutanix, Nvidia, Nykaa, Oracle, Paypal, Servicenow, Tcs, Uber, Walmart Labs, Zoho, Zscaler

---

## 1. Problem Description

Given an `m x n` integer matrix, if an element is `0`, set its entire row and column to `0`. Do it **in place**.

---

## 2. Approach: Use First Row/Col as Markers — O(m·n) time, O(1) space ✅

```
FUNCTION setZeroes(matrix):
    m, n = dimensions
    firstRowZero = false
    firstColZero = false

    // Check if first row/col have zeros
    FOR j ← 0 TO n-1:
        IF matrix[0][j] == 0: firstRowZero = true
    FOR i ← 0 TO m-1:
        IF matrix[i][0] == 0: firstColZero = true

    // Use first row/col as markers
    FOR i ← 1 TO m-1:
        FOR j ← 1 TO n-1:
            IF matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0

    // Zero out cells based on markers
    FOR i ← 1 TO m-1:
        FOR j ← 1 TO n-1:
            IF matrix[i][0] == 0 OR matrix[0][j] == 0:
                matrix[i][j] = 0

    // Handle first row and column
    IF firstRowZero:
        FOR j ← 0 TO n-1: matrix[0][j] = 0
    IF firstColZero:
        FOR i ← 0 TO m-1: matrix[i][0] = 0
```

---

## Key Takeaway

> Use the matrix itself as storage for markers. The first row and column serve as flags for which rows/columns need zeroing. Handle them separately to avoid circular dependencies.
