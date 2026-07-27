# 3567. Minimum Absolute Difference in Sliding Submatrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-difference-in-sliding-submatrix](https://leetcode.com/problems/minimum-absolute-difference-in-sliding-submatrix)
**Companies:** Amazon, Google

---

## Key Insight

> For each `k × k` submatrix, collect elements, sort them, and find the minimum difference between consecutive sorted values.

---

## Approach

```
FUNCTION minAbsDiffSubmatrix(grid, k):
    m, n ← dimensions of grid
    result ← ARRAY(m-k+1, n-k+1)
    
    FOR r ← 0 TO m-k DO
        FOR c ← 0 TO n-k DO
            vals ← collect all k² elements from grid[r..r+k-1][c..c+k-1]
            SORT vals
            minDiff ← INFINITY
            FOR i ← 1 TO LEN(vals)-1 DO
                IF vals[i] ≠ vals[i-1] THEN
                    minDiff ← MIN(minDiff, vals[i] - vals[i-1])
            result[r][c] ← minDiff IF minDiff ≠ INFINITY ELSE 0
    
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute force per window | **O(mn · k² log k)** | **O(k²)** |

---

## Key Takeaway

> **Sort elements in each submatrix** — minimum absolute difference is between consecutive sorted values. For small `k`, brute force per window is acceptable.

---
