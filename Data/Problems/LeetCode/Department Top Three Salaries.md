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

## Examples

**Example 1:**

| EmployeeId | Name   | Salary | DepartmentId |
|------------|--------|--------|--------------|
| 1          | Alice  | 120000 | 1            |
| 2          | Bob    | 115000 | 1            |
| 3          | Carol  | 130000 | 1            |
| 4          | Dave   | 110000 | 2            |
| 5          | Eve    | 105000 | 2            |
| 6          | Frank  | 100000 | 2            |

**Department Table**

| DepartmentId | Name |
|--------------|------|
| 1            | Engineering |
| 2            | Marketing |

**Output:**

| Department | Employee | Salary |
|------------|----------|--------|
| Engineering | Carol   | 130000 |
| Engineering | Alice   | 120000 |
| Engineering | Bob     | 115000 |
| Marketing   | Dave    | 110000 |
| Marketing   | Eve     | 105000 |
| Marketing   | Frank   | 100000 |

*Explanation:* The query returns the three highest salaries per department using either a correlated subquery counting higher distinct salaries or `DENSE_RANK` to rank salaries and filter the top three.

---

## Walkthrough

1. **Correlated Subquery** – For each employee, the inner query counts distinct salaries higher than the employee's salary within the same department.
2. **Filter** – Employees with a count less than 3 have a salary in the top three.
3. **Dense Rank** – The window function partitions rows by `departmentId` and orders by `salary` descending, assigning a rank that handles ties.
4. **Select** – Rows with rank `<= 3` are the top‑three earners per department.

---

## Complexity Analysis

- **Time Complexity:** O(N log N) – the `DENSE_RANK` approach sorts rows per department; the correlated subquery may be O(N²) in the worst case.
- **Space Complexity:** O(N) – additional space for sorting or temporary ranking structures.

---

## Follow-Up Questions

- How would you modify the query to return the top **N** salaries per department dynamically?
- How can you handle departments with fewer than three employees?
- How would you write this using a `ROW_NUMBER()` window function instead of `DENSE_RANK()`?

---

## Key Takeaway

> **Top‑N per group:** use `DENSE_RANK()` (or `ROW_NUMBER()`) with `PARTITION BY` to rank rows and filter `rnk <= N`. The correlated subquery counts higher distinct salaries as an alternative.
