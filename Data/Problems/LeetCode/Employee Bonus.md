# 577. Employee Bonus

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/employee-bonus](https://leetcode.com/problems/employee-bonus)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Netsuite, Tcs

---

## Problem Description

Table: `Employee`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| empId       | int     |
| name        | varchar |
| supervisor  | int     |
| salary      | int     |
+-------------+---------+
empId is the column with unique values for this table.
Each row of this table indicates the name and the ID of an employee in addition to their salary and the id of their manager.
```

Table: `Bonus`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| empId       | int  |
| bonus       | int  |
+-------------+------+
empId is the column of unique values for this table.
empId is a foreign key (reference column) to empId from the Employee table.
Each row of this table contains the id of an employee and their respective bonus.
```

Write a solution to report the name and bonus amount of each employee who satisfies either of the following:

- The employee has a bonus **less than** `1000`.
- The employee did not get any bonus.

Return the result table in **any order**.

The result format is in the following example.

---

## Key Insight

> `LEFT JOIN` keeps employees even if they have no matching bonus row. The `WHERE` must handle `NULL` explicitly since `NULL < 1000` is `NULL` (not `TRUE`).

---

## Approach: LEFT JOIN + NULL Check

```text
SELECT e.name, b.bonus
FROM Employee e
LEFT JOIN Bonus b ON e.empId = b.empId
WHERE b.bonus < 1000 OR b.bonus IS NULL;
```

---

## Examples

**Example 1:**
```
Input:
Employee table:
+-------+--------+------------+--------+
| empId | name   | supervisor | salary |
+-------+--------+------------+--------+
| 3     | Brad   | null       | 4000   |
| 1     | John   | 3          | 1000   |
| 2     | Dan    | 3          | 2000   |
| 4     | Thomas | 3          | 4000   |
+-------+--------+------------+--------+
Bonus table:
+-------+-------+
| empId | bonus |
+-------+-------+
| 2     | 500   |
| 4     | 2000  |
+-------+-------+
Output:
+------+-------+
| name | bonus |
+------+-------+
| Brad | null  |
| John | null  |
| Dan  | 500   |
+------+-------+
```

---

## Walkthrough

1. Perform a `LEFT JOIN` on `Employee.empId = Bonus.empId`.
2. For each joined row, the `bonus` column is either a value or `NULL`.
3. The `WHERE` clause keeps rows where `bonus < 1000` **or** `bonus IS NULL`.
4. The final projection returns the employee name and bonus (or `NULL`).

---

## Complexity Analysis

- **Time:** `O(N)` where `N` is the number of employees (joins are linear with proper indexing).
- **Space:** `O(N)` for the result set.

---

## Follow-Up Questions

- How would you modify the query to also include employees whose bonus is between 1000 and 2000?
- Can you write a version that returns the total count of qualifying employees?

---

## Key Takeaway

> **LEFT JOIN + IS NULL is the SQL pattern for "include rows with no match." Always check for NULL explicitly in WHERE clauses since NULL comparisons return NULL, not FALSE.**