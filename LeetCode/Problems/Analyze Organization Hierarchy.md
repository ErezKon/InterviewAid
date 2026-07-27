# 3482. Analyze Organization Hierarchy

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/analyze-organization-hierarchy](https://leetcode.com/problems/analyze-organization-hierarchy)
**Companies:** Amazon

---

## 1. Problem Description

**SQL Problem.** Given an `Employees` table with `employee_id`, `employee_name`, `manager_id`, `salary`, and `department`, analyze the organization hierarchy: compute each employee's level, subordinate count, and budget (sum of all subordinate salaries).

---

## 2. Approach: Recursive CTE ✅

```sql
WITH RECURSIVE hierarchy AS (
    SELECT employee_id, employee_name, manager_id, salary, 1 AS level
    FROM Employees WHERE manager_id IS NULL
    UNION ALL
    SELECT e.employee_id, e.employee_name, e.manager_id, e.salary, h.level + 1
    FROM Employees e JOIN hierarchy h ON e.manager_id = h.employee_id
),
subordinates AS (
    SELECT h1.employee_id,
           COUNT(h2.employee_id) AS sub_count,
           COALESCE(SUM(h2.salary), 0) AS budget
    FROM hierarchy h1
    LEFT JOIN hierarchy h2 ON h2.manager_id = h1.employee_id
    GROUP BY h1.employee_id
)
SELECT h.employee_id, h.employee_name, h.level, s.sub_count, h.salary + s.budget AS budget
FROM hierarchy h JOIN subordinates s ON h.employee_id = s.employee_id
ORDER BY h.level, h.employee_id;
```

---

## Key Takeaway

> Recursive CTEs handle tree traversals in SQL. Build the hierarchy first, then aggregate subordinate counts and budgets with self-joins or window functions.
