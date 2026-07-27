# 183. Customers Who Never Order

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/customers-who-never-order](https://leetcode.com/problems/customers-who-never-order)
**Companies:** Amazon, Bloomberg, Deloitte, Google, Meta, Microsoft

---

## Problem Description

SQL: Find customers who have never placed an order.

---

## Approach

```sql
SELECT name AS Customers
FROM Customers
WHERE id NOT IN (SELECT customerId FROM Orders);
```

---

## Key Takeaway

> **Anti-join pattern: `NOT IN (subquery)` or `LEFT JOIN ... WHERE ... IS NULL` finds rows in one table with no match in another.**
