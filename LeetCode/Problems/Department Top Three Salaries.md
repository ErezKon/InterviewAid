# 185. Department Top Three Salaries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/department-top-three-salaries](https://leetcode.com/problems/department-top-three-salaries)
**Companies:** Accenture, Amazon, Bcg, Bloomberg, Dell, Fractal Analytics, Google, Hcl, Meta, Microsoft, Ozon, Tcs, Tiktok

---

## Problem Description

SQL: Find employees who earn a top-three salary in each department.

---

## Approach 1: Correlated Subquery

```sql
SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE (
    SELECT COUNT(DISTINCT e2.salary)
    FROM Employee e2
    WHERE e2.departmentId = e.departmentId AND e2.salary > e.salary
) < 3;
```

## Approach 2: DENSE_RANK

```sql
SELECT Department, Employee, Salary FROM (
    SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary,
           DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk
    FROM Employee e
    JOIN Department d ON e.departmentId = d.id
) t WHERE rnk <= 3;
```

---

## Key Takeaway

> **Top-N per group: use `DENSE_RANK() OVER (PARTITION BY ... ORDER BY ...)` and filter `rnk <= N`. Handles ties correctly. The correlated subquery approach counts how many distinct salaries are higher.**
