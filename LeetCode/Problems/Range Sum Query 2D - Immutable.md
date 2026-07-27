# 304. Range Sum Query 2D - Immutable

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-sum-query-2d-immutable](https://leetcode.com/problems/range-sum-query-2d-immutable)
**Companies:** Amazon, Bloomberg, Doordash, Google, Meta, Microsoft, Okta, Upstart, Waymo

---

## Approach: 2D Prefix Sum — O(1) per query ✅

```
CLASS NumMatrix:
    CONSTRUCTOR(matrix):
        m, n = dimensions
        prefix = (m+1) × (n+1) matrix of zeros
        FOR i ← 1 TO m:
            FOR j ← 1 TO n:
                prefix[i][j] = matrix[i-1][j-1]
                    + prefix[i-1][j]
                    + prefix[i][j-1]
                    - prefix[i-1][j-1]

    FUNCTION sumRegion(r1, c1, r2, c2):
        RETURN prefix[r2+1][c2+1]
             - prefix[r1][c2+1]
             - prefix[r2+1][c1]
             + prefix[r1][c1]
```

Inclusion-exclusion on the 2D prefix sum.
