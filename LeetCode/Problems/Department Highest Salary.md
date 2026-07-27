# 184. Department Highest Salary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/department-highest-salary](https://leetcode.com/problems/department-highest-salary)
**Companies:** Amazon, Google, Meta, Microsoft, Target, Tcs, Tencent

---

## Problem Description

SQL: Find employees with the highest salary in each department.

---

## Approach

```sql
SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE (e.departmentId, e.salary) IN (
    SELECT departmentId, MAX(salary)
    FROM Employee
    GROUP BY departmentId
);
```

---

## Key Takeaway

> **Tuple IN subquery: `WHERE (col1, col2) IN (SELECT ...)` elegantly matches composite conditions. Handles ties naturally (multiple employees can share the max salary).**
