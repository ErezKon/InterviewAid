# 3053. Classifying Triangles by Lengths

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/classifying-triangles-by-lengths](https://leetcode.com/problems/classifying-triangles-by-lengths)
**Companies:** Aon

---

## 1. Problem Description

Table: `Triangles`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| A           | int  |
| B           | int  |
| C           | int  |
+-------------+------+
(A, B, C) is the primary key for this table.
Each row include the lengths of each of a triangle's three sides.
```

Write a query to find the type of **triangle**. Output one of the following for each row:

- **Equilateral**: It's a triangle with `3` sides of equal length.
- **Isosceles**: It's a triangle with `2` sides of equal length.
- **Scalene**: It's a triangle with `3` sides of differing lengths.
- **Not A Triangle**: The given values of `A`, `B`, and `C` don't form a triangle.

Return *the result table in **any order***.

## 2. Examples

```
Example 1:
  Input:
  Triangles table:
  +----+----+----+
  | A  | B  | C  |
  +----+----+----+
  | 20 | 20 | 23 |
  | 20 | 20 | 20 |
  | 20 | 21 | 22 |
  | 13 | 14 | 30 |
  +----+----+----+
  Output:
  +----------------+
  | triangle_type  |
  +----------------+
  | Isosceles      |
  | Equilateral    |
  | Scalene        |
  | Not A Triangle |
  +----------------+
  Explanation:
  - Values in the first row from an Isosceles triangle, because A = B.
  - Values in the second row from an Equilateral triangle, because A = B = C.
  - Values in the third row from an Scalene triangle, because A != B != C.
  - Values in the fourth row cannot form a triangle, because the combined value of sides A and B is not larger than that of side C.
```

## 3. Approach — CASE Expression — O(n) ✅

```sql
SELECT
    CASE
        WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'
        WHEN A = B AND B = C THEN 'Equilateral'
        WHEN A = B OR B = C OR A = C THEN 'Isosceles'
        ELSE 'Scalene'
    END AS triangle_type
FROM Triangles;
```

## 4. Walkthrough

1. For each row, first evaluate the triangle inequality `A + B > C` etc. If it fails, output `'Not A Triangle'`.
2. If all sides equal, output `'Equilateral'`.
3. If any two sides equal, output `'Isosceles'`.
4. Otherwise, output `'Scalene'`.

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(N) – one pass over all rows |
| Space  | O(1) – constant extra space |

## 6. Follow-Up Questions

- How would you modify the query to return the count of each triangle type?
- Can you write a procedural solution that validates triangles before classification?
- How would you handle floating-point side lengths with tolerance for precision errors?

## Key Takeaway

> Always check the triangle inequality first, then classify by side equality using a cascading CASE expression.
