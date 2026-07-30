# 3053. Classifying Triangles by Lengths

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/classifying-triangles-by-lengths](https://leetcode.com/problems/classifying-triangles-by-lengths)
**Companies:** Aon

---

## 1. Problem Description

Given a table `Triangles` with columns `A`, `B`, `C` representing side lengths, classify each triangle as `'Equilateral'`, `'Isosceles'`, `'Scalene'`, or `'Not A Triangle'`. This is a SQL aggregation problem.

## 2. Examples

| Triangles Table (A,B,C) | triangle_type |
|--------------------------|---------------|
| (3,3,3) | `Equilateral` |
| (4,4,5) | `Isosceles` |
| (2,3,4) | `Scalene` |
| (1,2,3) | `Not A Triangle` |

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
- How would you handle floating‑point side lengths with tolerance for precision errors?

## Key Takeaway

> Always check the triangle inequality first, then classify by side equality using a cascading CASE expression.
