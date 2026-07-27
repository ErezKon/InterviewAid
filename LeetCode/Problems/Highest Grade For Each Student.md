# 1112. Highest Grade For Each Student

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/highest-grade-for-each-student](https://leetcode.com/problems/highest-grade-for-each-student)
**Companies:** Coursera, Google

---

## 1. Problem Description

For each student, find the course with the highest grade. If tied, return the smallest `course_id`. (SQL problem)

## 2. Approach: Window Function ✅

```sql
WITH ranked AS (
    SELECT *,
           ROW_NUMBER() OVER (
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

## Key Takeaway

> `ROW_NUMBER()` partitioned by student, ordered by grade desc then course_id asc. Pick `rn = 1`.
