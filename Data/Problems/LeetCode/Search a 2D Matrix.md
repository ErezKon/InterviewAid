# 74. Search a 2D Matrix

**Difficulty:** 🟡 Medium
**Acceptance:** 51.0%
**LeetCode:** [https://leetcode.com/problems/search-a-2d-matrix](https://leetcode.com/problems/search-a-2d-matrix)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Nutanix, Oracle, Paytm, Sap, Tcs, Tiktok, Uber, Walmart Labs, Wissen, Yandex

---

## 1. Problem Description

Given an m×n matrix where each row is sorted and the first element of each row > last element of previous row, determine if a target value is present.

---

## 2. Examples

**Example 1:**
```
matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
target = 3
Output: true
```

**Example 2:**
```
matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
target = 13
Output: false
```

---

## 3. Approach: Binary Search (treat as 1D array) — O(log(m·n)) ✅

```text
FUNCTION searchMatrix(matrix, target):
    SET m ← number of rows
    SET n ← number of columns
    SET lo ← 0
    SET hi ← m * n - 1
    WHILE lo <= hi:
        SET mid ← (lo + hi) // 2
        SET row ← mid // n
        SET col ← mid % n
        SET val ← matrix[row][col]
        IF val == target:
            RETURN true
        ELSE IF val < target:
            SET lo ← mid + 1
        ELSE:
            SET hi ← mid - 1
    RETURN false
```

---

## 4. Walkthrough

Consider Example 1 with target = 3.
| Step | lo | hi | mid | row | col | val | Action |
|------|----|----|-----|-----|-----|-----|--------|
| 1 | 0 | 11 | 5 | 1 | 1 | 11 | val > target → hi = 4 |
| 2 | 0 | 4 | 2 | 0 | 2 | 5 | val > target → hi = 1 |
| 3 | 0 | 1 | 0 | 0 | 0 | 1 | val < target → lo = 1 |
| 4 | 1 | 1 | 1 | 0 | 1 | 3 | val == target → return true |

The algorithm narrows the search space by half each iteration.

---

## 5. Complexity Analysis

- **Time:** O(log(m·n)) – binary search on virtual 1D array.
- **Space:** O(1) – only index variables are used.

---

## 6. Follow-Up Questions

- How would you search a matrix where each row and column is sorted but not globally? (See problem #240 – Staircase Search.)
- Can you modify the approach to return the position of the target instead of a boolean?

---

## Key Takeaway

> When the matrix is "virtually sorted" (row‑major order), treat it as a 1D array with index conversion: `row = idx / cols`, `col = idx % cols`.
