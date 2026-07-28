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

Given tables `Department` and `Student`, return each department name with the count of students in it. Departments with no students should show count 0. Order by count descending, then by department name.

---

## Examples

**Example 1:**
```sql
Department table:
+----+----------+
| id | name     |
+----+----------+
| 1  | Math     |
| 2  | Physics  |
| 3  | History  |
+----+----------+

Student table:
+----+----------+----------+
| id | name     | dept_id |
+----+----------+----------+
| 1  | Alice    | 1        |
| 2  | Bob      | 1        |
| 3  | Charlie  | 2        |
+----+----------+----------+

Result:
+----------+----------------+
| name     | student_number |
+----------+----------------+
| Math     | 2              |
| Physics  | 1              |
| History  | 0              |
+----------+----------------+
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
2. `COUNT(s.student_id)` counts only non‑NULL `student_id`s, so departments without students contribute `0`.
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