# 812. Largest Triangle Area

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-triangle-area](https://leetcode.com/problems/largest-triangle-area)
**Companies:** Amazon, Bloomberg, Google

---

## 1. Problem Description

Given an array of points on the **X-Y** plane `points` where `points[i] = [x_i, y_i]`, return *the area of the largest triangle that can be formed by any three different points*. Answers within `10^-5` of the actual answer will be accepted.

**Constraints:**
- `3 <= points.length <= 50`
- `-50 <= x_i, y_i <= 50`
- All the given points are **unique**.

---

## 2. Approach: Brute Force + Shoelace — O(n³) ✅

```text
FUNCTION largestTriangleArea(points):
    maxArea ← 0
    FOR i ← 0 TO n-3:
        FOR j ← i+1 TO n-2:
            FOR k ← j+1 TO n-1:
                (x1, y1) ← points[i]
                (x2, y2) ← points[j]
                (x3, y3) ← points[k]
                area ← 0.5 * ABS(x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2))
                IF area > maxArea:
                    maxArea ← area
    RETURN maxArea
```

| Time | Space |
|------|-------|
| O(n³) | O(1) |

---

## 3. Examples

```
Example 1:
  Input: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
  Output: 2.00000
  Explanation: The largest triangle is formed by (0,0), (0,2), (2,0), with area 0.5 * 2 * 2 = 2.
```

```
Example 2:
  Input: points = [[1,0],[0,0],[0,1]]
  Output: 0.50000
```

---

## 4. Walkthrough

For the first example, the algorithm examines every combination of three points:
1. Choose points (0,0), (0,1), (1,0) → area = 0.5.
2. Choose points (0,0), (0,2), (2,0) → area = 2.0 (largest).
3. All other triples produce smaller areas.
The maximum area found is `2.0`, which the function returns.

---

## 5. Complexity Analysis

- **Time:** Three nested loops over *n* points → O(n³).
- **Space:** Only constant extra variables → O(1).

---

## 6. Follow‑Up Questions

- How would you improve the runtime if *n* were up to 10⁴?
- Can the problem be solved using convex hull techniques?
- What changes are needed to return the triangle vertices instead of just the area?

---

## 3. Key Takeaway

> The Shoelace formula gives the area of a triangle from three points in O(1). Enumerating all triples (O(n³)) is sufficient for the small input size.
