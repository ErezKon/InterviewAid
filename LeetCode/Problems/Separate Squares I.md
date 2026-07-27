# 3453. Separate Squares I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/separate-squares-i](https://leetcode.com/problems/separate-squares-i)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

Given axis-aligned squares on a plane, find a horizontal line y-coordinate that divides the total area equally above and below.

---

## Approach

```
FUNCTION separateSquares(squares):
    lo, hi ← min_y, max_y+side
    WHILE hi - lo > 1e-6:
        mid ← (lo + hi) / 2
        areaBelow ← sum of clipped area below mid for each square
        IF areaBelow < totalArea / 2: lo ← mid
        ELSE: hi ← mid
    RETURN (lo + hi) / 2
```

Binary search on y-coordinate. For each candidate, compute area below by clipping each square.

| Time | Space |
|------|-------|
| O(n · log(range/ε)) | O(1) |
