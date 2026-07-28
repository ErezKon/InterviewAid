# 469. Convex Polygon

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convex-polygon](https://leetcode.com/problems/convex-polygon)
**Companies:** Google

---

## 1. Problem Description

Given a list of points forming a polygon (in order), determine if the polygon is convex.

---

## 2. Key Insight

> A polygon is convex iff all cross products of consecutive edge vectors have the same sign. The cross product tells us if we're always turning the same direction (all left or all right).

---

## 3. Approach: Cross Product Sign Check — O(n) ✅

```text
FUNCTION isConvex(points):
    n = len(points)
    sign = 0
    FOR i FROM 0 TO n-1:
        p0 = points[i]
        p1 = points[(i+1) % n]
        p2 = points[(i+2) % n]
        cross = (p1[0]-p0[0]) * (p2[1]-p1[1]) - (p1[1]-p0[1]) * (p2[0]-p1[0])
        IF cross != 0:
            IF sign == 0:
                sign = 1 IF cross > 0 ELSE -1
            ELSE IF (cross > 0 AND sign < 0) OR (cross < 0 AND sign > 0):
                RETURN false
    RETURN true
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Examples

| Input | Output |
|-------|--------|
| `[[0,0],[2,0],[2,2],[0,2]]` | `true` |
| `[[0,0],[1,1],[2,0],[1,-1]]` | `false` |

---

## Walkthrough

Consider the square `[[0,0],[2,0],[2,2],[0,2]]`:
1. Compute cross product for each triplet of consecutive points.
2. All cross products are positive, indicating a consistent left turn.
3. Since the sign never changes, the polygon is convex.

---

## Complexity Analysis

- **Time:** O(n) – each point is visited once.
- **Space:** O(1) – only a few scalar variables are used.

---

## Follow-Up Questions

1. How would you handle polygons with colinear edges?
2. Can you extend the algorithm to detect self‑intersecting polygons?
3. What changes are needed for 3‑D convex hull verification?

---

## Key Takeaway

> Convexity = consistent turning direction. Compute the cross product of consecutive edge pairs and verify they never change sign.
