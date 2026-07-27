# 939. Minimum Area Rectangle

**Difficulty:** 🟡 Medium

**Companies:** Bytedance, Flipkart, Google, Meta, Microsoft, Snapchat, Verily, Waymo
---

## Key Insight

> For axis-aligned rectangles, two diagonal corners `(x1,y1)` and `(x2,y2)` define a rectangle if the other two corners `(x1,y2)` and `(x2,y1)` also exist in the point set. Check all pairs with different x and y.

---

## Approach: Diagonal Check — O(n²) ✅

```
FUNCTION minAreaRect(points):
    pts ← SET(TUPLE(p) FOR p IN points)
    minArea ← INFINITY
    FOR i ← 0 TO n-1 DO
        FOR j ← i+1 TO n-1 DO
            (x1, y1) ← points[i]
            (x2, y2) ← points[j]
            IF x1 ≠ x2 AND y1 ≠ y2 THEN
                IF (x1, y2) IN pts AND (x2, y1) IN pts THEN
                    minArea ← MIN(minArea, ABS(x1-x2) * ABS(y1-y2))
    RETURN minArea IF minArea < INFINITY ELSE 0
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Pair check with set | **O(n²)** | **O(n)** |

---

## Key Takeaway

> **Axis-aligned rectangle detection** — two points as diagonal + set lookup for the other two corners. O(n²) with hash set.

---
