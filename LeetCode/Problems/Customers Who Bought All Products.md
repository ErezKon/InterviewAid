# 1045. Customers Who Bought All Products

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/customers-who-bought-all-products](https://leetcode.com/problems/customers-who-bought-all-products)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

SQL: Find customers who bought every product in the Product table.

---

## Approach

```sql
SELECT customer_id FROM Customer
GROUP BY customer_id
HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);
```

---

## Key Takeaway

> **"Bought all" = HAVING COUNT(DISTINCT key) = total count. Subquery gets the total, HAVING filters groups matching it.**
