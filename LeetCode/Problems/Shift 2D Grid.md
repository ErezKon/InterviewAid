# 1260. Shift 2D Grid

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shift-2d-grid](https://leetcode.com/problems/shift-2d-grid)
**Companies:** Amazon

---

## Problem Description

Given an `m × n` grid, shift all elements `k` times: each shift moves every element one position right, wrapping the last column to the first column of the next row.

---

## Approach

```
FUNCTION shiftGrid(grid, k):
    m, n ← dimensions
    flat ← flatten grid to 1D
    k ← k % (m * n)
    flat ← flat[-(k):] + flat[:-(k)]  // rotate right by k
    RETURN reshape flat back to m × n
```

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) |

---

## Key Takeaway

> Flatten to 1D, rotate, reshape back. The 1D index mapping is `newIdx = (oldIdx + k) % (m*n)`.
