# 2249. Count Lattice Points Inside a Circle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-lattice-points-inside-a-circle](https://leetcode.com/problems/count-lattice-points-inside-a-circle)
**Companies:** Rubrik

---

## 1. Problem Description

Given multiple circles `(x, y, r)`, count the number of integer-coordinate lattice points that lie inside or on the boundary of at least one circle.

---

## 2. Approach: Enumerate + Set — O(n × r²) ✅

```
FUNCTION countLatticePoints(circles):
    points = set()
    FOR cx, cy, r IN circles:
        FOR x FROM cx - r TO cx + r:
            FOR y FROM cy - r TO cy + r:
                IF (x - cx)² + (y - cy)² <= r²:
                    points.ADD((x, y))
    RETURN len(points)
```

| Time | Space |
|------|-------|
| O(n × r²) | O(total lattice points) |

---

## Key Takeaway

> For small radii, brute-force enumerate all integer points in each circle's bounding box, check the distance condition, and use a set to avoid double-counting.
