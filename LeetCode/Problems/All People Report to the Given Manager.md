# 1270. All People Report to the Given Manager

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/all-people-report-to-the-given-manager](https://leetcode.com/problems/all-people-report-to-the-given-manager)
**Companies:** Amazon, Google

---

## 1. Problem Description

**SQL Problem.** Given an `Employees` table with `employee_id`, `employee_name`, and `manager_id`, find all employees who report **directly or indirectly** to the head manager (employee_id = 1). Do not include the head manager.

---

## 2. Approach: Self-Joins (3 levels deep) ✅

```sql
SELECT e.employee_id
FROM Employees e
JOIN Employees m1 ON e.manager_id = m1.employee_id
JOIN Employees m2 ON m1.manager_id = m2.employee_id
WHERE m2.manager_id = 1
  AND e.employee_id != 1;
```

Alternative with recursive CTE for arbitrary depth:
```sql
WITH RECURSIVE chain AS (
    SELECT employee_id FROM Employees WHERE manager_id = 1 AND employee_id != 1
    UNION ALL
    SELECT e.employee_id FROM Employees e JOIN chain c ON e.manager_id = c.employee_id
)
SELECT employee_id FROM chain;
```

---

## Key Takeaway

> For fixed-depth hierarchies, self-joins work. For arbitrary depth, use recursive CTEs. The problem guarantees at most 3 levels, so 3 self-joins suffice.
