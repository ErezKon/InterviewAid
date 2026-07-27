# 3053. Classifying Triangles by Lengths

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/classifying-triangles-by-lengths](https://leetcode.com/problems/classifying-triangles-by-lengths)
**Companies:** Aon

---

## 1. Problem Description

Given a table `Triangles` with columns `A`, `B`, `C` representing side lengths, classify each triangle as `'Equilateral'`, `'Isosceles'`, `'Scalene'`, or `'Not A Triangle'`. *(SQL problem)*

---

## 2. Approach: CASE Expression — O(n) ✅

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

---

## Key Takeaway

> Always check the triangle inequality first, then classify by equality of sides using a cascading CASE expression.
