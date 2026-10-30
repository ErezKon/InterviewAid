# 1280. Students and Examinations

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/students-and-examinations
**Companies:** Amazon, Bloomberg, Cognizant, Google, Meta, Microsoft, Roblox
---

## Problem Description

Table: `Students`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| student_id    | int     |
| student_name  | varchar |
+---------------+---------+
student_id is the primary key (column with unique values) for this table.
Each row of this table contains the ID and the name of one student in the school.
```

Table: `Subjects`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| subject_name | varchar |
+--------------+---------+
subject_name is the primary key (column with unique values) for this table.
Each row of this table contains the name of one subject in the school.
```

Table: `Examinations`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| student_id   | int     |
| subject_name | varchar |
+--------------+---------+
There is no primary key (column with unique values) for this table. It may contain duplicates.
Each student from the Students table takes every course from the Subjects table.
Each row of this table indicates that a student with ID student_id attended the exam of subject_name.
```

Write a solution to find the number of times each student attended each exam.

Return the result table ordered by `student_id` and `subject_name`.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Students table:
+------------+--------------+
| student_id | student_name |
+------------+--------------+
| 1          | Alice        |
| 2          | Bob          |
| 13         | John         |
| 6          | Alex         |
+------------+--------------+
Subjects table:
+--------------+
| subject_name |
+--------------+
| Math         |
| Physics      |
| Programming  |
+--------------+
Examinations table:
+------------+--------------+
| student_id | subject_name |
+------------+--------------+
| 1          | Math         |
| 1          | Physics      |
| 1          | Programming  |
| 2          | Programming  |
| 1          | Physics      |
| 1          | Math         |
| 13         | Math         |
| 13         | Programming  |
| 13         | Physics      |
| 2          | Math         |
| 1          | Math         |
+------------+--------------+
Output:
+------------+--------------+--------------+----------------+
| student_id | student_name | subject_name | attended_exams |
+------------+--------------+--------------+----------------+
| 1          | Alice        | Math         | 3              |
| 1          | Alice        | Physics      | 2              |
| 1          | Alice        | Programming  | 1              |
| 2          | Bob          | Math         | 1              |
| 2          | Bob          | Physics      | 0              |
| 2          | Bob          | Programming  | 1              |
| 6          | Alex         | Math         | 0              |
| 6          | Alex         | Physics      | 0              |
| 6          | Alex         | Programming  | 0              |
| 13         | John         | Math         | 1              |
| 13         | John         | Physics      | 1              |
| 13         | John         | Programming  | 1              |
+------------+--------------+--------------+----------------+
Explanation:
The result table should contain all students and all subjects.
Alice attended the Math exam 3 times, the Physics exam 2 times, and the Programming exam 1 time.
Bob attended the Math exam 1 time, the Programming exam 1 time, and did not attend the Physics exam.
Alex did not attend any exams.
John attended the Math exam 1 time, the Physics exam 1 time, and the Programming exam 1 time.
```

## Approach
The query uses a **cross join** to generate every `(student, subject)` pair, then a **left join** to attach matching examinations and count them. The `COUNT` aggregates the number of exams per pair, treating missing rows as `0`.

### Pseudocode
```text
FUNCTION getExamCounts():
    RETURN SELECT s.student_id,
                  s.student_name,
                  sub.subject_name,
                  COUNT(e.subject_name) AS attended_exams
           FROM Students s
           CROSS JOIN Subjects sub
           LEFT JOIN Examinations e
               ON s.student_id = e.student_id
               AND sub.subject_name = e.subject_name
           GROUP BY s.student_id, s.student_name, sub.subject_name
           ORDER BY s.student_id, sub.subject_name;
```

## Walkthrough
Assume the tables from the first example.
1. `CROSS JOIN` creates pairs: `(1, Alice, Math)`, `(1, Alice, Physics)`, `(2, Bob, Math)`, `(2, Bob, Physics)`.
2. `LEFT JOIN` attaches exams: rows for `(1, Math)` and `(1, Physics)` match one exam each; `(2, Math)` matches one; `(2, Physics)` matches none → `NULL`.
3. `COUNT(e.subject_name)` counts non‑NULL matches, yielding `1, 1, 1, 0` respectively.
4. The final `ORDER BY` sorts by `student_id` then `subject_name`.

## Complexity Analysis
- **Time:** O(S × T + E) where *S* is number of students, *T* subjects, and *E* examinations; the cross join dominates.
- **Space:** O(S × T) for the intermediate result set.

## Follow-Up Questions
1. How would you modify the query to include only subjects a student has taken at least once?
2. Can you write the same logic using `NOT EXISTS` to filter missing exams?
3. How would you handle very large tables efficiently (e.g., using indexing or partitioning)?

## Key Takeaway
A cross join combined with a left join and aggregation provides a concise way to compute per‑student, per‑subject exam counts, automatically yielding `0` for missing records.
