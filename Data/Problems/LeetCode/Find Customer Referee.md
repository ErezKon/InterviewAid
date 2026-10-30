# 584. Find Customer Referee

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-customer-referee](https://leetcode.com/problems/find-customer-referee)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meesho, Meta, Microsoft, Tcs

---

## Problem Description

Table: `Customer`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| referee_id  | int     |
+-------------+---------+
In SQL, id is the primary key column for this table.
Each row of this table indicates the id of a customer, their name, and the id of the customer who referred them.
```

Find the names of the customer that are either:

1. **referred by** any customer with `id != 2`.
2. **not referred by** any customer.

Return the result table in **any order**.

The result format is in the following example.

---

## Examples

```
Example 1:
  Input:
  Customer table:
  +----+------+------------+
  | id | name | referee_id |
  +----+------+------------+
  | 1  | Will | null       |
  | 2  | Jane | null       |
  | 3  | Alex | 2          |
  | 4  | Bill | null       |
  | 5  | Zack | 1          |
  | 6  | Mark | 2          |
  +----+------+------------+
  Output:
  +------+
  | name |
  +------+
  | Will |
  | Jane |
  | Bill |
  | Zack |
  +------+
```

---

## Walkthrough

| Step | Action |
|------|--------|
| 1 | Scan each row of `Customer`.
| 2 | Keep the row if `referee_id` is `NULL` **or** `referee_id <> 2`.
| 3 | Project the `name` column of the kept rows.
| 4 | Return the list of names.

---

## Approach: SQL Filter with NULL Handling ✅

```text
SELECT name
FROM Customer
WHERE referee_id != 2 OR referee_id IS NULL;
```

---

## Complexity Analysis

- **Time:** O(N) – a single table scan where N is the number of customers.
- **Space:** O(1) extra space besides the output list.

---

## Follow‑Up Questions

1. How would you modify the query to exclude customers referred by a set of ids, e.g., `{2, 5, 7}`?
2. How can you write the query using a `LEFT JOIN` instead of direct filtering?
3. If the table is huge, which index would help the filter most?

---

## Key Takeaway

> **Handle `NULL` explicitly when filtering; `referee_id != 2` alone does not include rows with `NULL`.**
