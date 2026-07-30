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

## Examples

| Points Table | Shortest Distance |
|--------------|-------------------|
| (1,2), (3,4), (5,6) | 2.83 |
| (0,0), (0,5), (5,0) | 5.00 |

---

## Walkthrough

1. Perform a self‑join of `Point2D` to generate every pair of distinct points.
2. For each pair, compute the Euclidean distance using `SQRT(POW(dx,2) + POW(dy,2))`.
3. Use `MIN` to keep the smallest distance across all pairs.
4. Round the result to two decimal places for readability.

---

## Complexity Analysis

- **Time:** O(n²) due to the self‑join generating all point pairs.
- **Space:** O(1) extra space besides the input table.

---

## Key Takeaway

> Self‑join on the points table and exclude same‑point pairs. Apply the Euclidean distance formula and take the minimum.
