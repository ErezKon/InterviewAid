# 1875. Group Employees of the Same Salary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/group-employees-of-the-same-salary](https://leetcode.com/problems/group-employees-of-the-same-salary)
**Companies:** Clari

---

## 1. Problem Description

Table: `Employees`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| employee_id | int     |
| name        | varchar |
| salary      | int     |
+-------------+---------+
employee_id is the column with unique values for this table.
Each row of this table indicates the employee ID, employee name, and salary.
```

A company wants to divide the employees into teams such that all the members on each team have the **same salary**. The teams should follow these criteria:

- Each team should consist of **at least two** employees.
- All the employees on a team should have the **same salary**.
- All the employees of the same salary should be assigned to the same team.
- If the salary of an employee is unique, we **do not** assign this employee to any team.
- A team's ID is assigned based on the **rank of the team's salary** relative to the other teams' salaries, where the team with the **lowest** salary has `team_id = 1`. Note that the salaries for employees not on a team are **not included** in this ranking.

Write a solution to get the `team_id` of each employee that is in a team.

Return the result table ordered by `team_id` **in ascending order**. In case of a tie, order it by `employee_id` in **ascending order**.

The result format is in the following example.

## 2. Approach: DENSE_RANK on Salary ✅

```sql
SELECT employee_id, name, salary,
       DENSE_RANK() OVER (ORDER BY salary) AS team_id
FROM Employees
WHERE salary IN (
    SELECT salary FROM Employees
    GROUP BY salary HAVING COUNT(*) > 1
)
ORDER BY team_id, employee_id;
```

## Examples

```
Example 1:
  Input:
  Employees table:
  +-------------+---------+--------+
  | employee_id | name    | salary |
  +-------------+---------+--------+
  | 2           | Meir    | 3000   |
  | 3           | Michael | 3000   |
  | 7           | Addilyn | 7400   |
  | 8           | Juan    | 6100   |
  | 9           | Kannon  | 7400   |
  +-------------+---------+--------+
  Output:
  +-------------+---------+--------+---------+
  | employee_id | name    | salary | team_id |
  +-------------+---------+--------+---------+
  | 2           | Meir    | 3000   | 1       |
  | 3           | Michael | 3000   | 1       |
  | 7           | Addilyn | 7400   | 2       |
  | 9           | Kannon  | 7400   | 2       |
  +-------------+---------+--------+---------+
  Explanation:
  Meir (employee_id=2) and Michael (employee_id=3) are in the same team because they have the same salary of 3000.
  Addilyn (employee_id=7) and Kannon (employee_id=9) are in the same team because they have the same salary of 7400.
  Juan (employee_id=8) is not included in any team because their salary of 6100 is unique (i.e. no other employee has the same salary).
  The team IDs are assigned as follows (based on salary ranking, lowest first):
  - team_id=1: Meir and Michael, a salary of 3000
  - team_id=2: Addilyn and Kannon, a salary of 7400
  Juan's salary of 6100 is not included in the ranking because they are not on a team.
```

## Walkthrough

1. Identify salaries appearing more than once using a sub-query with `GROUP BY` and `HAVING COUNT(*) > 1`.
2. Filter the `Employees` table to keep only those rows.
3. Apply `DENSE_RANK()` ordered by salary to assign sequential `team_id`s.
4. Order the final output by `team_id` and `employee_id` for readability.

## Complexity Analysis

- The sub-query groups by `salary`: **O(N)** time where N is the number of employees.
- `DENSE_RANK()` runs in linear time over the filtered rows.
- Overall time complexity: **O(N)**.
- Extra space for grouping and ranking: **O(K)** where K is the number of distinct qualifying salaries.

## Follow-Up Questions

- How would you modify the query to include employees with unique salaries in their own team?
- Can you write a version that returns the top-K salary groups with the most employees?
- How would you handle this problem if the data were stored in a NoSQL document store?

## Key Takeaway

> Use `DENSE_RANK()` after filtering salaries with count > 1 to assign compact team IDs to groups of employees sharing the same salary.
