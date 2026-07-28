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

```text
FUNCTION searchMatrix(matrix, target):
    // m rows, n columns
    SET r ← 0
    SET c ← n - 1
    WHILE r < m AND c >= 0:
        IF matrix[r][c] == target:
            RETURN true
        ELSE IF matrix[r][c] > target:
            SET c ← c - 1
        ELSE:
            SET r ← r + 1
    RETURN false
```

### Why Top-Right?

At `(r, c)`: going left decreases value, going down increases value. This gives a binary-search-like elimination of a row or column at each step.

| Time | Space |
|------|-------|
| O(m + n) | O(1) |

---

## Examples

**Example 1:**
```
matrix = [[1,4,7,11,15],
          [2,5,8,12,19],
          [3,6,9,16,22],
          [10,13,14,17,24],
          [18,21,23,26,30]]
target = 5
Output: true
```

**Example 2:**
```
matrix = [[1,4,7,11,15],
          [2,5,8,12,19],
          [3,6,9,16,22],
          [10,13,14,17,24],
          [18,21,23,26,30]]
target = 20
Output: false
```

---

## Walkthrough

Consider Example 1 with target = 5.
| Step | (r,c) | Value | Action | New (r,c) |
|------|-------|-------|--------|-----------|
| 1 | (0,4) | 15 | >5 → move left | (0,3) |
| 2 | (0,3) | 11 | >5 → move left | (0,2) |
| 3 | (0,2) | 7  | >5 → move left | (0,1) |
| 4 | (0,1) | 4  | <5 → move down | (1,1) |
| 5 | (1,1) | 5  | == target → return true |

The algorithm eliminates one row or column each step, guaranteeing at most m + n steps.

---

## Complexity Analysis

- **Time:** O(m + n) – each iteration discards a row or a column.
- **Space:** O(1) – only a few index variables are used.

---

## Key Takeaway

> Staircase search from the top‑right corner eliminates a row or column at each step, providing a linear‑time solution for a matrix sorted both row‑wise and column‑wise.
