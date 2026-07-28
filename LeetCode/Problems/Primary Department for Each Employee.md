# 1789. Primary Department for Each Employee

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/primary-department-for-each-employee](https://leetcode.com/problems/primary-department-for-each-employee)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given an `Employee` table with columns `employee_id`, `department_id`, and `primary_flag` (which is `'Y'` for the primary department), return each employee's primary department. If an employee belongs to only one department, that department is considered primary even if the flag is not set.

## Examples
**Example 1:**
```sql
Employee table:
+-------------+--------------+--------------+
| employee_id | department_id| primary_flag |
+-------------+--------------+--------------+
| 1           | 10           | Y            |
| 1           | 12           | N            |
| 2           | 20           | N            |
| 2           | 21           | N            |
| 3           | 30           | N            |
+-------------+--------------+--------------+
```
Output:
```
+-------------+--------------+
| employee_id | department_id|
+-------------+--------------+
| 1           | 10           |
| 2           | 20           |
| 3           | 30           |
+-------------+--------------+
```
Explanation: Employee 1 has a primary flag, employee 2 has only one department, employee 3 also has a single department.

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
