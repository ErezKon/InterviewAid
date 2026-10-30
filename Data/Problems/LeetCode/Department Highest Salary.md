# 184. Department Highest Salary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/department-highest-salary](https://leetcode.com/problems/department-highest-salary)
**Companies:** Amazon, Google, Meta, Microsoft, Target, Tcs, Tencent

---

## Problem Description

Table: `Employee`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| id           | int     |
| name         | varchar |
| salary       | int     |
| departmentId | int     |
+--------------+---------+
id is the primary key (column with unique values) for this table.
departmentId is a foreign key (reference columns) of the ID from the Department table.
Each row of this table indicates the ID, name, and salary of an employee. It also contains the ID of their department.
```

Table: `Department`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+
id is the primary key (column with unique values) for this table. It is guaranteed that department name is not NULL.
Each row of this table indicates the ID of a department and its name.
```

Write a solution to find employees who have the highest salary in each of the departments.

Return the result table in **any order**.

The result format is in the following example.

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

## Examples

```
Example 1:
  Input:
  Employee table:
  +----+-------+--------+--------------+
  | id | name  | salary | departmentId |
  +----+-------+--------+--------------+
  | 1  | Joe   | 70000  | 1            |
  | 2  | Jim   | 90000  | 1            |
  | 3  | Henry | 80000  | 2            |
  | 4  | Sam   | 60000  | 2            |
  | 5  | Max   | 90000  | 1            |
  +----+-------+--------+--------------+
  Department table:
  +----+-------+
  | id | name  |
  +----+-------+
  | 1  | IT    |
  | 2  | Sales |
  +----+-------+
  Output:
  +------------+----------+--------+
  | Department | Employee | Salary |
  +------------+----------+--------+
  | IT         | Jim      | 90000  |
  | Sales      | Henry    | 80000  |
  | IT         | Max      | 90000  |
  +------------+----------+--------+
  Explanation: Max and Jim both have the highest salary in the IT department and Henry has the
  highest salary in the Sales department.
```

---

## Walkthrough

1. **Subquery** – `SELECT departmentId, MAX(salary) FROM Employee GROUP BY departmentId` computes the highest salary for each department.
2. **Join** – The main query joins `Employee` with `Department` to obtain department names.
3. **Composite IN** – The `WHERE (e.departmentId, e.salary) IN (…)` clause matches each employee whose `(departmentId, salary)` pair appears in the subquery result, handling ties automatically.
4. The final projection returns `Department`, `Employee`, and `Salary` columns.

---

## Complexity Analysis

- **Time Complexity:** O(N) – each row of the `Employee` table is scanned once in the aggregation and once in the join.
- **Space Complexity:** O(D) – additional space for storing the maximum salary per department, where D is the number of departments.

---

## Follow-Up Questions

- How would you modify the query to return the top **three** salaries per department?
- How can you handle cases where multiple employees share the same highest salary?
- How would you write a similar query using window functions?

---

## Key Takeaway

> **Tuple IN subquery: `WHERE (col1, col2) IN (SELECT ...)` elegantly matches composite conditions. Handles ties naturally (multiple employees can share the max salary).