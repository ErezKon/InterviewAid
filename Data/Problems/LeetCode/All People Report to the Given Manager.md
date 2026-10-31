# 1270. All People Report to the Given Manager

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/all-people-report-to-the-given-manager](https://leetcode.com/problems/all-people-report-to-the-given-manager)
**Companies:** Amazon, Google

---

## 1. Problem Description

**SQL Problem.**

Table: `Employees`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| employee_id   | int     |
| employee_name | varchar |
| manager_id    | int     |
+---------------+---------+
employee_id is the column of unique values for this table.
Each row of this table indicates that the employee with ID employee_id and name employee_name reports his work to his/her direct manager with manager_id
The head of the company is the employee with employee_id = 1.
```

Write a solution to find `employee_id` of all employees that directly or indirectly report their work to the head of the company.

The indirect relation between managers **will not exceed three managers** as the company is small.

Return the result table in **any order**.

## Examples
```
Example 1:
  Input:
  Employees table:
  +-------------+---------------+------------+
  | employee_id | employee_name | manager_id |
  +-------------+---------------+------------+
  | 1           | Boss          | 1          |
  | 3           | Alice         | 3          |
  | 2           | Bob           | 1          |
  | 4           | Daniel        | 2          |
  | 7           | Luis          | 4          |
  | 8           | Jhon          | 3          |
  | 9           | Angela        | 8          |
  | 77          | Robert        | 1          |
  +-------------+---------------+------------+
  Output:
  +-------------+
  | employee_id |
  +-------------+
  | 2           |
  | 77          |
  | 4           |
  | 7           |
  +-------------+
  Explanation:
  The head of the company is the employee with employee_id 1.
  The employees with employee_id 2 and 77 report their work directly to the head of the company.
  The employee with employee_id 4 reports their work indirectly to the head of the company 4 --> 2 --> 1.
  The employee with employee_id 7 reports their work indirectly to the head of the company 7 --> 4 --> 2 --> 1.
  The employees with employee_id 3, 8, and 9 do not report their work to the head of the company directly or indirectly.
```

## Walkthrough
1. Use a recursive CTE to start from the head manager (id = 1).
2. Iteratively join `Employees` on `manager_id` to collect direct reports.
3. The recursion continues until no more reports are found.
4. Exclude the head manager from the final result.

## Complexity Analysis
- **Time:** O(N) where N is the number of employees, as each row is visited once in the recursion.
- **Space:** O(N) for the recursion stack / temporary result set.

## Approach: Self-Joins (3 levels deep) ✅

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
