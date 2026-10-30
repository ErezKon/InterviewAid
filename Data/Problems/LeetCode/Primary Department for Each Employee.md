# 1789. Primary Department for Each Employee

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/primary-department-for-each-employee](https://leetcode.com/problems/primary-department-for-each-employee)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Table: `Employee`

```
+---------------+---------+
| Column Name   |  Type   |
+---------------+---------+
| employee_id   | int     |
| department_id | int     |
| primary_flag  | varchar |
+---------------+---------+
(employee_id, department_id) is the primary key (combination of columns with unique values) for this table.
employee_id is the id of the employee.
department_id is the id of the department to which the employee belongs.
primary_flag is an ENUM (category) of type ('Y', 'N'). If the flag is 'Y', the department is the primary department for the employee. If the flag is 'N', the department is not the primary.
```

Employees can belong to multiple departments. When the employee joins other departments, they need to decide which department is their primary department. Note that when an employee belongs to only one department, their primary column is `'N'`.

Write a solution to report all the employees with their primary department. For employees who belong to one department, report their only department.

Return the result table in **any order**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Employee table:
+-------------+---------------+--------------+
| employee_id | department_id | primary_flag |
+-------------+---------------+--------------+
| 1           | 1             | N            |
| 2           | 1             | Y            |
| 2           | 2             | N            |
| 3           | 3             | N            |
| 4           | 2             | N            |
| 4           | 3             | Y            |
| 4           | 4             | N            |
+-------------+---------------+--------------+
Output:
+-------------+---------------+
| employee_id | department_id |
+-------------+---------------+
| 1           | 1             |
| 2           | 1             |
| 3           | 3             |
| 4           | 3             |
+-------------+---------------+
Explanation:
- The Primary department for employee 1 is 1.
- The Primary department for employee 2 is 1.
- The Primary department for employee 3 is 3.
- The Primary department for employee 4 is 3.
```

## Approach
Use a single SQL query:
1. Select rows where `primary_flag = 'Y'`.
2. UNION with employees that appear exactly once in the table (single department) using `GROUP BY` and `HAVING COUNT(*) = 1`.
3. Project `employee_id` and `department_id`.
The provided query already implements this logic.

## Walkthrough
| Step | Action | Result |
|------|--------|--------|
|1|Filter rows with `primary_flag = 'Y'`|returns (1,10)|
|2|Find employees with a single row via `GROUP BY … HAVING COUNT(*) = 1`|returns (2,20) and (3,30)|
|3|Combine both sets with `UNION`|final result set as shown.

## Complexity Analysis
Time: O(N) where N is the number of rows, due to a single scan for grouping and filtering.
Space: O(N) for intermediate grouping structures.

## Follow-Up Questions
1. How would you modify the query to handle ties when multiple rows have `primary_flag = 'Y'`?
2. Can you write a solution without using `UNION` (e.g., using window functions)?
3. How would you adapt the query for a hierarchical department structure?

## Key Takeaway
A concise SQL query can retrieve each employee's primary department by combining a flag filter with a single‑row detection via grouping.
