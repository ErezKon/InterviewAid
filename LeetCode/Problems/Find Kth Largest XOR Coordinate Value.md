# 1738. Find Kth Largest XOR Coordinate Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-kth-largest-xor-coordinate-value](https://leetcode.com/problems/find-kth-largest-xor-coordinate-value)
**Companies:** Google

---

## Problem Description

For each coordinate `(i,j)`, compute XOR of all elements in the submatrix `(0,0)` to `(i,j)`. Return the k-th largest value.

---

## Approach: 2D Prefix XOR + Sort — O(mn log(mn)) ✅

```
FUNCTION kthLargestValue(matrix, k):
    m, n = dimensions
    prefix = m × n matrix
    values = []
    FOR i ← 0 TO m - 1:
        FOR j ← 0 TO n - 1:
            prefix[i][j] = matrix[i][j]
            IF i > 0: prefix[i][j] ^= prefix[i-1][j]
            IF j > 0: prefix[i][j] ^= prefix[i][j-1]
            IF i > 0 AND j > 0: prefix[i][j] ^= prefix[i-1][j-1]
            values.ADD(prefix[i][j])
    SORT values descending
    RETURN values[k - 1]
```

---

## Key Takeaway

> **2D prefix XOR (inclusion-exclusion like prefix sums but with XOR). Collect all values, sort or use quickselect for k-th largest.**
