# 1667. Fix Names in a Table

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/fix-names-in-a-table](https://leetcode.com/problems/fix-names-in-a-table)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given a table `Users(user_id INT, name VARCHAR)`, each `name` may have arbitrary capitalization. Return the table with each name normalized so that the first character is uppercase and the remaining characters are lowercase, ordered by `user_id`.

## Examples
**Example 1:**
```
Input: Users = [[1, "aLice"], [2, "BOB"], [3, "cHaRlie"]]
Output: [[1, "Alice"], [2, "Bob"], [3, "Charlie"]]
```
**Example 2:**
```
Input: Users = [[5, "john"], [3, "DOE"]]
Output: [[3, "Doe"], [5, "John"]]
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
