# 478. Generate Random Point in a Circle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/generate-random-point-in-a-circle](https://leetcode.com/problems/generate-random-point-in-a-circle)

**Companies:** Leap Motion, Meta
---

## Problem Description

Given the radius and the position of the center of a circle, implement the function `randPoint` which generates a uniform random point inside the circle.

Implement the `Solution` class:

- `Solution(double radius, double x_center, double y_center)` initializes the object with the radius of the circle `radius` and the position of the center `(x_center, y_center)`.
- `randPoint()` returns a random point inside the circle. A point on the circumference of the circle is considered to be in the circle. The answer is returned as an array `[x, y]`.

**Constraints:**
- `0 < radius <= 10^8`
- `-10^7 <= x_center, y_center <= 10^7`
- At most `3 * 10^4` calls will be made to `randPoint`.

## Examples

```
Example 1:
  Input:
  ["Solution", "randPoint", "randPoint", "randPoint"]
  [[1.0, 0.0, 0.0], [], [], []]
  Output:
  [null, [-0.02493, -0.38077], [0.82314, 0.38945], [0.36572, 0.17248]]
  Explanation:
  Solution solution = new Solution(1.0, 0.0, 0.0);
  solution.randPoint(); // return [-0.02493, -0.38077]
  solution.randPoint(); // return [0.82314, 0.38945]
  solution.randPoint(); // return [0.36572, 0.17248]
```

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
