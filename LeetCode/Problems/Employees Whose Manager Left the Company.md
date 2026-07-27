# 1978. Employees Whose Manager Left the Company

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/employees-whose-manager-left-the-company](https://leetcode.com/problems/employees-whose-manager-left-the-company)
**Companies:** Bloomberg, Google

---

## Problem Description

Given an `Employees` table (employee_id, name, manager_id, salary), find employees whose salary is less than $30,000 and whose manager has **left the company** (manager_id is not NULL but no longer in the table). Return results ordered by employee_id.

---

## Approach: LEFT JOIN or Subquery

```sql
SELECT e.employee_id
FROM Employees e
WHERE e.salary < 30000
  AND e.manager_id IS NOT NULL
  AND e.manager_id NOT IN (SELECT employee_id FROM Employees)
ORDER BY e.employee_id;
```

**Alternative with LEFT JOIN:**
```sql
SELECT e.employee_id
FROM Employees e
LEFT JOIN Employees m ON e.manager_id = m.employee_id
WHERE e.salary < 30000
  AND e.manager_id IS NOT NULL
  AND m.employee_id IS NULL
ORDER BY e.employee_id;
```

---

## Key Takeaway

> **`NOT IN (subquery)` or `LEFT JOIN ... IS NULL` both detect missing foreign key references. Use whichever reads more naturally for the context.**
