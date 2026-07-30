# 478. Generate Random Point in a Circle

**Difficulty:** 🟡 Medium

**Companies:** Leap Motion, Meta
---

## Problem Description

Generate a uniformly random point inside a circle with given radius and center.

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| radius = 1, center = (0,0) | (0.23, -0.45) | A point inside the unit circle, uniformly chosen. |
| radius = 2, center = (1,1) | (2.31, 0.87) | Random point within the circle centered at (1,1) with radius 2. |

## Approach

**Algorithm:** Polar Coordinates with √r for uniform area distribution.

```text
FUNCTION randPoint(radius, x_center, y_center):
    // Generate random angle and radius
    SET theta ← random() * 2 * PI
    SET r ← radius * sqrt(random())
    RETURN [x_center + r * cos(theta), y_center + r * sin(theta)]
```

## Walkthrough

1. Choose a random angle `theta` uniformly from `[0, 2π)`.
2. Choose a random radius `r` by taking the square root of a uniform random number and scaling by the circle radius.
3. Convert polar coordinates `(r, theta)` to Cartesian coordinates using cosine and sine.
4. Offset by the circle's center `(x_center, y_center)`.

## Complexity Analysis

- **Time:** O(1) – constant time arithmetic operations.
- **Space:** O(1) – only a few variables are used.

## Follow-Up Questions

- How would you modify the algorithm to generate points uniformly inside an ellipse?
- Can you generate points inside a 3D sphere using a similar technique?
- What are the trade‑offs between this method and rejection sampling?

## Key Takeaway

> Using `√random()` for the radius ensures uniform distribution over the circle's area, avoiding clustering near the center.
