# 627. Swap Sex of Employees

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/swap-salary](https://leetcode.com/problems/swap-salary)
**Companies:** Amazon, Bloomberg, Meta, Microsoft

---

## Problem Description
Given a table `Salary` with columns `id`, `salary`, and `sex` (where `sex` is either `'m'` or `'f'`), write a SQL statement to swap the gender of every employee: change `'m'` to `'f'` and `'f'` to `'m'` for all rows.

## Examples
**Example:**
```
Salary table before:
+----+--------+-----+
| id | salary | sex |
+----+--------+-----+
| 1  | 5000   | m   |
| 2  | 6000   | f   |
| 3  | 5500   | m   |
+----+--------+-----+
```
After executing the update, the table becomes:
```
+----+--------+-----+
| id | salary | sex |
+----+--------+-----+
| 1  | 5000   | f   |
| 2  | 6000   | m   |
| 3  | 5500   | f   |
+----+--------+-----+
```
```
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
