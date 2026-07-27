# 1327. List the Products Ordered in a Period

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/list-the-products-ordered-in-a-period](https://leetcode.com/problems/list-the-products-ordered-in-a-period)
**Companies:** Amazon, Microsoft

---

## 1. Problem Description

(SQL) List products with ≥ 100 units ordered in February 2020.

---

## 2. Approach: JOIN + GROUP BY + HAVING

```sql
SELECT p.product_name, SUM(o.unit) AS unit
FROM Products p
JOIN Orders o ON p.product_id = o.product_id
WHERE o.order_date BETWEEN '2020-02-01' AND '2020-02-29'
GROUP BY p.product_id
HAVING SUM(o.unit) >= 100;
```

---

## 3. Key Takeaway

> Filter by date, join with products, group and aggregate, then filter with HAVING.
