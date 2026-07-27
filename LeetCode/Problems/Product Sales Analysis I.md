# 1068. Product Sales Analysis I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/product-sales-analysis-i](https://leetcode.com/problems/product-sales-analysis-i)
**Companies:** Amazon, Bloomberg, Cognizant, Google, Meta, Microsoft, Tcs

---

```sql
SELECT p.product_name, s.year, s.price
FROM Sales s
JOIN Product p ON s.product_id = p.product_id;
```
