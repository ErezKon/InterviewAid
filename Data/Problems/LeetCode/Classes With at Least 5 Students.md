# 596. Classes With at Least 5 Students

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/classes-with-at-least-5-students](https://leetcode.com/problems/classes-with-at-least-5-students)
**Companies:** Bloomberg, Google, Microsoft

---

## Problem Description
Table: `Courses`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| student     | varchar |
| class       | varchar |
+-------------+---------+
(student, class) is the primary key (combination of columns with unique values) for this table.
Each row of this table indicates the name of a student and the class in which they are enrolled.
```

Write a solution to find all the classes that have **at least five students**.

Return the result table in **any order**.

## Examples
```
Example 1:
  Input:
  Courses table:
  +---------+----------+
  | student | class    |
  +---------+----------+
  | A       | Math     |
  | B       | English  |
  | C       | Math     |
  | D       | Biology  |
  | E       | Math     |
  | F       | Computer |
  | G       | Math     |
  | H       | Math     |
  | I       | Math     |
  +---------+----------+
  Output:
  +---------+
  | class   |
  +---------+
  | Math    |
  +---------+
  Explanation:
  - Math has 6 students, so we include it.
  - English has 1 student, so we do not include it.
  - Biology has 1 student, so we do not include it.
  - Computer has 1 student, so we do not include it.
```

## Approach
**SQL Aggregation** – Group rows by `class`, count distinct `student` values, and filter groups with a count ≥ 5 using the `HAVING` clause.

```text
SELECT class
FROM Courses
GROUP BY class
HAVING COUNT(DISTINCT student) >= 5;
```

## Walkthrough
1. **GROUP BY class** – collects all rows belonging to the same class.
2. **COUNT(DISTINCT student)** – counts unique students per class.
3. **HAVING … >= 5** – keeps only classes meeting the threshold.
4. Return the `class` column from the filtered groups.

## Complexity Analysis
- **Time:** O(N) – each row is processed once during grouping.
- **Space:** O(K) – stores aggregation for K distinct classes.

## Follow‑Up Questions
- How would you modify the query to return classes with exactly *k* students where *k* is a parameter?
- How can you retrieve the list of students for each qualifying class in a single query?
- What indexes would improve the performance of this query on a large dataset?

## Key Takeaway
Use `GROUP BY` with `COUNT(DISTINCT ...)` and a `HAVING` filter to efficiently find classes meeting a minimum student count.
