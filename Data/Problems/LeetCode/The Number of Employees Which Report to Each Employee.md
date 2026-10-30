# 1731. The Number of Employees Which Report to Each Employee

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee](https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Table: `Employees`

```
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| employee_id | int      |
| name        | varchar  |
| reports_to  | int      |
| age         | int      |
+-------------+----------+
employee_id is the column with unique values for this table.
This table contains information about the employees and the id of the manager they report to. Some employees do not report to anyone (reports_to is null).
```

For this problem, we will consider a **manager** an employee who has at least 1 other employee reporting to them.

Write a solution to report the ids and the names of all **managers**, the number of employees who report **directly** to them, and the average age of the reports rounded to the nearest integer.

Return the result table ordered by `employee_id`.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Employees table:
+-------------+---------+------------+-----+
| employee_id | name    | reports_to | age |
+-------------+---------+------------+-----+
| 9           | Hercy   | null       | 43  |
| 6           | Alice   | 9          | 41  |
| 4           | Bob     | 9          | 36  |
| 2           | Winston | null       | 37  |
+-------------+---------+------------+-----+
Output:
+-------------+-------+---------------+-------------+
| employee_id | name  | reports_count | average_age |
+-------------+-------+---------------+-------------+
| 9           | Hercy | 2             | 39          |
+-------------+-------+---------------+-------------+
Explanation: Hercy has 2 people report directly to him, Alice and Bob. Their average age is (41+36)/2 = 38.5, which is 39 after rounding it to the nearest integer.
```

**Example 2:**
```
Input:
Employees table:
+-------------+---------+------------+-----+
| employee_id | name    | reports_to | age |
|-------------|---------|------------|-----|
| 1           | Michael | null       | 45  |
| 2           | Alice   | 1          | 38  |
| 3           | Bob     | 1          | 42  |
| 4           | Charlie | 2          | 34  |
| 5           | David   | 2          | 40  |
| 6           | Eve     | 3          | 37  |
| 7           | Frank   | null       | 50  |
| 8           | Grace   | null       | 48  |
+-------------+---------+------------+-----+
Output:
+-------------+---------+---------------+-------------+
| employee_id | name    | reports_count | average_age |
| ----------- | ------- | ------------- | ----------- |
| 1           | Michael | 2             | 40          |
| 2           | Alice   | 2             | 37          |
| 3           | Bob     | 1             | 37          |
+-------------+---------+---------------+-------------+
```

## Approach
Use SQL aggregation with a self‑join. Join the table to itself on `reports_to = employee_id` to pair managers with their direct reports, then `GROUP BY` the manager fields and compute `COUNT` and `AVG`.

## Walkthrough
1. Self‑join `Employees e1` (managers) with `Employees e2` (reports) on `e1.employee_id = e2.reports_to`.
2. Group by `e1.employee_id, e1.name`.
3. Compute `COUNT(e2.employee_id)` for the number of reports.
4. Compute `AVG(e2.age)` for the average age; if no reports, AVG returns `NULL`.

## Complexity Analysis
The query scans the table twice (once for managers, once for reports) and performs a hash‑based join. Time complexity is `O(N)` where `N` is the number of rows. Space complexity is `O(N)` for the join hash table.

## Follow‑Up Questions
* How would you modify the query to include indirect reports (the whole subtree)?
* How to handle ties when multiple managers have the same number of reports?
* How to compute the median age of reports instead of the average?

## Key Takeaway
Self‑joining a table with itself and aggregating lets you compute per‑manager statistics such as report count and average age in a single SQL statement.