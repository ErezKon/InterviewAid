# 1378. Replace Employee ID With The Unique Identifier

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier](https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier)
**Companies:** Amazon, Bloomberg, Cognizant, Google, Infosys, Meta, Microsoft, Point72, Tcs

---

## Problem Description

Table: `Employees`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| name          | varchar |
+---------------+---------+
id is the primary key (column with unique values) for this table.
Each row of this table contains the id and the name of an employee in a company.
```

Table: `EmployeeUNI`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| unique_id     | int     |
+---------------+---------+
(id, unique_id) is the primary key (combination of columns with unique values) for this table.
Each row of this table contains the id and the corresponding unique id of an employee in the company.
```

Write a solution to show the **unique ID **of each user, If a user does not have a unique ID replace just show `null`.

Return the result table in **any** order.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Employees table:
+----+----------+
| id | name     |
+----+----------+
| 1  | Alice    |
| 7  | Bob      |
| 11 | Meir     |
| 90 | Winston  |
| 3  | Jonathan |
+----+----------+
EmployeeUNI table:
+----+-----------+
| id | unique_id |
+----+-----------+
| 3  | 1         |
| 11 | 2         |
| 90 | 3         |
+----+-----------+
Output:
+-----------+----------+
| unique_id | name     |
+-----------+----------+
| null      | Alice    |
| null      | Bob      |
| 2         | Meir     |
| 3         | Winston  |
| 1         | Jonathan |
+-----------+----------+
Explanation:
Alice and Bob do not have a unique ID, We will show null instead.
The unique ID of Meir is 2.
The unique ID of Winston is 3.
The unique ID of Jonathan is 1.
```

## Approach
Perform a left join from `Employees` to `EmployeeUNI` on the `id` column, selecting the employee name and the unique identifier.

```text
FUNCTION GetEmployeeUniqueIds():
    // Retrieve employee name and unique identifier using left join
    SELECT e.name, eu.unique_id
    FROM Employees e
    LEFT JOIN EmployeeUNI eu ON e.id = eu.id;
```

## Walkthrough
| Step | Operation | Resulting Row |
|------|-----------|---------------|
| 1 | Left join on `id=1` | ("Alice", 1001) |
| 2 | Left join on `id=2` | ("Bob", NULL) |
| 3 | Left join on `id=3` | ("Carol", 1003) |

## Complexity Analysis
- Time: O(N) where N is the number of rows in `Employees` (assuming indexed join).
- Space: O(N) for the result set.

## Follow-Up Questions
1. How would you handle duplicate `id` values in either table?
2. How to return only employees that have a unique identifier?
3. How to update the `EmployeeUNI` table to add missing identifiers?

## Key Takeaway
A left join lets you keep all rows from the primary table while optionally attaching matching data from a secondary table.
