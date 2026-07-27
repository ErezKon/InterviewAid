# 2536. Increment Submatrices by One

**Difficulty:** 🟡 Medium

**Companies:** Adobe, Google, Meta
---

## 1. Problem Description

Apply multiple range increment operations on submatrices. Return the final matrix.

## 2. Approach: 2D Difference Array — O(n² + q) ✅

```
FUNCTION rangeAddQueries(n, queries):
    diff ← n×n zeros
    FOR each [r1, c1, r2, c2] IN queries DO
        diff[r1][c1] += 1
        IF c2+1 < n: diff[r1][c2+1] -= 1
        IF r2+1 < n: diff[r2+1][c1] -= 1
        IF r2+1 < n AND c2+1 < n: diff[r2+1][c2+1] += 1
    // 2D prefix sum to recover final matrix
    FOR r ← 0 TO n-1 DO
        FOR c ← 1 TO n-1: diff[r][c] += diff[r][c-1]
    FOR c ← 0 TO n-1 DO
        FOR r ← 1 TO n-1: diff[r][c] += diff[r-1][c]
    RETURN diff
```

## Key Takeaway

> **2D difference array** + prefix sum. Apply O(1) per query, recover in O(n²). Classic range update technique.
