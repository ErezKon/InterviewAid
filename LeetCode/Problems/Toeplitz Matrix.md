# 766. Toeplitz Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/toeplitz-matrix](https://leetcode.com/problems/toeplitz-matrix)
**Companies:** Bloomberg, Google, Meta, Tcs, Wipro

---

```
FUNCTION isToeplitzMatrix(matrix):
    FOR r ← 1 TO m - 1:
        FOR c ← 1 TO n - 1:
            IF matrix[r][c] != matrix[r-1][c-1]:
                RETURN false
    RETURN true
```

Every element must equal its top-left diagonal neighbor.
