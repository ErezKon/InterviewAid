# 764. Largest Plus Sign

**Difficulty:** 🟡 Medium
**Companies:** Meta, Twitter

---

## 1. Problem Description

Given an `n × n` grid with some mines, find the largest axis-aligned plus sign (+) made of 1s. Return the order (arm length).

---

## 2. Approach: DP in 4 Directions — O(n²) ✅

For each cell, compute the max consecutive 1s in all 4 directions. The plus sign order = min of 4 arms.

```
FUNCTION orderOfLargestPlusSign(n, mines):
    banned = SET(tuple(m) for m in mines)
    // dp[r][c] = min arm length across all 4 directions
    // 4 passes: left→right, right→left, top→bottom, bottom→top
    FOR each direction:
        FOR each cell: compute consecutive 1s
    result = MAX(MIN(left, right, up, down) for each cell)
    RETURN result
```

| Time | Space |
|------|-------|
| O(n²) | O(n²) |

---

## 3. Key Takeaway

> DP in 4 directions computes consecutive 1s from each side. The plus sign at each cell is the minimum arm across all 4 directions.
