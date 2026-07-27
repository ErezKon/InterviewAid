# 1779. Find Nearest Point That Has the Same X or Y Coordinate

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate](https://leetcode.com/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate)
**Companies:** Amazon, Doordash, Google

---

```
FUNCTION nearestValidPoint(x, y, points):
    minDist = infinity; result = -1
    FOR i, [px, py] IN enumerate(points):
        IF px == x OR py == y:
            d = ABS(px - x) + ABS(py - y)
            IF d < minDist: minDist = d; result = i
    RETURN result
```
