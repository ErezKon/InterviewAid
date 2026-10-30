# 3421. Find Students Who Improved

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-students-who-improved](https://leetcode.com/problems/find-students-who-improved)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Window Functions (FIRST_VALUE / LAG) ✅](#4-approach-window-functions--first_value--lag-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

> *Note: schema/statement/example verified against the official LeetCode page.*

Table: `Scores`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| student_id  | int     |
| subject     | varchar |
| score       | int     |
| exam_date   | varchar |
+-------------+---------+
(student_id, subject, exam_date) is the primary key for this table.
Each row contains information about a student's score in a specific subject on a particular exam date. score is between 0 and 100 (inclusive).
```

Write a solution to find the **students who have shown improvement**. A student is considered to have shown improvement if they meet **both** of these conditions:

- Have taken exams in the **same subject** on at least two different dates.
- Their **latest score** in that subject is **higher** than their **first score**.

Return *the result table ordered by* `student_id`, `subject` *in **ascending** order* (columns: `student_id`, `subject`, `first_score`, `latest_score`).

---

## 2. Examples

**Example:**
```
Input:
Scores table:
+------------+----------+-------+------------+
| student_id | subject  | score | exam_date  |
+------------+----------+-------+------------+
| 101        | Math     | 70    | 2023-01-15 |
| 101        | Math     | 85    | 2023-02-15 |
| 101        | Physics  | 65    | 2023-01-15 |
| 101        | Physics  | 60    | 2023-02-15 |
| 102        | Math     | 80    | 2023-01-15 |
| 102        | Math     | 85    | 2023-02-15 |
| 103        | Math     | 90    | 2023-01-15 |
| 104        | Physics  | 75    | 2023-01-15 |
| 104        | Physics  | 85    | 2023-02-15 |
+------------+----------+-------+------------+
Output:
+------------+----------+-------------+--------------+
| student_id | subject  | first_score | latest_score |
+------------+----------+-------------+--------------+
| 101        | Math     | 70          | 85           |
| 102        | Math     | 80          | 85           |
| 104        | Physics  | 75          | 85           |
+------------+----------+-------------+--------------+
Explanation:
- Student 101 in Math: Improved from 70 to 85
- Student 101 in Physics: No improvement (dropped from 65 to 60)
- Student 102 in Math: Improved from 80 to 85
- Student 103 in Math: Only one exam, not eligible
- Student 104 in Physics: Improved from 75 to 85
Result table is ordered by student_id, subject.
```

---

## 3. Key Insight

> Use **FIRST_VALUE** and **LAST_VALUE** window functions partitioned by (student, subject) ordered by exam_date to get the first and latest scores, then filter where latest > first.

---

## 4. Approach: Window Functions (FIRST_VALUE / LAG) ✅

```
WITH Ranked AS (
    SELECT student_id, subject, score, exam_date,
           FIRST_VALUE(score) OVER (
               PARTITION BY student_id, subject
               ORDER BY exam_date
           ) AS first_score,
           FIRST_VALUE(score) OVER (
               PARTITION BY student_id, subject
               ORDER BY exam_date DESC
           ) AS latest_score,
           ROW_NUMBER() OVER (
               PARTITION BY student_id, subject
               ORDER BY exam_date
           ) AS rn
    FROM Scores
)
SELECT student_id, subject, first_score, latest_score
FROM Ranked
WHERE rn = 1 AND latest_score > first_score
ORDER BY student_id, subject;
```

---

## 5. Walkthrough

```
Student 1, Math:
  first_score = 70 (2023-01-01)
  latest_score = 85 (2023-06-01)
  85 > 70 → included ✅

Student 2, Math:
  first_score = 90 (2023-01-01)
  latest_score = 85 (2023-06-01)
  85 > 90? No → excluded ✗
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — window function with ordering |
| **Space** | O(n) — intermediate results |

---

## 7. Key Takeaway

> **FIRST_VALUE with ASC and DESC ordering** is a clean way to get both the earliest and latest values per group in a single query, avoiding self-joins.
