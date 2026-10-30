# 569. Median Employee Salary

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/median-employee-salary](https://leetcode.com/problems/median-employee-salary)
**Companies:** Amazon, Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Table: `Employee`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| id           | int     |
| company      | varchar |
| salary       | int     |
+--------------+---------+
id is the primary key (column with unique values) for this table.
Each row of this table indicates the company and the salary of one employee.
```

Write a solution to find the rows that contain the median salary of each company. While calculating the median, when you sort the salaries of the company, break the ties by `id`.

Return the result table in **any order**.

The result format is in the following example.

**Follow up:** Could you solve it without using any built-in or window functions?

---

## Examples

```
Example 1:
  Input:
  Employee table:
  +----+---------+--------+
  | id | company | salary |
  +----+---------+--------+
  | 1  | A       | 2341   |
  | 2  | A       | 341    |
  | 3  | A       | 15     |
  | 4  | A       | 15314  |
  | 5  | A       | 451    |
  | 6  | A       | 513    |
  | 7  | B       | 15     |
  | 8  | B       | 13     |
  | 9  | B       | 1154   |
  | 10 | B       | 1345   |
  | 11 | B       | 1221   |
  | 12 | B       | 234    |
  | 13 | C       | 2345   |
  | 14 | C       | 2645   |
  | 15 | C       | 2645   |
  | 16 | C       | 2652   |
  | 17 | C       | 65     |
  +----+---------+--------+
  Output:
  +----+---------+--------+
  | id | company | salary |
  +----+---------+--------+
  | 5  | A       | 451    |
  | 6  | A       | 513    |
  | 12 | B       | 234    |
  | 9  | B       | 1154   |
  | 14 | C       | 2645   |
  +----+---------+--------+
  Explanation:
  For company A, the rows sorted are as follows:
  +----+---------+--------+
  | id | company | salary |
  +----+---------+--------+
  | 3  | A       | 15     |
  | 2  | A       | 341    |
  | 5  | A       | 451    | <-- median
  | 6  | A       | 513    | <-- median
  | 1  | A       | 2341   |
  | 4  | A       | 15314  |
  +----+---------+--------+
  For company B, the rows sorted are as follows:
  +----+---------+--------+
  | id | company | salary |
  +----+---------+--------+
  | 8  | B       | 13     |
  | 7  | B       | 15     |
  | 12 | B       | 234    | <-- median
  | 11 | B       | 1221   | <-- median
  | 9  | B       | 1154   |
  | 10 | B       | 1345   |
  +----+---------+--------+
  For company C, the rows sorted are as follows:
  +----+---------+--------+
  | id | company | salary |
  +----+---------+--------+
  | 17 | C       | 65     |
  | 13 | C       | 2345   |
  | 14 | C       | 2645   | <-- median
  | 15 | C       | 2645   |
  | 16 | C       | 2652   |
  +----+---------+--------+
```

---

## Key Insight

> Use **window functions** to rank salaries within each company. The median is the row(s) where the rank equals the middle position: `FLOOR((COUNT+1)/2)` and `CEIL((COUNT+1)/2)`.

---

## Approach

```sql
SELECT id, company, salary
FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY company ORDER BY salary) AS rn,
           COUNT(*) OVER (PARTITION BY company) AS cnt
    FROM Employee
) t
WHERE rn IN (FLOOR((cnt + 1) / 2.0), CEIL((cnt + 1) / 2.0))
```

**How it works:**
1. `ROW_NUMBER()` ranks salaries within each company
2. `COUNT(*)` gives total employees per company
3. Filter to middle rank(s): for odd count, `FLOOR = CEIL = middle`; for even count, both middle rows are selected

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Window function | **O(n log n)** per group | **O(n)** |

---

## Key Takeaway

> **Window functions + FLOOR/CEIL of middle rank** elegantly find the median in SQL without self-joins or subqueries.

---
