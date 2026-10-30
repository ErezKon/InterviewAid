# 1076. Project Employees II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/project-employees-ii](https://leetcode.com/problems/project-employees-ii)
**Companies:** Meta

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Project`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| project_id  | int     |
| employee_id | int     |
+-------------+---------+
(project_id, employee_id) is the primary key (combination of columns with unique values) of this table.
employee_id is a foreign key (reference column) to `Employee` table.
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
employee_id is the primary key (column with unique values) of this table.
Each row of this table contains information about one employee.
```

Write a solution to report all the **projects** that have the most employees.

Return the result table in **any order**.

The result format is in the following example.

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
+-------------+
| project_id  |
+-------------+
| 1           |
+-------------+
Explanation: The first project has 3 employees while the second one has 2.
```

## Approach
Use a window function to rank employees per project by experience and select the top rank.

```text
FUNCTION TopExperiencedEmployees():
    // Join Project and Employee, rank by experience within each project
    RETURN SELECT p.project_id, e.employee_id, e.experience_years
           FROM (
               SELECT p.project_id, e.employee_id, e.experience_years,
                      RANK() OVER (PARTITION BY p.project_id ORDER BY e.experience_years DESC) AS rnk
               FROM Project p
               JOIN Employee e ON p.employee_id = e.employee_id
           ) AS sub
           WHERE rnk = 1;
```

## Walkthrough
1. Join `Project` with `Employee` to pair each employee with their project.
2. Apply `RANK()` partitioned by `project_id` ordered by `experience_years` descending.
3. Filter rows where the rank equals 1 to keep only the most experienced employees per project.

## Complexity Analysis
- Time: O(N log N) due to the ranking operation, where N is the number of rows in `Project`.
- Space: O(N) for the intermediate ranking result.

## Follow-Up Questions
- How to retrieve the top K experienced employees per project?
- How to handle projects with no assigned employees?
- How to compute the average experience of the top M% employees per project?

## Key Takeaway
Window functions like `RANK()` enable easy extraction of top‑ranked rows within each group without multiple subqueries.
