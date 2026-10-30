# 2356. Number of Unique Subjects Taught by Each Teacher

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher](https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher)
**Companies:** Amazon, Capgemini, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL GROUP BY](#2-approach)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Table: `Teacher`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| teacher_id  | int  |
| subject_id  | int  |
| dept_id     | int  |
+-------------+------+
(subject_id, dept_id) is the primary key (combinations of columns with unique values) of this table.
Each row in this table indicates that the teacher with teacher_id teaches the subject subject_id in the department dept_id.
```

Write a solution to calculate the number of unique subjects each teacher teaches in the university.

Return the result table in **any order**.

The result format is shown in the following example.

---

## 2. Approach: SQL GROUP BY ✅

```sql
SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt
FROM Teacher
GROUP BY teacher_id;
```

---

## 3. Examples

**Example 1:**
```
Input:
Teacher table:
+------------+------------+---------+
| teacher_id | subject_id | dept_id |
+------------+------------+---------+
| 1          | 2          | 3       |
| 1          | 2          | 4       |
| 1          | 3          | 3       |
| 2          | 1          | 1       |
| 2          | 2          | 1       |
| 2          | 3          | 1       |
| 2          | 4          | 1       |
+------------+------------+---------+
Output:
+------------+-----+
| teacher_id | cnt |
+------------+-----+
| 1          | 2   |
| 2          | 4   |
+------------+-----+
Explanation:
Teacher 1:
  - They teach subject 2 in departments 3 and 4.
  - They teach subject 3 in department 3.
Teacher 2:
  - They teach subject 1 in department 1.
  - They teach subject 2 in department 1.
  - They teach subject 3 in department 1.
  - They teach subject 4 in department 1.
```

---

## 4. Walkthrough

**Step 1 – Group by teacher**

```
SELECT teacher_id, subject_id FROM Teacher;
```

**Step 2 – Count distinct subjects per teacher**

```
SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt
FROM Teacher
GROUP BY teacher_id;
```

The `COUNT(DISTINCT ...)` aggregates unique subject IDs for each teacher, producing the final counts.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 6. Follow-Up Questions

1. How would you modify the query to list only teachers with more than *k* distinct subjects?
2. How can you compute the total number of distinct subjects across all teachers?
3. Extend the solution to handle a many‑to‑many relationship stored in a separate `TeacherSubject` junction table.

---

## 7. Key Takeaway

> **COUNT(DISTINCT ...) with GROUP BY.** Standard aggregation pattern for counting unique values per group.
