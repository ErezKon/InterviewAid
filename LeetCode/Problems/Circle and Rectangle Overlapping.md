# 1401. Circle and Rectangle Overlapping

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/circle-and-rectangle-overlapping](https://leetcode.com/problems/circle-and-rectangle-overlapping)
**Companies:** Google, Microsoft

---

## 1. Problem Description

Given a circle with center `(xCenter, yCenter)` and `radius`, and an axis-aligned rectangle defined by bottom-left `(x1, y1)` and top-right `(x2, y2)`, return `true` if the circle and rectangle overlap.

---

## 2. Key Insight

> Find the closest point on the rectangle to the circle's center by clamping. If the distance from that point to the center ≤ radius, they overlap.

---

## 3. Approach: Closest Point Clamping — O(1) ✅

```
FUNCTION checkOverlap(radius, xCenter, yCenter, x1, y1, x2, y2):
    closestX = CLAMP(xCenter, x1, x2)
    closestY = CLAMP(yCenter, y1, y2)
    dx = xCenter - closestX
    dy = yCenter - closestY
    RETURN dx*dx + dy*dy <= radius*radius
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Key Takeaway

> Circle-rectangle overlap reduces to: clamp the circle center to the rectangle bounds, then check if the clamped point is within the circle's radius.
