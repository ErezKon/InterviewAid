# 1075. Project Employees I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/project-employees-i](https://leetcode.com/problems/project-employees-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Problem Description
Given tables `Project(project_id, employee_id)` and `Employee(employee_id, experience_years)`, compute the average years of experience of employees assigned to each project. Return each `project_id` with its average experience rounded to two decimal places.

## Examples
| project_id | average_years |
|------------|--------------|
| 1          | 3.50 |
| 2          | 5.00 |

*Explanation*: Project 1 has employees with 3 and 4 years of experience, average is 3.5. Project 2 has a single employee with 5 years.

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
