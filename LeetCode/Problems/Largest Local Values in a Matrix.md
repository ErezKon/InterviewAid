# 2373. Largest Local Values in a Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-local-values-in-a-matrix](https://leetcode.com/problems/largest-local-values-in-a-matrix)
**Companies:** Bloomberg, Google, Meta, Openai

---

## 1. Problem Description

For each 3×3 subgrid, find the maximum value. Return the `(n-2) × (n-2)` result matrix.

---

## 2. Approach: Brute Force — O(n²) ✅

```
FUNCTION largestLocal(grid):
    n = len(grid)
    result = (n-2) × (n-2) zeros
    FOR r ← 0 TO n - 3:
        FOR c ← 0 TO n - 3:
            result[r][c] = MAX(grid[i][j] for i in range(r, r+3) for j in range(c, c+3))
    RETURN result
```

| Time | Space |
|------|-------|
| O(9·n²) = O(n²) | O(n²) output |

---

## 3. Key Takeaway

> Fixed 3×3 window — just iterate and take max of 9 elements per position. Simple and optimal for this constraint.
