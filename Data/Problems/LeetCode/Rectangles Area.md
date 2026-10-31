# 1459. Rectangles Area

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rectangles-area](https://leetcode.com/problems/rectangles-area)
**Companies:** Twitter
---

## Problem Description
Table: `Points`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| x_value       | int     |
| y_value       | int     |
+---------------+---------+
id is the column with unique values for this table.
Each point is represented as a 2D coordinate (x_value, y_value).
```

Write a solution to report all possible **axis-aligned** rectangles with a **non-zero area** that can be formed by any two points from the `Points` table.

Each row in the result should contain three columns `(p1, p2, area)` where:

- `p1` and `p2` are the `id`'s of the two points that determine the opposite corners of a rectangle.
- `area` is the area of the rectangle and must be **non-zero**.

Return the result table **ordered** by `area` **in descending order**. If there is a tie, order them by `p1` **in ascending order**. If there is still a tie, order them by `p2` **in ascending order**.

The result format is in the following table.

## Examples

```
Example 1:
  Input:
    Points table:
    +----------+-------------+-------------+
    | id       | x_value     | y_value     |
    +----------+-------------+-------------+
    | 1        | 2           | 7           |
    | 2        | 4           | 8           |
    | 3        | 2           | 10          |
    +----------+-------------+-------------+
  Output:
    +----------+-------------+-------------+
    | p1       | p2          | area        |
    +----------+-------------+-------------+
    | 2        | 3           | 4           |
    | 1        | 2           | 2           |
    +----------+-------------+-------------+
  Explanation:
    The rectangle formed by p1 = 2 and p2 = 3 has an area equal to |4-2| * |8-10| = 4.
    The rectangle formed by p1 = 1 and p2 = 2 has an area equal to |2-4| * |7-8| = 2.
    Note that the rectangle formed by p1 = 1 and p2 = 3 is invalid because the area is 0.
```

## Approach
Self-join `Points` with itself so that every unordered pair of points appears once (`p1.id < p2.id`). Two points are opposite corners of an axis-aligned rectangle with non-zero area exactly when their x-values differ **and** their y-values differ. The area is `|x1 - x2| * |y1 - y2|`. Finally sort by `area DESC, p1 ASC, p2 ASC`.

```sql
SELECT a.id AS p1,
       b.id AS p2,
       ABS(a.x_value - b.x_value) * ABS(a.y_value - b.y_value) AS area
FROM Points a
JOIN Points b
  ON a.id < b.id
 AND a.x_value <> b.x_value
 AND a.y_value <> b.y_value
ORDER BY area DESC, p1 ASC, p2 ASC;
```

## Walkthrough
Example 1: points `1:(2,7)`, `2:(4,8)`, `3:(2,10)`.

| pair (a.id < b.id) | dx | dy | kept? | area |
|--------------------|----|----|-------|------|
| (1,2) | 2 | 1 | yes | 2 |
| (1,3) | 0 | 3 | no (same x, zero area) | - |
| (2,3) | 2 | 2 | yes | 4 |

Sorted by area descending: `(2,3,4)`, `(1,2,2)` -- matches the expected output.

## Complexity Analysis
- **Time:** `O(N^2 + K log K)` where `N` is the number of points and `K <= N(N-1)/2` is the number of valid pairs (self-join plus sort).
- **Space:** `O(K)` for the result set.

## Follow-Up Questions
1. How would you also return the rectangles formed by four points from the table (all four corners present)?
2. Why is `a.id < b.id` used instead of `a.id <> b.id`?
3. How could an index on `(x_value, y_value)` help if the table is large?

## Key Takeaway
A self-join with `a.id < b.id` enumerates each pair of points once; filtering out equal x or y coordinates removes zero-area rectangles before computing and sorting the areas.
