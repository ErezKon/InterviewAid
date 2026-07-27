# 963. Minimum Area Rectangle II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-area-rectangle-ii](https://leetcode.com/problems/minimum-area-rectangle-ii)
**Companies:** Google, Verily

---

## Key Insight

> Unlike axis-aligned rectangles, these can be rotated. Two diagonals of a rectangle share the **same midpoint and same length**. Group point pairs by (midpoint, diagonal_length). For each group, any two pairs form a rectangle — compute area via cross product.

---

## Approach: Diagonal Grouping — O(n²) ✅

```
FUNCTION minAreaFreeRect(points):
    n ← LEN(points)
    diags ← defaultdict(list)
    
    FOR i ← 0 TO n-1 DO
        FOR j ← i+1 TO n-1 DO
            mx ← (points[i][0] + points[j][0]) / 2
            my ← (points[i][1] + points[j][1]) / 2
            d ← dist²(points[i], points[j])
            diags[(mx, my, d)].ADD((i, j))
    
    minArea ← INFINITY
    FOR group IN diags.values() DO
        FOR (i1, j1), (i2, j2) IN pairs(group) DO
            // Compute area using vectors
            area ← |cross(P[i1]-P[i2], P[i1]-P[j2])|
            minArea ← MIN(minArea, area)
    
    RETURN minArea IF minArea < INFINITY ELSE 0
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Diagonal grouping | **O(n² + k²)** per group | **O(n²)** |

---

## Key Takeaway

> **Rectangle from diagonals** — two diagonals with the same midpoint and length form a rectangle. Group by these properties and compute areas.

---
