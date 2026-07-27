# 240. Search a 2D Matrix II

**Difficulty:** 🟡 Medium
**Acceptance:** 54.0%
**LeetCode:** [https://leetcode.com/problems/search-a-2d-matrix-ii](https://leetcode.com/problems/search-a-2d-matrix-ii)
**Companies:** Amazon, Apple, Baidu, Bloomberg, Bytedance, Goldman Sachs, Google, Meta, Microsoft, Motive, Oracle, Paypal, Tiktok, Tripadvisor, Uber, Whatnot, Zomato

---

## 1. Problem Description

Each row and each column of the m×n matrix is sorted in ascending order. Search for a target value.

---

## 2. Approach: Staircase Search — O(m+n) ✅

Start from top-right (or bottom-left). If current > target, go left. If current < target, go down.

```
FUNCTION searchMatrix(matrix, target):
    r = 0
    c = n - 1

    WHILE r < m AND c >= 0:
        IF matrix[r][c] == target:
            RETURN true
        ELSE IF matrix[r][c] > target:
            c -= 1
        ELSE:
            r += 1

    RETURN false
```

### Why Top-Right?

At `(r, c)`: going left decreases value, going down increases value. This gives a binary-search-like elimination of a row or column at each step.

| Time | Space |
|------|-------|
| O(m + n) | O(1) |

---

## Key Takeaway

> Staircase search from the top-right corner: eliminate a row or column at each step. More efficient than binary search per row (O(m log n)) for this particular matrix structure.
