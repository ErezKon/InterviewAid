# 1070. Product Sales Analysis III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/product-sales-analysis-iii](https://leetcode.com/problems/product-sales-analysis-iii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```sql
SELECT s.product_id, s.year AS first_year, s.quantity, s.price
FROM Sales s
JOIN (
    SELECT product_id, MIN(year) AS first_year
    FROM Sales
    GROUP BY product_id
) t ON s.product_id = t.product_id AND s.year = t.first_year;
```
