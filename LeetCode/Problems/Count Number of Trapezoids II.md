# 3625. Count Number of Trapezoids II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-number-of-trapezoids-ii](https://leetcode.com/problems/count-number-of-trapezoids-ii)
**Companies:** Google, Meta

---

## 1. Problem Description

Given a set of points in 2D, count the number of quadruples that form a trapezoid (exactly one pair of parallel sides).

---

## 2. Key Insight

> Two line segments are parallel iff they have the same slope. Group all pairs of points by their slope. For each slope, count pairs of segments that share no endpoint and form a valid trapezoid. Subtract rectangles (two pairs of parallel sides).

---

## 3. Approach: Slope Grouping + Combinatorics — O(n² log n) ✅

```
FUNCTION countTrapezoids(points):
    // For each pair of points, compute slope (as reduced fraction)
    // Group edges by slope
    slopeMap = defaultdict(list)  // slope → list of (point_i, point_j) pairs
    
    FOR i FROM 0 TO n-1:
        FOR j FROM i+1 TO n-1:
            slope = reducedFraction(dy, dx)
            slopeMap[slope].ADD((i, j))
    
    // For each slope group with m edges:
    //   Choose 2 edges with no shared endpoint → trapezoid candidate
    //   Subtract cases where both pairs of opposite sides are parallel (rectangles)
    
    totalTrapezoids = 0
    FOR slope, edges IN slopeMap:
        // Count valid pairs of non-adjacent parallel edges
        // C(m, 2) minus pairs sharing an endpoint
        ...
    
    // Subtract parallelograms (counted twice, once per parallel direction)
    RETURN totalTrapezoids
```

| Time | Space |
|------|-------|
| O(n² log n) | O(n²) |

---

## Key Takeaway

> Trapezoid detection: group edges by slope, pick two non-adjacent parallel edges, then subtract parallelograms. Slope representation as reduced fractions avoids floating-point issues.
