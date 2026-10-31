# 579. Find Cumulative Salary of an Employee

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-cumulative-salary-of-an-employee](https://leetcode.com/problems/find-cumulative-salary-of-an-employee)
**Companies:** Amazon

---

## Problem Description

Table: `Employee`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| month       | int  |
| salary      | int  |
+-------------+------+
(id, month) is the primary key (combination of columns with unique values) for this table.
Each row in the table indicates the salary of an employee in one month during the year 2020.
```

Write a solution to calculate the **cumulative salary summary** for every employee in a single unified table.

The **cumulative salary summary** for an employee can be calculated as follows:

- For each month that the employee worked, **sum** up the salaries in **that month** and the **previous two months**. This is their **3-month sum** for that month. If an employee did not work for the company in previous months, their effective salary for those months is `0`.
- Do **not** include the 3-month sum for the **most recent month** that the employee worked for in the summary.
- Do **not** include the 3-month sum for any month the employee **did not work**.

Return the result table ordered by `id` in **ascending order**. In case of a tie, order it by `month` in **descending order**.

The result format is in the following example.

---

## Examples

```
Example 1:
  Input:
  Employee table:
  +----+-------+--------+
  | id | month | salary |
  +----+-------+--------+
  | 1  | 1     | 20     |
  | 2  | 1     | 20     |
  | 1  | 2     | 30     |
  | 2  | 2     | 30     |
  | 3  | 2     | 40     |
  | 1  | 3     | 40     |
  | 3  | 3     | 60     |
  | 1  | 4     | 60     |
  | 3  | 4     | 70     |
  | 1  | 7     | 90     |
  | 1  | 8     | 90     |
  +----+-------+--------+
  Output:
  +----+-------+--------+
  | id | month | Salary |
  +----+-------+--------+
  | 1  | 7     | 90     |
  | 1  | 4     | 130    |
  | 1  | 3     | 90     |
  | 1  | 2     | 50     |
  | 1  | 1     | 20     |
  | 2  | 1     | 20     |
  | 3  | 3     | 100    |
  | 3  | 2     | 40     |
  +----+-------+--------+
  Explanation:
  Employee '1' has five salary records excluding their most recent month '8':
  - 90 for month '7'.
  - 60 for month '4'.
  - 40 for month '3'.
  - 30 for month '2'.
  - 20 for month '1'.
  So the cumulative salary summary for this employee is:
  +----+-------+--------+
  | id | month | salary |
  +----+-------+--------+
  | 1  | 7     | 90     |  (90 + 0 + 0)
  | 1  | 4     | 130    |  (60 + 40 + 30)
  | 1  | 3     | 90     |  (40 + 30 + 20)
  | 1  | 2     | 50     |  (30 + 20 + 0)
  | 1  | 1     | 20     |  (20 + 0 + 0)
  +----+-------+--------+
  Note that the 3-month sum for month '7' is 90 because they did not work during month '6' or month '5'.

  Employee '2' only has one salary record (month '1') excluding their most recent month '2'.
  +----+-------+--------+
  | id | month | salary |
  +----+-------+--------+
  | 2  | 1     | 20     |  (20 + 0 + 0)
  +----+-------+--------+

  Employee '3' has two salary records excluding their most recent month '4':
  - 60 for month '3'.
  - 40 for month '2'.
  So the cumulative salary summary for this employee is:
  +----+-------+--------+
  | id | month | salary |
  +----+-------+--------+
  | 3  | 3     | 100    |  (60 + 40 + 0)
  | 3  | 2     | 40     |  (40 + 0 + 0)
  +----+-------+--------+
```

---

## Walkthrough

| Step | Action |
|------|--------|
| 1 | For each row `e1` (employee, month) select rows `e2` with the same `id` where `e2.month` is between `e1.month-2` and `e1.month`. |
| 2 | Sum `e2.salary` to obtain the rolling 3-month total. |
| 3 | Exclude the most recent month by ensuring `e1.month` is less than the employee’s maximum month. |
| 4 | Order results by `id` and `month` descending. |

---

## Approach: Self-Join or Window Function ✅

```text
SELECT e1.id, e1.month,
       (SELECT SUM(e2.salary) FROM Employee e2
        WHERE e2.id = e1.id AND e2.month BETWEEN e1.month - 2 AND e1.month) AS salary
FROM Employee e1
WHERE e1.month < (SELECT MAX(month) FROM Employee WHERE id = e1.id)
ORDER BY id, month DESC;
```

---

## Complexity Analysis

- **Time:** O(N log N) if the database uses an index on `(id, month)`; otherwise a full table scan for each self-join leads to O(N²).
- **Space:** O(1) additional space beyond the result set; the query works in-place.

---

## Follow-Up Questions

1. How would you modify the query to compute a 6-month rolling sum?
2. How can you return the cumulative salary for each employee in a single row using window functions?
3. What indexes would you create to optimise the self-join version?

---

## Key Takeaway

> **3-month rolling sum via self-join or window function. Exclude most recent month per employee using a subquery filter.**
