# 1037. Valid Boomerang

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-boomerang](https://leetcode.com/problems/valid-boomerang)
**Companies:** Google, Microsoft

---

## Problem Description
Given three points in a 2D plane, determine whether they form a boomerang. A boomerang is defined as three distinct points that are not collinear (i.e., they do not all lie on a single straight line).

## Examples
| points | Output |
|--------|--------|
| [[1,1],[2,3],[3,2]] | true |
| [[1,1],[2,2],[3,3]] | false |
*The first set forms a non‑collinear triangle, the second lies on a straight line.*

## Approach
Use the area (or cross product) of the triangle formed by the three points. If the area is non‑zero, the points are non‑collinear.

```text
FUNCTION IsBoomerang(p1, p2, p3):
    // Compute cross product of vectors (p2-p1) and (p3-p1)
    SET x1 ← p2[0] - p1[0]
    SET y1 ← p2[1] - p1[1]
    SET x2 ← p3[0] - p1[0]
    SET y2 ← p3[1] - p1[1]
    SET cross ← x1 * y2 - x2 * y1
    RETURN cross ≠ 0
```

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Compute vector `v1 = p2 - p1`. |
| 2 | Compute vector `v2 = p3 - p1`. |
| 3 | Calculate cross product `v1.x * v2.y - v2.x * v1.y`. |
| 4 | If the cross product is zero, points are collinear → return false; otherwise true. |

## Complexity Analysis
- **Time:** O(1) – constant number of arithmetic operations.
- **Space:** O(1) – only a few scalar variables.

## Follow-Up Questions
1. How would you extend this to check if a set of `k` points are all non‑collinear?
2. What if the points are given in 3D space? How does the test change?
3. Can you detect degenerate cases where two or more points coincide?

## Key Takeaway
The cross product of two vectors from a common point yields zero exactly when the points are collinear, providing a constant‑time boomerang check.
