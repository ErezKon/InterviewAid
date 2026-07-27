# 478. Generate Random Point in a Circle

**Difficulty:** 🟡 Medium

**Companies:** Leap Motion, Meta
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Polar Coordinates with √r — O(1) ✅](#3-approach-polar-coordinates-with-r--o1-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Generate a uniformly random point inside a circle with given radius and center.

---

## 2. Key Insight

> Naive `r = random() * radius` concentrates points near the center. Use `r = radius * √random()` to distribute uniformly by area.

---

## 3. Approach: Polar Coordinates with √r — O(1) ✅

```
FUNCTION randPoint(radius, x_center, y_center):
    // Rejection sampling or sqrt for uniform distribution
    r = radius * sqrt(random()); theta = random() * 2 * PI
    RETURN [x_center + r * cos(theta), y_center + r * sin(theta)]
```

---

## 4. Key Takeaway

> **√random()** corrects the radial density for uniform area distribution. Alternative: rejection sampling in the bounding square.
