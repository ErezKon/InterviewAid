# 612. Shortest Distance in a Plane

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-distance-in-a-plane](https://leetcode.com/problems/shortest-distance-in-a-plane)
**Companies:** Meta

---

## Problem Description

Table: `Point2D`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| x           | int  |
| y           | int  |
+-------------+------+
(x, y) is the primary key column (combination of columns with unique values) for this table.
Each row of this table indicates the position of a point on the X-Y plane.
```

The distance between two points `p1(x1, y1)` and `p2(x2, y2)` is `sqrt((x2 - x1)^2 + (y2 - y1)^2)`.

Write a solution to report the shortest distance between any two points from the `Point2D` table. Round the distance to **two decimal points**.

---

## Approach

```sql
SELECT ROUND(MIN(SQRT(POW(p1.x - p2.x, 2) + POW(p1.y - p2.y, 2))), 2) AS shortest
FROM Point2D p1, Point2D p2
WHERE (p1.x, p1.y) != (p2.x, p2.y);
```

---

## Examples

```
Example 1:
  Input:
  Point2D table:
  +----+----+
  | x  | y  |
  +----+----+
  | -1 | -1 |
  | 0  | 0  |
  | -1 | -2 |
  +----+----+
  Output:
  +----------+
  | shortest |
  +----------+
  | 1.00     |
  +----------+
  Explanation: The shortest distance is 1.00 from point (-1, -1) to (-1, -2).
```

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
