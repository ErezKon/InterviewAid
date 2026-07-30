# 596. Classes With at Least 5 Students

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/classes-with-at-least-5-students](https://leetcode.com/problems/classes-with-at-least-5-students)
**Companies:** Bloomberg, Google, Microsoft

---

## Problem Description
Given a table `Courses(class, student)` where each row represents a student enrolled in a class, return the names of all classes that have **at least five** distinct students. The result should be a list of class identifiers.

## Examples
**Example 1:**
```
Courses table:
+-------+----------+
| class | student  |
+-------+----------+
| CS101 | Alice    |
| CS101 | Bob      |
| CS101 | Carol    |
| CS101 | Dave     |
| CS101 | Eve      |
| CS101 | Frank    |
| MATH1 | Grace    |
| MATH1 | Heidi    |
| MATH1 | Ivan     |
+-------+----------+
Result: ["CS101"]
```
Explanation: `CS101` has six students (≥5) while `MATH1` has only three.

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
