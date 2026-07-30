# 1731. The Number of Employees Which Report to Each Employee

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee](https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given an `Employees` table with columns `employee_id`, `name`, `age`, and `reports_to` (the manager's `employee_id`), return for each manager the number of direct reports and the average age of those reports. Managers with no reports should have a count of `0` and `NULL` for average age.

## Examples
| employee_id | name   | reports_count | average_age |
|-------------|--------|---------------|-------------|
| 1           | Alice  | 3             | 30          |
| 2           | Bob    | 0             | NULL        |
*Explanation:* Alice manages three employees whose ages average to 30. Bob has no direct reports.

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