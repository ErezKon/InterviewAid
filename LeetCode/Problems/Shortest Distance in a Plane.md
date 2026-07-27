# 612. Shortest Distance in a Plane

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-distance-in-a-plane](https://leetcode.com/problems/shortest-distance-in-a-plane)
**Companies:** Meta

---

## Problem Description

Given a `Point2D` table with (x, y) coordinates, find the shortest Euclidean distance between any two points.

---

## Approach

```sql
SELECT ROUND(MIN(SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))), 2) AS shortest
FROM Point2D p1, Point2D p2
WHERE (p1.x, p1.y) != (p2.x, p2.y);
```

---

## Key Takeaway

> Self-join on the points table and exclude same-point pairs. Apply the Euclidean distance formula and take the minimum.
