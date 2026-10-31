# 196. Delete Duplicate Emails

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/delete-duplicate-emails](https://leetcode.com/problems/delete-duplicate-emails)
**Companies:** Amazon, Bloomberg, Dell, Google, Infosys, Maq Software, Meta, Microsoft, Tcs

---

## Problem Description

Table: `Person`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| email       | varchar |
+-------------+---------+
id is the primary key (column with unique values) for this table.
Each row of this table contains an email. The emails will not contain uppercase letters.
```

Write a solution to **delete** all duplicate emails, keeping only one unique email with the smallest `id`.

For SQL users, please note that you are supposed to write a `DELETE` statement and not a `SELECT` one.

For Pandas users, please note that you are supposed to modify `Person` in place.

After running your script, the answer shown is the `Person` table. The driver will first compile and run your piece of code and then show the `Person` table. The final order of the `Person` table **does not matter**.

The result format is in the following example.

---

## Examples

```
Example 1:
  Input:
  Person table:
  +----+------------------+
  | id | email            |
  +----+------------------+
  | 1  | john@example.com |
  | 2  | bob@example.com  |
  | 3  | john@example.com |
  +----+------------------+
  Output:
  +----+------------------+
  | id | email            |
  +----+------------------+
  | 1  | john@example.com |
  | 2  | bob@example.com  |
  +----+------------------+
  Explanation: john@example.com is repeated two times. We keep the row with the smallest Id = 1.
```

---

## Approach

```sql
DELETE p1 FROM Person p1
JOIN Person p2 ON p1.email = p2.email
WHERE p1.id > p2.id;
```

---

## Walkthrough

1. **Self-join** the `Person` table on `email` so that each pair of rows sharing the same email is paired (`p1` and `p2`).
2. The `WHERE p1.id > p2.id` clause keeps the row with the smaller `id` (`p2`) and marks the larger-id duplicate (`p1`) for deletion.
3. Executing the `DELETE` removes all `p1` rows that have a matching `p2` with a smaller `id`.

Result: only the earliest entry for each email remains.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – single self-join scan of the table |
| **Space** | O(1) – no extra data structures beyond query execution |

---

## Follow-Up Questions

1. How would you modify the query to keep the row with the **largest** `id` instead?
2. Can you achieve the same result using a `ROW_NUMBER()` window function?
3. How would you handle duplicate emails when the table has additional columns that need to be preserved?

---

## Key Takeaway

> **Self-join to find duplicates: join on the duplicate column, then DELETE rows with the larger id. Classic SQL deduplication pattern.**