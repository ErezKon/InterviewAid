# 2579. Count Total Number of Colored Cells

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-total-number-of-colored-cells](https://leetcode.com/problems/count-total-number-of-colored-cells)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

After `n` minutes of expanding a diamond pattern on an infinite grid (starting from 1 cell), return the total number of colored cells. Pattern: 1, 5, 13, 25, ...

---

## Key Insight

The diamond pattern adds `4(n-1)` new cells at each step. Summing: `1 + 4(1 + 2 + ... + (n-1)) = 1 + 4·n(n-1)/2 = 2n² - 2n + 1`.

---

## Approach

```
FUNCTION coloredCells(n):
    RETURN 2 * n * (n - 1) + 1
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) |
| **Space** | O(1) |

---

## Key Takeaway

> **Diamond expansion on a grid: formula is `2n² - 2n + 1`. Derived from summing the arithmetic series of new cells per step.**
