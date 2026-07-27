# 74. Search a 2D Matrix

**Difficulty:** 🟡 Medium
**Acceptance:** 51.0%
**LeetCode:** [https://leetcode.com/problems/search-a-2d-matrix](https://leetcode.com/problems/search-a-2d-matrix)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Nutanix, Oracle, Paytm, Sap, Tcs, Tiktok, Uber, Walmart Labs, Wissen, Yandex

---

## 1. Problem Description

Given an m×n matrix where each row is sorted and the first element of each row > last element of previous row, determine if a target value is present.

---

## 2. Approach: Binary Search (treat as 1D array) — O(log(m·n)) ✅

```
FUNCTION searchMatrix(matrix, target):
    m, n = dimensions
    lo, hi = 0, m * n - 1

    WHILE lo <= hi:
        mid = (lo + hi) / 2
        val = matrix[mid / n][mid % n]    // convert 1D index to 2D

        IF val == target: RETURN true
        ELSE IF val < target: lo = mid + 1
        ELSE: hi = mid - 1

    RETURN false
```

| Time | Space |
|------|-------|
| O(log(m·n)) | O(1) |

---

## Follow-Up: Search a 2D Matrix II (#240)?

Each row and column are sorted but not globally. Use staircase search from top-right: O(m+n).

---

## Key Takeaway

> When the matrix is "virtually sorted" (row-major order), treat it as a 1D array with index conversion: `row = idx / cols`, `col = idx % cols`.
