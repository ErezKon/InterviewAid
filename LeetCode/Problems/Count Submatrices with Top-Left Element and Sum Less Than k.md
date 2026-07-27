# 3070. Count Submatrices with Top-Left Element and Sum Less Than k

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-submatrices-with-top-left-element-and-sum-less-than-k](https://leetcode.com/problems/count-submatrices-with-top-left-element-and-sum-less-than-k)
**Companies:** Barclays, Google

---

## Problem Description

Count submatrices anchored at `(0, 0)` ending at `(i, j)` whose sum is ≤ `k`.

---

## Approach

```
FUNCTION countSubmatrices(grid, k):
    m, n = DIMENSIONS(grid)
    prefix = [[0]*(n+1) for _ in range(m+1)]
    result = 0

    FOR i ← 1 TO m DO
        FOR j ← 1 TO n DO
            prefix[i][j] = prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1] + grid[i-1][j-1]
            IF prefix[i][j] <= k: result += 1

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n) |
| **Space** | O(m × n) |

---

## Key Takeaway

> **Anchored submatrix sum queries use standard 2D prefix sums. Just check each prefix sum against the threshold.**
