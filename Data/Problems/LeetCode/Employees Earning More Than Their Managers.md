# 181. Employees Earning More Than Their Managers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/employees-earning-more-than-their-managers](https://leetcode.com/problems/employees-earning-more-than-their-managers)
**Companies:** Accenture, Amazon, Bloomberg, Cognizant, Google, Meta, Microsoft, Tcs, Wix, Yandex

---

## Problem Description

Table: `Employee`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| salary      | int     |
| managerId   | int     |
+-------------+---------+
id is the primary key (column with unique values) for this table.
Each row of this table indicates the ID of an employee, their name, salary, and the ID of their manager.
```

Write a solution to find the employees who earn more than their managers.

Return the result table in **any order**.

---

## Key Insight

> Self-join the `Employee` table: alias `e` for the employee and `m` for the manager, joining on `e.managerId = m.id`. Then filter where `e.salary > m.salary`.

---

## Approach: Self-Join

```sql
SELECT e.name AS Employee
FROM Employee e
JOIN Employee m ON e.managerId = m.id
WHERE e.salary > m.salary;
```

---

## Examples

```
Example 1:
  Input:
  Employee table:
  +----+-------+--------+-----------+
  | id | name  | salary | managerId |
  +----+-------+--------+-----------+
  | 1  | Joe   | 70000  | 3         |
  | 2  | Henry | 80000  | 4         |
  | 3  | Sam   | 60000  | Null      |
  | 4  | Max   | 90000  | Null      |
  +----+-------+--------+-----------+
  Output:
  +----------+
  | Employee |
  +----------+
  | Joe      |
  +----------+
  Explanation: Joe is the only employee who earns more than his manager.
```

---

## Walkthrough

1. **Self‑join** the table: `e` represents each employee, `m` represents their manager.
2. **Match** rows where `e.managerId = m.id`.
3. **Filter** rows where `e.salary > m.salary`.
4. **Select** the employee name from the filtered rows.

The join pairs each employee with their manager, and the `WHERE` clause keeps only those pairs where the employee's salary exceeds the manager's.

---

## Complexity Analysis

- **Time:** O(N) – a single self‑join scans the table once.
- **Space:** O(N) – additional space for the join result.

---

## Key Takeaway

> **Self‑join is the SQL pattern for comparing rows within the same table. Join employee to manager via the foreign key, then apply the comparison in WHERE.**