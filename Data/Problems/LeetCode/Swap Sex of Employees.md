# 627. Swap Sex of Employees

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/swap-sex-of-employees](https://leetcode.com/problems/swap-sex-of-employees)
**Companies:** Amazon, Bloomberg, Meta, Microsoft

---

## Problem Description

Table: `Salary`

```
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| id          | int      |
| name        | varchar  |
| sex         | ENUM     |
| salary      | int      |
+-------------+----------+
id is the primary key (column with unique values) for this table.
The sex column is ENUM (category) value of type ('m', 'f').
The table contains information about an employee.
```

Write a solution to swap all `'f'` and `'m'` values (i.e., change all `'f'` values to `'m'` and vice versa) with a **single update statement** and no intermediate temporary tables.

Note that you must write a single update statement, **do not** write any select statement for this problem.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Salary table:
+----+------+-----+--------+
| id | name | sex | salary |
+----+------+-----+--------+
| 1  | A    | m   | 2500   |
| 2  | B    | f   | 1500   |
| 3  | C    | m   | 5500   |
| 4  | D    | f   | 500    |
+----+------+-----+--------+
Output:
+----+------+-----+--------+
| id | name | sex | salary |
+----+------+-----+--------+
| 1  | A    | f   | 2500   |
| 2  | B    | m   | 1500   |
| 3  | C    | f   | 5500   |
| 4  | D    | m   | 500    |
+----+------+-----+--------+
Explanation:
(1, A) and (3, C) were changed from 'm' to 'f'.
(2, B) and (4, D) were changed from 'f' to 'm'.
```

## Approach
Use a single `UPDATE` statement with a `CASE` expression that maps `'m'` to `'f'` and `'f'` to `'m'`. This updates all rows in place without needing a temporary table.

```text
FUNCTION swapSex():
    EXECUTE SQL:
        UPDATE Salary
        SET sex = CASE WHEN sex = 'm' THEN 'f' ELSE 'm' END;
```

## Walkthrough
1. The `CASE` expression evaluates the current value of `sex` for each row.
2. If the value is `'m'`, it returns `'f'`; otherwise it returns `'m'`.
3. The `UPDATE` writes the new value back to the `sex` column for every row.

## Complexity Analysis
- **Time:** O(n) – the database scans each row once.
- **Space:** O(1) – no additional storage beyond the table itself.

## Follow‑Up Questions
1. How would you perform the swap if the table also contained other gender values (e.g., `'non-binary'`)?
2. Can you write the query to return the rows that were changed?
3. How would you ensure the operation is atomic in a concurrent environment?

## Key Takeaway
A `CASE` expression inside an `UPDATE` statement provides a concise, set‑based way to toggle column values across an entire table.
