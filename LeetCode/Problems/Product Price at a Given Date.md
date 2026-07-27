# 1164. Product Price at a Given Date

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/product-price-at-a-given-date](https://leetcode.com/problems/product-price-at-a-given-date)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```sql
SELECT DISTINCT product_id,
    COALESCE(
        (SELECT new_price FROM Products p2
         WHERE p2.product_id = p1.product_id AND p2.change_date <= '2019-08-16'
         ORDER BY change_date DESC LIMIT 1),
        10
    ) AS price
FROM Products p1;
```
