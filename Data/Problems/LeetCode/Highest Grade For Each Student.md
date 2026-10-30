# 1112. Highest Grade For Each Student

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/highest-grade-for-each-student](https://leetcode.com/problems/highest-grade-for-each-student)
**Companies:** Coursera, Google
---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Enrollments`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| student_id    | int     |
| course_id     | int     |
| grade         | int     |
+---------------+---------+
(student_id, course_id) is the primary key (combination of columns with unique values) of this table.
grade is never NULL.
```

Write a solution to find the highest grade with its corresponding course for each student. In case of a tie, you should find the course with the smallest `course_id`.

Return the result table ordered by `student_id` in **ascending order**.

The result format is in the following example.

## 2. Examples

**Example 1:**
```
Input:
Enrollments table:
+------------+-------------------+
| student_id | course_id | grade |
+------------+-----------+-------+
| 2          | 2         | 95    |
| 2          | 3         | 95    |
| 1          | 1         | 90    |
| 1          | 2         | 99    |
| 3          | 1         | 80    |
| 3          | 2         | 75    |
| 3          | 3         | 82    |
+------------+-----------+-------+
Output:
+------------+-------------------+
| student_id | course_id | grade |
+------------+-----------+-------+
| 1          | 2         | 99    |
| 2          | 2         | 95    |
| 3          | 3         | 82    |
+------------+-----------+-------+
```

## 3. Approach: Window Function — O(N log N) ✅

```text
FUNCTION highestGradePerStudent():
    // Use ROW_NUMBER partitioned by student, ordered by grade DESC then course_id ASC
    WITH ranked AS (
        SELECT *, ROW_NUMBER() OVER (
            PARTITION BY student_id
            ORDER BY grade DESC, course_id ASC
        ) AS rn
        FROM Enrollments
    )
    SELECT student_id, course_id, grade
    FROM ranked
    WHERE rn = 1
    ORDER BY student_id;
```

## 4. Walkthrough

1. **Rank rows**: For each `student_id`, rows are ordered by `grade` descending, breaking ties with `course_id` ascending. `ROW_NUMBER` assigns `1` to the best row.
2. **Select top row**: Filter `rn = 1` to keep only the highest‑grade course per student.
3. **Result**: Return the selected columns, sorted by `student_id`.

## 5. Complexity Analysis

- **Time**: The window function sorts each partition → O(N log N) where N is number of enrollment rows.
- **Space**: O(N) for the intermediate ranked table.

## 6. Follow‑Up Questions

- How would you modify the query to return the top K courses per student?
- How to handle ties by returning all courses with the highest grade?
- Can the solution be expressed without window functions (e.g., using `MAX` and joins)?

## Key Takeaway

> `ROW_NUMBER()` partitioned by `student_id` and ordered by `grade` descending then `course_id` ascending cleanly extracts each student's highest‑grade course.
