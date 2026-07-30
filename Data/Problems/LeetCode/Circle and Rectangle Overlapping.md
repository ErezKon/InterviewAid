# 1401. Circle and Rectangle Overlapping

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/circle-and-rectangle-overlapping](https://leetcode.com/problems/circle-and-rectangle-overlapping)
**Companies:** Google, Microsoft

---

## 1. Problem Description

Given a circle with center `(xCenter, yCenter)` and `radius`, and an axis-aligned rectangle defined by bottom-left `(x1, y1)` and top-right `(x2, y2)`, return `true` if the circle and rectangle overlap (including touching). Constraints: coordinates and radius are integers within typical 32‑bit range.

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

| Input | Output |
|-------|--------|
| `radius = 1, xCenter = 0, yCenter = 0, x1 = -1, y1 = -1, x2 = 1, y2 = 1` | `true` |
| `radius = 1, xCenter = 0, yCenter = 0, x1 = 2, y1 = 2, x2 = 3, y2 = 3` | `false` |
| `radius = 2, xCenter = 1, yCenter = 1, x1 = 0, y1 = 0, x2 = 2, y2 = 2` | `true` |

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
