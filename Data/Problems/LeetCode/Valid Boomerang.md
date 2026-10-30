# 1037. Valid Boomerang

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-boomerang](https://leetcode.com/problems/valid-boomerang)
**Companies:** Google, Microsoft

---

## Problem Description

Given an array `points` where `points[i] = [x_i, y_i]` represents a point on the **X-Y** plane, return `true` *if these points are a **boomerang***.

A **boomerang** is a set of three points that are **all distinct** and **not in a straight line**.

**Constraints:**
- `points.length == 3`
- `points[i].length == 2`
- `0 <= x_i, y_i <= 100`

## Examples

**Example 1:**
```
Input: points = [[1,1],[2,3],[3,2]]
Output: true
```

**Example 2:**
```
Input: points = [[1,1],[2,2],[3,3]]
Output: false
```

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
