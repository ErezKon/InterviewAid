# 1076. Project Employees II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/project-employees-ii](https://leetcode.com/problems/project-employees-ii)
**Companies:** Meta

---

## Problem Description
Given tables `Project(project_id, employee_id)` and `Employee(employee_id, experience_years)`, return for each `project_id` the employee with the highest `experience_years`. If multiple employees share the maximum experience, return all of them.

## Examples
| project_id | employee_id | experience_years |
|------------|-------------|------------------|
| 1          | 101         | 5 |
| 1          | 102         | 5 |
| 2          | 103         | 3 |

*Explanation*: Project 1 has two top‑experienced employees (101 and 102) with 5 years each. Project 2’s top employee is 103.

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
