# 3382. Maximum Area Rectangle With Point Constraints II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-area-rectangle-with-point-constraints-ii](https://leetcode.com/problems/maximum-area-rectangle-with-point-constraints-ii)
**Companies:** Google, Ukg

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sweep Line + Segment Tree — O(n² log n)](#approach-sweep-line--segment-tree--on²-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Same as Part I but with larger constraints — find the maximum area axis-aligned rectangle with corners at given points and no other points inside or on the boundary. Requires an efficient approach.

---

## Key Insight

> Group points by x-coordinate. For each pair of x-coordinates sharing at least 2 y-values, check if the rectangle formed has no interior points. Use a **sweep line** with a data structure (segment tree or BIT) to efficiently query whether a region is empty.

---

## Approach: Sweep Line + Segment Tree — O(n² log n) ✅

```
FUNCTION maxRectArea(points):
    // Group by x; sort by x
    // For each pair of x-columns with shared y-values:
    //   Check if rectangle (x1,y1,x2,y2) is empty inside
    //   Use 2D range query or sweep with sorted events
    
    // Enumerate pairs of y-coordinates for each x-pair
    // Use hash map of (y1, y2) → previous x to avoid re-scanning
    
    result = -1
    prevX = {}    // (y1, y2) → last x seen with both y's
    FOR x IN sorted unique x-values:
        yVals = sorted y-values at x
        FOR i, j IN pairs of yVals:
            IF (yVals[i], yVals[j]) IN prevX:
                px = prevX[(yVals[i], yVals[j])]
                // Check no points inside [px, x] × [yVals[i], yVals[j]]
                area = (x - px) * (yVals[j] - yVals[i])
                result = MAX(result, area)
            prevX[(yVals[i], yVals[j])] = x
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sweep + pair tracking | **O(n² log n)** | O(n²) |

---

## Key Takeaway

> **Track (y1, y2) pairs across x-columns using a hash map.** The last x-column that had both y-values forms the closest valid rectangle. Use range queries for the interior emptiness check.
