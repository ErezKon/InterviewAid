# 73. Set Matrix Zeroes

**Difficulty:** 🟡 Medium
**Acceptance:** 56.0%
**LeetCode:** [https://leetcode.com/problems/set-matrix-zeroes](https://leetcode.com/problems/set-matrix-zeroes)
**Companies:** Amazon, Apple, Autodesk, Bloomberg, Ebay, Goldman Sachs, Google, Infosys, Jpmorgan, Juspay, Meta, Microsoft, Nutanix, Nvidia, Nykaa, Oracle, Paypal, Servicenow, Tcs, Uber, Walmart Labs, Zoho, Zscaler

---

## 1. Problem Description

Given an `m x n` integer matrix, if an element is `0`, set its entire row and column to `0`. Do it **in place**.

---

## 2. Examples

| Input Matrix | Output Matrix |
|--------------|---------------|
| `[[1,1,1],[1,0,1],[1,1,1]]` | `[[1,0,1],[0,0,0],[1,0,1]]` |
| `[[0,1,2,0],[3,4,5,2],[1,3,1,5]]` | `[[0,0,0,0],[0,4,5,0],[0,3,1,0]]` |

*Explanation:* Any row or column containing a zero becomes all zeros.

---

## 3. Approach: Use First Row/Col as Markers — O(m·n) time, O(1) space ✅

```text
FUNCTION setZeroes(matrix):
    m, n ← dimensions of matrix
    firstRowZero ← false
    firstColZero ← false

    // Determine if first row/col need zeroing
    FOR j ← 0 TO n-1:
        IF matrix[0][j] == 0:
            firstRowZero ← true
    FOR i ← 0 TO m-1:
        IF matrix[i][0] == 0:
            firstColZero ← true

    // Use first row/col as markers for other rows/cols
    FOR i ← 1 TO m-1:
        FOR j ← 1 TO n-1:
            IF matrix[i][j] == 0:
                matrix[i][0] ← 0
                matrix[0][j] ← 0

    // Zero out cells based on markers
    FOR i ← 1 TO m-1:
        FOR j ← 1 TO n-1:
            IF matrix[i][0] == 0 OR matrix[0][j] == 0:
                matrix[i][j] ← 0

    // Zero first row/col if needed
    IF firstRowZero:
        FOR j ← 0 TO n-1:
            matrix[0][j] ← 0
    IF firstColZero:
        FOR i ← 0 TO m-1:
            matrix[i][0] ← 0
    RETURN matrix
```

---

## 4. Walkthrough

Consider the matrix `[[1,1,1],[1,0,1],[1,1,1]]`.

| Step | Action | Matrix State |
|------|--------|--------------|
| 1 | Scan first row/col → none zero → `firstRowZero = false`, `firstColZero = false`. | `[[1,1,1],[1,0,1],[1,1,1]]` |
| 2 | Mark zeros using first row/col. Element (1,1) is zero → set `matrix[1][0]=0` and `matrix[0][1]=0`. | `[[1,0,1],[0,0,1],[1,1,1]]` |
| 3 | Zero cells based on markers. Row 1 and Column 1 become zero. | `[[1,0,1],[0,0,0],[1,0,1]]` |
| 4 | No need to zero first row/col (flags false). | `[[1,0,1],[0,0,0],[1,0,1]]` |

The final matrix matches the expected output.

---

## 5. Complexity Analysis

- **Time:** O(m·n) – each cell is visited a constant number of times.
- **Space:** O(1) – only a few boolean flags are used; the matrix is modified in place.

---

## 6. Follow-Up Questions

- How would you modify the algorithm if you were allowed O(m+n) extra space?
- Can you solve the problem using a different in‑place strategy that avoids the first row/col markers?
- How would you extend this to a 3‑dimensional matrix?

---

## Key Takeaway

> Use the matrix itself as storage for markers. The first row and column serve as flags for which rows/columns need zeroing. Handle them separately to avoid circular dependencies.
