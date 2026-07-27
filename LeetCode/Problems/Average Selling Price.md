# 1251. Average Selling Price

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/average-selling-price](https://leetcode.com/problems/average-selling-price)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Paypal

---

```sql
SELECT p.product_id,
    IFNULL(ROUND(SUM(p.price * u.units) / SUM(u.units), 2), 0) AS average_price
FROM Prices p
LEFT JOIN UnitsSold u ON p.product_id = u.product_id
    AND u.purchase_date BETWEEN p.start_date AND p.end_date
GROUP BY p.product_id;
```
