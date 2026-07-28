# 1077. Project Employees III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/project-employees-iii](https://leetcode.com/problems/project-employees-iii)
**Companies:** Meta

---

## Problem Description
Given tables `Project(project_id, employee_id)` and `Employee(employee_id, experience_years)`, for each `project_id` return the employee(s) whose `experience_years` is the **second highest** among employees assigned to that project. If a project has fewer than two distinct experience values, return an empty set for that project.

## Examples
| project_id | employee_id | experience_years |
|------------|-------------|------------------|
| 1          | 101         | 5 |
| 1          | 102         | 3 |
| 1          | 103         | 5 |
| 1          | 104         | 2 |
| 2          | 201         | 4 |
| 2          | 202         | 4 |

*Explanation*: For project 1, the highest experience is 5, the second highest is 3, so employee 102 is returned. Project 2 has only one distinct experience value, so no rows are returned.

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
