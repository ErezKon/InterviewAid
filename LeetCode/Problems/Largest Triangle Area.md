# 812. Largest Triangle Area

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-triangle-area](https://leetcode.com/problems/largest-triangle-area)
**Companies:** Amazon, Bloomberg, Google

---

## 1. Problem Description

Given points on a 2D plane, return the area of the largest triangle that can be formed.

---

## 2. Approach: Brute Force + Shoelace — O(n³) ✅

```
FUNCTION largestTriangleArea(points):
    maxArea = 0
    FOR i, j, k in all triplets:
        area = 0.5 * ABS(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2))
        maxArea = MAX(maxArea, area)
    RETURN maxArea
```

| Time | Space |
|------|-------|
| O(n³) | O(1) |

---

## 3. Key Takeaway

> Shoelace formula gives triangle area from 3 points in O(1). With n ≤ 50, O(n³) brute force is fine.
