# 1667. Fix Names in a Table

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/fix-names-in-a-table](https://leetcode.com/problems/fix-names-in-a-table)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Table: `Users`

```
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| user_id        | int     |
| name           | varchar |
+----------------+---------+
user_id is the primary key (column with unique values) for this table.
This table contains the ID and the name of the user. The name consists of only lowercase and uppercase characters.
```

Write a solution to fix the names so that only the first character is uppercase and the rest are lowercase.

Return the result table ordered by `user_id`.

## Examples
```
Example 1:
  Input:
  Users table:
  +---------+-------+
  | user_id | name  |
  +---------+-------+
  | 1       | aLice |
  | 2       | bOB   |
  +---------+-------+
  Output:
  +---------+-------+
  | user_id | name  |
  +---------+-------+
  | 1       | Alice |
  | 2       | Bob   |
  +---------+-------+
```

## Approach
Use SQL string functions: `UPPER` to capitalize the first character, `LOWER` for the rest, and `CONCAT` to combine them. Order the result by `user_id`.

```text
SELECT user_id,
       CONCAT(UPPER(LEFT(name, 1)), LOWER(SUBSTRING(name, 2))) AS name
FROM Users
ORDER BY user_id;
```
The query directly produces the normalized names without needing procedural code.

## Walkthrough
| Row | Original name | LEFT(name,1) | UPPER | SUBSTRING(name,2) | LOWER | CONCAT → Normalized |
|-----|---------------|--------------|-------|-------------------|-------|--------------------|
| 1   | aLice         | a            | A     | Lice              | lice  | Alice              |
| 2   | BOB           | B            | B     | OB                | ob    | Bob                |
| 3   | cHaRlie       | c            | C     | HaRlie            | harlie| Charlie            |

## Complexity Analysis
- **Time:** `O(n)` where `n` is the number of rows, as each row is processed once.
- **Space:** `O(1)` additional space; the database handles result storage.

## Follow‑Up Questions
1. How would you handle names with leading/trailing spaces?
2. Extend the query to also capitalize middle names or surnames.
3. What indexes would improve performance for large tables?

## Key Takeaway
SQL string functions let you transform and normalize textual data directly within a query, avoiding post‑processing in application code.
