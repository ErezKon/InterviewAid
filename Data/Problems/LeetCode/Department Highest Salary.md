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

## Examples

**Example 1:**

| EmployeeId | Name   | Salary | DepartmentId |
|------------|--------|--------|--------------|
| 1          | Alice  | 120000 | 1            |
| 2          | Bob    | 95000  | 1            |
| 3          | Carol  | 130000 | 2            |
| 4          | Dave   | 115000 | 2            |

**Department Table**

| DepartmentId | Name        |
|--------------|-------------|
| 1            | Engineering |
| 2            | Marketing   |

**Output:**

| Department | Employee | Salary |
|------------|----------|--------|
| Engineering | Alice   | 120000 |
| Marketing   | Carol   | 130000 |

*Explanation:* The query selects the maximum salary per department and returns the employee(s) earning that salary.

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