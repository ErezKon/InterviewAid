# 311. Sparse Matrix Multiplication

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sparse-matrix-multiplication](https://leetcode.com/problems/sparse-matrix-multiplication)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Meta, Nuro, Oracle, Pinterest, Tiktok

---

## Approach: Skip Zeros — O(m·n·k) optimized ✅

```
FUNCTION multiply(mat1, mat2):
    m, k, n = dimensions
    result = m × n zeros

    FOR i ← 0 TO m - 1:
        FOR j ← 0 TO k - 1:
            IF mat1[i][j] == 0: CONTINUE    // skip zeros
            FOR l ← 0 TO n - 1:
                result[i][l] += mat1[i][j] * mat2[j][l]

    RETURN result
```

For truly sparse matrices, store as list of (row, col, val) and use hash maps.
