# 1075. Project Employees I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/project-employees-i](https://leetcode.com/problems/project-employees-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Problem Description

Table: `Project`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| project_id  | int     |
| employee_id | int     |
+-------------+---------+
(project_id, employee_id) is the primary key of this table.
employee_id is a foreign key to `Employee` table.
Each row of this table indicates that the employee with employee_id is working on the project with project_id.
```

Table: `Employee`

```
+------------------+---------+
| Column Name      | Type    |
+------------------+---------+
| employee_id      | int     |
| name             | varchar |
| experience_years | int     |
+------------------+---------+
employee_id is the primary key of this table. It's guaranteed that experience_years is not NULL.
Each row of this table contains information about one employee.
```

Write an SQL query that reports the **average** experience years of all the employees for each project, **rounded to 2 digits**.

Return the result table in **any order**.

The query result format is in the following example.

## Examples

**Example 1:**
```
Input:
Project table:
+-------------+-------------+
| project_id  | employee_id |
+-------------+-------------+
| 1           | 1           |
| 1           | 2           |
| 1           | 3           |
| 2           | 1           |
| 2           | 4           |
+-------------+-------------+
Employee table:
+-------------+--------+------------------+
| employee_id | name   | experience_years |
+-------------+--------+------------------+
| 1           | Khaled | 3                |
| 2           | Ali    | 2                |
| 3           | John   | 1                |
| 4           | Doe    | 2                |
+-------------+--------+------------------+
Output:
+-------------+---------------+
| project_id  | average_years |
+-------------+---------------+
| 1           | 2.00          |
| 2           | 2.50          |
+-------------+---------------+
Explanation: The average experience years for the first project is (3 + 2 + 1) / 3 = 2.00 and for the second project is (3 + 2) / 2 = 2.50
```

## Approach
Use SQL aggregation to join the tables and compute the average per project.

```text
FUNCTION ComputeAverageExperience():
    // Join Project and Employee on employee_id
    // Group by project_id and calculate average experience
    RETURN SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years
           FROM Project p
           JOIN Employee e ON p.employee_id = e.employee_id
           GROUP BY p.project_id;
```

## Walkthrough
1. Join `Project` with `Employee` to associate each employee's experience with their project.
2. Group the joined rows by `project_id`.
3. Apply `AVG` on `experience_years` within each group.
4. Round the result to two decimal places.

## Complexity Analysis
- Time: O(N) where N is the number of rows in `Project` (join and aggregation are linear in the input size).
- Space: O(G) for storing aggregation results, where G is the number of distinct projects.

## Follow-Up Questions
- How would you modify the query to include projects with no employees?
- How to compute median experience per project instead of average?
- How to filter projects based on a minimum average experience threshold?

## Key Takeaway
Aggregating joined relational data with `GROUP BY` and `AVG` provides concise per‑group statistics.
