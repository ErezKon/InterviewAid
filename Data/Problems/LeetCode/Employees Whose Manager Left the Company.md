# 1978. Employees Whose Manager Left the Company

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/employees-whose-manager-left-the-company](https://leetcode.com/problems/employees-whose-manager-left-the-company)
**Companies:** Bloomberg, Google

---

## Problem Description

Table: `Employees`

```
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| employee_id | int      |
| name        | varchar  |
| manager_id  | int      |
| salary      | int      |
+-------------+----------+
In SQL, employee_id is the primary key for this table.
This table contains information about the employees, their salary, and the ID of their manager. Some employees do not have a manager (manager_id is null).
```

Find the IDs of the employees whose salary is strictly less than `$30000` and whose manager left the company. When a manager leaves the company, their information is deleted from the `Employees` table, but the reports still have their `manager_id` set to the manager that left.

Return the result table ordered by `employee_id`.

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

## Examples

```
Example 1:
  Input:
  Employees table:
  +-------------+-----------+------------+--------+
  | employee_id | name      | manager_id | salary |
  +-------------+-----------+------------+--------+
  | 3           | Mila      | 9          | 60301  |
  | 12          | Antonella | null       | 31000  |
  | 13          | Emery     | null       | 67084  |
  | 1           | Kalel     | 11         | 21241  |
  | 9           | Mikaela   | null       | 50937  |
  | 11          | Joziah    | 6          | 28485  |
  +-------------+-----------+------------+--------+
  Output:
  +-------------+
  | employee_id |
  +-------------+
  | 11          |
  +-------------+
  Explanation:
  The employees with a salary less than $30000 are 1 (Kalel) and 11 (Joziah).
  Kalel's manager is employee 11, who is still in the company (Joziah).
  Joziah's manager is employee 6, who left the company because there is no row for employee 6 as it was deleted.
```

---

## Walkthrough

1. **Filter salary** – keep rows where `salary < 30000`.
2. **Exclude null managers** – `manager_id IS NOT NULL` ensures the employee had a manager.
3. **Detect missing manager** – `manager_id NOT IN (SELECT employee_id FROM Employees)` (or `LEFT JOIN … IS NULL`) finds manager IDs that no longer exist.
4. **Order** – final result ordered by `employee_id`.

---

## Complexity Analysis

- **Time:** O(N) – a single scan of the table plus a subquery/join on the same table.
- **Space:** O(N) – extra space for the join or subquery result set.

---

## Key Takeaway

> **`NOT IN (subquery)` or `LEFT JOIN … IS NULL` both detect missing foreign key references. Use whichever reads more naturally for the context.**