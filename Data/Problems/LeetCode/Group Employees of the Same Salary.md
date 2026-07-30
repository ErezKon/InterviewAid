# 1875. Group Employees of the Same Salary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/group-employees-of-the-same-salary](https://leetcode.com/problems/group-employees-of-the-same-salary)
**Companies:** Clari

---

## 1. Problem Description

Assign team IDs to employees such that employees with the same salary are in the same team. Exclude salaries that appear only once. (SQL problem)

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

| employee_id | name   | salary |
|-------------|--------|--------|
| 1           | Alice  | 1000   |
| 2           | Bob    | 1500   |
| 3           | Carol  | 1000   |
| 4           | Dave   | 2000   |
| 5           | Eve    | 1500   |

**Result:**
- Team 1: Alice, Carol (salary 1000)
- Team 2: Bob, Eve (salary 1500)

## Walkthrough

1. Identify salaries appearing more than once using a sub‑query with `GROUP BY` and `HAVING COUNT(*) > 1`.
2. Filter the `Employees` table to keep only those rows.
3. Apply `DENSE_RANK()` ordered by salary to assign sequential `team_id`s.
4. Order the final output by `team_id` and `employee_id` for readability.

## Complexity Analysis

- The sub‑query groups by `salary`: **O(N)** time where N is the number of employees.
- `DENSE_RANK()` runs in linear time over the filtered rows.
- Overall time complexity: **O(N)**.
- Extra space for grouping and ranking: **O(K)** where K is the number of distinct qualifying salaries.

## Follow-Up Questions

- How would you modify the query to include employees with unique salaries in their own team?
- Can you write a version that returns the top‑K salary groups with the most employees?
- How would you handle this problem if the data were stored in a NoSQL document store?

## Key Takeaway

> Use `DENSE_RANK()` after filtering salaries with count > 1 to assign compact team IDs to groups of employees sharing the same salary.
