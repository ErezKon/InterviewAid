# 1727. Largest Submatrix With Rearrangements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-submatrix-with-rearrangements](https://leetcode.com/problems/largest-submatrix-with-rearrangements)
**Companies:** Amazon, Bloomberg, Directi, Google, Meta, Microsoft

---

## 1. Problem Description

Given a binary matrix, you may rearrange columns in any order. Return the area of the largest all-1s submatrix.

---

## 2. Approach: Histogram + Sort — O(m·n log n) ✅

Build histogram heights (consecutive 1s above). Since columns can be rearranged, sort each row descending and greedily compute max area.

```
FUNCTION largestSubmatrix(matrix):
    m, n = dimensions
    // Build histogram heights
    FOR r ← 1 TO m - 1:
        FOR c ← 0 TO n - 1:
            IF matrix[r][c] == 1:
                matrix[r][c] += matrix[r-1][c]

    maxArea = 0
    FOR r ← 0 TO m - 1:
        row = sorted(matrix[r], reverse=True)
        FOR c ← 0 TO n - 1:
            maxArea = MAX(maxArea, row[c] * (c + 1))

    RETURN maxArea
```

| Time | Space |
|------|-------|
| O(m·n log n) | O(n) |

---

## 3. Key Takeaway

> Histogram heights + sort per row. After sorting descending, `row[c] × (c+1)` gives the max rectangle using the c+1 tallest columns. Column rearrangement makes monotonic stack unnecessary.
