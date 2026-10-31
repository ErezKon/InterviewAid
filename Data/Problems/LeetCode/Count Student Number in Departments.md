# 580. Count Student Number in Departments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-student-number-in-departments](https://leetcode.com/problems/count-student-number-in-departments)
**Companies:** Twitter

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Student`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| student_id   | int     |
| student_name | varchar |
| gender       | varchar |
| dept_id      | int     |
+--------------+---------+
student_id is the primary key (column with unique values) for this table.
dept_id is a foreign key (reference column) to dept_id in the Department tables.
Each row of this table indicates the name of a student, their gender, and the id of their department.
```

Table: `Department`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| dept_id     | int     |
| dept_name   | varchar |
+-------------+---------+
dept_id is the primary key (column with unique values) for this table.
Each row of this table contains the id and the name of a department.
```

Write a solution to report the respective department name and number of students majoring in each department for all departments in the `Department` table (even ones with no current students).

Return the result table **ordered** by `student_number` **in descending order**. In case of a tie, order them by `dept_name` **alphabetically**.

The result format is in the following example.

---

## Examples

**Example 1:**
```
Input:
Student table:
+------------+--------------+--------+---------+
| student_id | student_name | gender | dept_id |
+------------+--------------+--------+---------+
| 1          | Jack         | M      | 1       |
| 2          | Jane         | F      | 1       |
| 3          | Mark         | M      | 2       |
+------------+--------------+--------+---------+
Department table:
+---------+-------------+
| dept_id | dept_name   |
+---------+-------------+
| 1       | Engineering |
| 2       | Science     |
| 3       | Law         |
+---------+-------------+
Output:
+-------------+----------------+
| dept_name   | student_number |
+-------------+----------------+
| Engineering | 2              |
| Science     | 1              |
| Law         | 0              |
+-------------+----------------+
```

---

## Approach

```sql
SELECT d.dept_name,
       COUNT(s.student_id) AS student_number
FROM Department d
LEFT JOIN Student s ON d.dept_id = s.dept_id
GROUP BY d.dept_id, d.dept_name
ORDER BY student_number DESC, d.dept_name;
```
---

## Walkthrough

1. **LEFT JOIN** ensures every department appears, even if no matching student rows.
2. `COUNT(s.student_id)` counts only non-NULL `student_id`s, so departments without students contribute `0`.
3. Group by department identifiers to aggregate counts per department.
4. Order the result first by the computed `student_number` in descending order, then alphabetically by department name.
---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(D + S) – one pass over `Department` (D rows) and `Student` (S rows) during the join |
| **Space** | O(D) – storage for the grouped result per department |
---

## Follow-Up Questions

1. How would you modify the query to include only departments with at least one student?
2. What index strategy would improve performance for large tables?
3. How can you adapt the query to count distinct students if duplicates exist?
---

## Key Takeaway

> **LEFT JOIN from Department ensures departments with zero students appear. `COUNT(s.student_id)` (not `COUNT(*)`) correctly returns 0 for unmatched rows since NULL student_ids are not counted.**