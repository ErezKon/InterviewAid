# 1572. Matrix Diagonal Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/matrix-diagonal-sum](https://leetcode.com/problems/matrix-diagonal-sum)
**Companies:** Amazon, Google, Meta, Microsoft, Reliance Retails, Yandex

---

## 1. Problem Description

Return the sum of both diagonals of a square matrix (without double-counting the center).

---

## 2. Approach: Linear Scan — O(n) ✅

```
FUNCTION diagonalSum(mat):
    n = len(mat)
    total = 0
    FOR i ← 0 TO n - 1:
        total += mat[i][i] + mat[i][n-1-i]
    IF n % 2 == 1: total -= mat[n//2][n//2]
    RETURN total
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Sum primary and secondary diagonals. If `n` is odd, the center is counted twice — subtract it once.
