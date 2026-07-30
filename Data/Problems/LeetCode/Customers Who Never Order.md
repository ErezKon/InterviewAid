# 183. Customers Who Never Order

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/customers-who-never-order](https://leetcode.com/problems/customers-who-never-order)
**Companies:** Amazon, Bloomberg, Deloitte, Google, Meta, Microsoft

---

## Problem Description

SQL: Find customers who have never placed an order.

---

## Examples

**Example 1:**
```
Customers Table:
+----+----------+
| id | name     |
+----+----------+
| 1  | Alice    |
| 2  | Bob      |
| 3  | Carol    |
+----+----------+

Orders Table:
+----+------------+
| id | customerId |
+----+------------+
| 1  | 1          |
| 2  | 2          |
+----+------------+
```
**Output:**
```
+----+----------+
| id | name     |
+----+----------+
| 3  | Carol    |
+----+----------+
```
*Carol never placed an order.*

---

## Approach

```sql
SELECT name AS Customers
FROM Customers
WHERE id NOT IN (SELECT customerId FROM Orders);
```

---

## Walkthrough

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Select all customers. | Retrieves every row from `Customers`. |
| 2 | Exclude those with orders. | Subquery `SELECT customerId FROM Orders` returns IDs that have placed orders. `NOT IN` filters them out. |
| 3 | Return remaining rows. | The result set contains customers with no matching order record. |

---

## Complexity Analysis

- **Time:** O(N + M) where N is number of customers and M is number of orders, due to scanning both tables.
- **Space:** O(K) for the set of order customer IDs, where K is distinct customers in `Orders`.

---

## Follow-Up Questions

- How would you rewrite the query using a `LEFT JOIN` and `IS NULL` check?
- How can you handle cases where the `Orders` table is extremely large (e.g., using indexes or partitioning)?

---

## Key Takeaway

> **Anti-join pattern: `NOT IN (subquery)` or `LEFT JOIN ... WHERE ... IS NULL` finds rows in one table with no match in another.**