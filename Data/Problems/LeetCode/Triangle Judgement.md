# 610. Triangle Judgement

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/triangle-judgement](https://leetcode.com/problems/triangle-judgement)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Table: `Triangle`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| x           | int  |
| y           | int  |
| z           | int  |
+-------------+------+
In SQL, (x, y, z) is the primary key column for this table.
Each row of this table contains the lengths of three line segments.
```

Report for every three line segments whether they can form a triangle.

Return the result table in **any order**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Triangle table:
+----+----+----+
| x  | y  | z  |
+----+----+----+
| 13 | 15 | 30 |
| 10 | 20 | 15 |
+----+----+----+
Output:
+----+----+----+----------+
| x  | y  | z  | triangle |
+----+----+----+----------+
| 13 | 15 | 30 | No       |
| 10 | 20 | 15 | Yes      |
+----+----+----+----------+
```

## Approach
The triangle inequality must hold for all three pairs. In SQL, compute the condition directly in a `CASE` expression. The same logic can be expressed in pseudocode for other languages.

**Pseudocode**
```text
FUNCTION isValidTriangle(x, y, z):
    IF x + y > z AND x + z > y AND y + z > x:
        RETURN "Yes"
    ELSE:
        RETURN "No"
```

## Walkthrough
| x | y | z | x+y>z | x+z>y | y+z>x | Result |
|---|---|---|-------|-------|-------|--------|
| 3 | 4 | 5 | true  | true  | true  | Yes |
| 1 | 2 | 3 | false | false | true  | No |

## Complexity Analysis
- Time: O(1) per row – a constant number of arithmetic checks.
- Space: O(1) – no additional data structures.

## Follow-Up Questions
1. How would you modify the query to handle floating-point side lengths with tolerance for precision errors?
2. Can you extend the solution to return the type of triangle (acute, right, obtuse) based on side lengths?
3. What if the table contains millions of rows—how would you ensure the query scales efficiently?

## Key Takeaway
A triangle is valid iff every pair of sides sums to more than the remaining side; this simple check can be expressed directly in SQL or any language.
