# 586. Customer Placing the Largest Number of Orders

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/customer-placing-the-largest-number-of-orders](https://leetcode.com/problems/customer-placing-the-largest-number-of-orders)
**Companies:** Amazon, Google, Microsoft, Twitter

---

## Problem Description

SQL: Find the customer who placed the most orders.

---

## Approach

```sql
SELECT customer_number FROM Orders
GROUP BY customer_number
ORDER BY COUNT(*) DESC
LIMIT 1;
```

---

## Key Takeaway

> **GROUP BY + ORDER BY COUNT(*) DESC + LIMIT 1 finds the top group by frequency.**
