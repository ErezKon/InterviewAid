# 1401. Circle and Rectangle Overlapping

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/circle-and-rectangle-overlapping](https://leetcode.com/problems/circle-and-rectangle-overlapping)
**Companies:** Google, Microsoft

---

## 1. Problem Description

You are given a circle represented by its radius `radius` and center coordinates `(xCenter, yCenter)`. You are also given an axis-aligned rectangle represented by `(x1, y1, x2, y2)`, where `(x1, y1)` is the bottom-left corner and `(x2, y2)` is the top-right corner of the rectangle.

Return `true` if the circle and rectangle overlap; otherwise, return `false`.

Two shapes overlap if they share at least one point. Points on the boundaries are included, so touching at a single point also counts as overlapping.

**Constraints:**
- `1 <= radius <= 2000`
- `-10^4 <= xCenter, yCenter <= 10^4`
- `-10^4 <= x1 < x2 <= 10^4`
- `-10^4 <= y1 < y2 <= 10^4`

---

## 2. Key Insight

> Find the closest point on the rectangle to the circle's center by clamping. If the distance from that point to the center ≤ radius, they overlap.

---

## 3. Approach: Closest Point Clamping — O(1) ✅

```text
FUNCTION checkOverlap(radius, xCenter, yCenter, x1, y1, x2, y2):
    // Clamp center coordinates to rectangle bounds
    SET closestX ← CLAMP(xCenter, x1, x2)
    SET closestY ← CLAMP(yCenter, y1, y2)
    // Compute squared distance from center to closest point
    SET dx ← xCenter - closestX
    SET dy ← yCenter - closestY
    RETURN dx*dx + dy*dy <= radius*radius
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Examples

**Example 1:**
```
Input: radius = 1, xCenter = 0, yCenter = 0, x1 = 1, y1 = -1, x2 = 3, y2 = 1
Output: true
Explanation: - The circle is centered at (0, 0) with radius 1, and the rectangle extends from (1, -1) to (3, 1).
- The circle and rectangle touch at the point (1, 0), which lies on the circle's boundary and the rectangle's left edge.
- Since they share at least one point, they overlap. Therefore, return true.
```

**Example 2:**
```
Input: radius = 1, xCenter = 1, yCenter = 1, x1 = 1, y1 = -3, x2 = 2, y2 = -1
Output: false
Explanation: - The circle is centered at (1, 1) with radius 1, while the rectangle extends from (1, -3) to (2, -1).
- The closest point on the rectangle to the circle's center is (1, -1). The distance between these points is 2, which is greater than the circle's radius of 1.
- Since the circle cannot reach the rectangle, they do not overlap. Therefore, return false.
```

**Example 3:**
```
Input: radius = 1, xCenter = 0, yCenter = 0, x1 = -1, y1 = 0, x2 = 0, y2 = 1
Output: true
Explanation: - The circle is centered at (0, 0) with radius 1, and the rectangle extends from (-1, 0) to (0, 1).
- The point (0, 0) is both the center of the circle and the bottom-right corner of the rectangle.
- Since this point belongs to both shapes, they overlap. Therefore, return true.
```

---

## Walkthrough

1. **First example** – Circle centered at origin with radius 1, rectangle from `(-1,-1)` to `(1,1)`. Clamping yields `closestX = 0`, `closestY = 0`. Distance `0 ≤ 1²`, so overlap → `true`.
2. **Second example** – Rectangle far away (`x1=2`). Clamping gives `closestX = 2`, `closestY = 2`. Distance squared `(0-2)²+(0-2)² = 8 > 1²`, no overlap → `false`.
3. **Third example** – Circle touches rectangle edge. Clamping results in point `(1,1)`. Distance squared `0 ≤ 2²`, overlap → `true`.

---

## Complexity Analysis

- **Time:** O(1) – constant‑time arithmetic and clamping.
- **Space:** O(1) – only a few scalar variables.

---

## Follow-Up Questions

- How would you extend this to rotated rectangles?
- Can you detect overlap between two circles using a similar clamping idea?
- What changes are needed if the rectangle is defined by center point and width/height instead of corners?

---

## Key Takeaway

> Circle‑rectangle overlap reduces to clamping the circle center to the rectangle bounds and checking the squared distance against the radius.
