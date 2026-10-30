# 2394. Employees With Deductions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/employees-with-deductions](https://leetcode.com/problems/employees-with-deductions)
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach below solves an invented array problem. This is a SQL problem: sum `CEIL(TIMESTAMPDIFF(SECOND, in_time, out_time) / 60)` minutes per employee from `Logs` (LEFT JOIN so employees without logs count as 0), and return employees where that total `< needed_hours * 60`.*

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Employees`

```
+--------------+------+
| Column Name  | Type |
+--------------+------+
| employee_id  | int  |
| needed_hours | int  |
+--------------+------+
employee_id is column with unique values for this table.
Each row contains the id of an employee and the minimum number of hours needed for them to work to get their salary.
```

Table: `Logs`

```
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| employee_id | int      |
| in_time     | datetime |
| out_time    | datetime |
+-------------+----------+
(employee_id, in_time, out_time) is the primary key (combination of columns with unique values) for this table.
Each row of this table shows the time stamps for an employee. in_time is the time the employee started to work, and out_time is the time the employee ended work.
All the times are in October 2022. out_time can be one day after in_time which means the employee worked after the midnight.
```

In a company, each employee must work a certain number of hours every month. Employees work in sessions. The number of hours an employee worked can be calculated from the sum of the number of minutes the employee worked in all of their sessions. The number of minutes in each session is rounded up.

- For example, if the employee worked for `51` minutes and `2` seconds in a session, we consider it `52` minutes.

Write a solution to report the IDs of the employees that will be deducted. In other words, report the IDs of the employees that did not work the needed hours.

Return the result table **in any order**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Employees table:
+-------------+--------------+
| employee_id | needed_hours |
+-------------+--------------+
| 1           | 20           |
| 2           | 12           |
| 3           | 2            |
+-------------+--------------+
Logs table:
+-------------+---------------------+---------------------+
| employee_id | in_time             | out_time            |
+-------------+---------------------+---------------------+
| 1           | 2022-10-01 09:00:00 | 2022-10-01 17:00:00 |
| 1           | 2022-10-06 09:05:04 | 2022-10-06 17:09:03 |
| 1           | 2022-10-12 23:00:00 | 2022-10-13 03:00:01 |
| 2           | 2022-10-29 12:00:00 | 2022-10-29 23:58:58 |
+-------------+---------------------+---------------------+
Output:
+-------------+
| employee_id |
+-------------+
| 2           |
| 3           |
+-------------+
Explanation:
Employee 1:
 - Worked for three sessions:
    - On 2022-10-01, they worked for 8 hours.
    - On 2022-10-06, they worked for 8 hours and 4 minutes.
    - On 2022-10-12, they worked for 4 hours and 1 minute. Note that they worked through midnight.
 - Employee 1 worked a total of 20 hours and 5 minutes across sessions and will not be deducted.
Employee 2:
 - Worked for one session:
    - On 2022-10-29, they worked for 11 hours and 59 minutes.
 - Employee 2 did not work their hours and will be deducted.
Employee 3:
 - Did not work any session.
 - Employee 3 did not work their hours and will be deducted.
```

## Approach
Iterate through each employee, compute the sum of deductions, calculate net salary, and collect IDs where net < k.

```text
FUNCTION EmployeesWithDeductions(employees, k):
    SET result ← []
    FOR each emp IN employees:
        SET totalDeduction ← SUM(emp.deductions)
        SET netSalary ← emp.salary - totalDeduction
        IF netSalary < k:
            APPEND emp.id TO result
    RETURN result
```

## Walkthrough
| emp.id | salary | deductions | totalDeduction | netSalary | net < k? |
|---|---|---|---|---|---|
|1|5000|[200,300]|500|4500|false (equal) |
|2|4000|[1000]|1000|3000|true → add 2 |

Result `[2]`.

## Complexity Analysis
- **Time:** O(N + D) where N is number of employees and D total number of deductions (each visited once).
- **Space:** O(1) extra besides output list.

## Follow-Up Questions
1. How would you modify the solution to return employees whose net salary is within a range `[low, high]`?
2. Can you process the data in a streaming fashion if the employee list is too large to fit in memory?
3. How would you handle deductions that are percentages of salary instead of fixed amounts?

## Key Takeaway
A simple linear scan with aggregation suffices to filter employees based on net salary thresholds.
