# 607. Sales Person

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sales-person](https://leetcode.com/problems/sales-person)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

Report salespeople who have **no orders** with the company named "RED".

---

## Approach

```sql
SELECT name FROM SalesPerson
WHERE sales_id NOT IN (
    SELECT o.sales_id FROM Orders o
    JOIN Company c ON o.com_id = c.com_id
    WHERE c.name = 'RED'
);
```

---

## Key Takeaway

> `NOT IN (subquery)` is the clean pattern for "exclude entities related to a specific condition." Alternative: `NOT EXISTS` or `LEFT JOIN ... IS NULL`.
