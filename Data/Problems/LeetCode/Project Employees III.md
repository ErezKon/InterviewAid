# 1077. Project Employees III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/project-employees-iii](https://leetcode.com/problems/project-employees-iii)
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

Write a solution to report the **most experienced** employees in each project. In case of a tie, report all employees with the maximum number of experience years.

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
| 3           | John   | 3                |
| 4           | Doe    | 2                |
+-------------+--------+------------------+
Output:
+-------------+---------------+
| project_id  | employee_id   |
+-------------+---------------+
| 1           | 1             |
| 1           | 3             |
| 2           | 1             |
+-------------+---------------+
Explanation: Both employees with id 1 and 3 have the most experience among the employees of the first project. For the second project, the employee with id 1 has the most experience.
```

## Approach
Use a window function to rank distinct experience values per project and then select rows with rank 2.

```text
FUNCTION SecondHighestExperience():
    // Join Project and Employee, rank distinct experience per project
    RETURN SELECT p.project_id, e.employee_id, e.experience_years
           FROM (
               SELECT p.project_id, e.employee_id, e.experience_years,
                      DENSE_RANK() OVER (PARTITION BY p.project_id ORDER BY e.experience_years DESC) AS rnk
               FROM Project p
               JOIN Employee e ON p.employee_id = e.employee_id
           ) AS sub
           WHERE rnk = 2;
```

## Walkthrough
1. Join `Project` with `Employee` to associate each employee's experience with their project.
2. Apply `DENSE_RANK()` partitioned by `project_id` ordered by `experience_years` descending; this assigns rank 1 to the highest experience, rank 2 to the second highest, etc.
3. Filter rows where the rank equals 2, yielding employees with the second‑highest experience for each project.

## Complexity Analysis
- Time: O(N log N) due to the ranking operation, where N is the number of rows in `Project`.
- Space: O(N) for the intermediate ranked result set.

## Follow-Up Questions
- How to retrieve the top K experience levels per project?
- How to handle ties when multiple employees share the same second‑highest experience?
- How to compute the average experience of employees above a certain rank?

## Key Takeaway
`DENSE_RANK()` (or `RANK()`) lets you efficiently isolate rows based on their ordered position within each group, simplifying “nth‑largest” queries.
