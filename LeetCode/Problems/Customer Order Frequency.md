# 1511. Customer Order Frequency

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/customer-order-frequency](https://leetcode.com/problems/customer-order-frequency)
**Companies:** Amazon

---

## Problem Description

SQL: Find customers who spent at least $100 in both June and July 2020.

---

## Approach

```sql
SELECT c.customer_id, c.name
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
JOIN Product p ON o.product_id = p.product_id
GROUP BY c.customer_id, c.name
HAVING SUM(CASE WHEN MONTH(o.order_date) = 6 AND YEAR(o.order_date) = 2020
                THEN o.quantity * p.price ELSE 0 END) >= 100
   AND SUM(CASE WHEN MONTH(o.order_date) = 7 AND YEAR(o.order_date) = 2020
                THEN o.quantity * p.price ELSE 0 END) >= 100;
```

---

## Key Takeaway

> **Conditional aggregation with CASE WHEN inside SUM + HAVING to filter groups meeting thresholds in multiple months.**
