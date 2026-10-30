# 177. Nth Highest Salary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/nth-highest-salary](https://leetcode.com/problems/nth-highest-salary)
**Companies:** Accenture, Amazon, Atlassian, Bloomberg, Deloitte, Google, Meta, Microsoft, Zs Associates

---

## Problem Description
Table: `Employee`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| salary      | int  |
+-------------+------+
id is the primary key (column with unique values) for this table.
Each row of this table contains information about the salary of an employee.
```

Write a solution to find the `n^th` highest **distinct** salary from the `Employee` table. If there are less than `n` distinct salaries, return `null`.

The result format is in the following example.

## Examples

```
Example 1:
  Input:
  Employee table:
  +----+--------+
  | id | salary |
  +----+--------+
  | 1  | 100    |
  | 2  | 200    |
  | 3  | 300    |
  +----+--------+
  n = 2
  Output:
  +------------------------+
  | getNthHighestSalary(2) |
  +------------------------+
  | 200                    |
  +------------------------+
```

```
Example 2:
  Input:
  Employee table:
  +----+--------+
  | id | salary |
  +----+--------+
  | 1  | 100    |
  +----+--------+
  n = 2
  Output:
  +------------------------+
  | getNthHighestSalary(2) |
  +------------------------+
  | null                   |
  +------------------------+
```

## Approach
**Algorithm:** Use `ORDER BY salary DESC` with `LIMIT` and `OFFSET` to skip the first `N-1` distinct salaries.

```text
FUNCTION getNthHighestSalary(N):
    SET offset ← N - 1
    RETURN (
        SELECT DISTINCT salary FROM Employee
        ORDER BY salary DESC
        LIMIT 1 OFFSET offset
    )
```

## Walkthrough
For `N = 2`:
1. Retrieve distinct salaries sorted descending: `[5000, 4000, 3000, ...]`.
2. `OFFSET = 1` skips the first salary (5000).
3. `LIMIT 1` returns the next salary → `4000`.
If the table has fewer than `N` distinct salaries, the query returns `NULL`.

## Complexity Analysis
- **Time:** O(M log M) where M is the number of rows (due to sorting).
- **Space:** O(M) for the intermediate distinct salary list.

## Follow‑Up Questions
- How would you implement this without using `LIMIT`/`OFFSET`?
- Can you solve it in a single pass using window functions?
- How to handle ties when multiple employees share the same salary?

## Key Takeaway
Sorting distinct salaries and offsetting by `N-1` yields the N‑th highest salary directly.
