# 580. Count Student Number in Departments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-student-number-in-departments](https://leetcode.com/problems/count-student-number-in-departments)
**Companies:** Twitter

---

## Problem Description

Given tables `Department` and `Student`, return each department name with the count of students in it. Departments with no students should show count 0. Order by count descending, then by department name.

---

## Approach

```sql
SELECT d.dept_name, COUNT(s.student_id) AS student_number
FROM Department d
LEFT JOIN Student s ON d.dept_id = s.dept_id
GROUP BY d.dept_id, d.dept_name
ORDER BY student_number DESC, d.dept_name;
```

---

## Key Takeaway

> **LEFT JOIN from Department ensures departments with zero students appear. `COUNT(s.student_id)` (not `COUNT(*)`) correctly returns 0 for unmatched rows since NULL student_ids are not counted.**
