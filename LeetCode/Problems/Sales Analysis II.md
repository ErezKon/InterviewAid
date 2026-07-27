# 1083. Sales Analysis II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sales-analysis-ii](https://leetcode.com/problems/sales-analysis-ii)
**Companies:** Amazon

---

## Problem Description

Report buyers who bought S8 but not iPhone. Uses `Product` and `Sales` tables.

---

## Approach

```sql
SELECT DISTINCT s.buyer_id
FROM Sales s JOIN Product p ON s.product_id = p.product_id
WHERE p.product_name = 'S8'
  AND s.buyer_id NOT IN (
      SELECT s2.buyer_id FROM Sales s2 JOIN Product p2 ON s2.product_id = p2.product_id
      WHERE p2.product_name = 'iPhone'
  );
```

---

## Key Takeaway

> "Bought X but not Y" → select buyers of X then exclude those who also bought Y via `NOT IN` subquery or `LEFT JOIN ... IS NULL`.
