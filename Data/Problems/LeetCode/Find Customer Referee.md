# 584. Find Customer Referee

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-customer-referee](https://leetcode.com/problems/find-customer-referee)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meesho, Meta, Microsoft, Tcs

---

## Problem Description

Given a `Customer` table with columns `id`, `name`, and `referee_id`, return the names of all customers who are **not** referred by the customer with `id = 2`. Rows where `referee_id` is `NULL` (i.e., the customer has no referee) should also be included.

---

## Examples

**Example 1:**
```
Customer Table:
+----+----------+------------+
| id | name     | referee_id |
+----+----------+------------+
| 1  | Alice    | 2          |
| 2  | Bob      | NULL       |
| 3  | Charlie  | 3          |
| 4  | Diana    | 2          |
| 5  | Ethan    | NULL       |
+----+----------+------------+
```
Result: `['Bob', 'Charlie', 'Ethan']`
Explanation: Alice and Diana are referred by id 2, so they are excluded. Bob and Ethan have `NULL` referee, Charlie is referred by id 3.

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