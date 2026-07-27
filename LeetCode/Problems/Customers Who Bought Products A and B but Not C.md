# 1398. Customers Who Bought Products A and B but Not C

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/customers-who-bought-products-a-and-b-but-not-c](https://leetcode.com/problems/customers-who-bought-products-a-and-b-but-not-c)
**Companies:** Meta

---

## Problem Description

SQL: Find customers who bought both product A and product B but did not buy product C.

---

## Approach

```sql
SELECT DISTINCT c.customer_id, c.customer_name
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
WHERE c.customer_id IN (SELECT customer_id FROM Orders WHERE product_name = 'A')
  AND c.customer_id IN (SELECT customer_id FROM Orders WHERE product_name = 'B')
  AND c.customer_id NOT IN (SELECT customer_id FROM Orders WHERE product_name = 'C');
```

---

## Key Takeaway

> **Set membership filtering: use IN/NOT IN subqueries (or HAVING with conditional aggregation) to enforce "bought X AND Y but NOT Z" logic.**
