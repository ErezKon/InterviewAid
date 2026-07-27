# 861. Score After Flipping Matrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/score-after-flipping-matrix](https://leetcode.com/problems/score-after-flipping-matrix)
**Companies:** Amazon, Google, Iit Bombay

---

## Problem Description

Given a binary matrix, you can flip any row or column. Maximize the sum of all rows interpreted as binary numbers.

---

## Key Insight

> The leftmost bit has the highest value. **Greedy:** first flip rows to make column 0 all 1s, then for each subsequent column, maximize 1s (flip column if more 0s than 1s).

---

## Approach

```
FUNCTION matrixScore(grid):
    m, n = dimensions
    // Flip rows so first column is all 1s
    FOR r: IF grid[r][0] == 0: flip row r
    // For each column, flip if more 0s than 1s
    result = 0
    FOR c ← 0 TO n - 1:
        ones = SUM(grid[r][c] for r in range(m))
        ones = MAX(ones, m - ones)
        result += ones * (1 << (n - 1 - c))
    RETURN result
```

| Time | Space |
|------|-------|
| O(m·n) | O(1) |

---

## Key Takeaway

> Greedy bit maximization: the most significant bit matters most. Ensure it's 1 (flip rows), then maximize each subsequent column independently.
