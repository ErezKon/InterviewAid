# 1159. Market Analysis II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/market-analysis-ii](https://leetcode.com/problems/market-analysis-ii)
**Companies:** Poshmark

---

## 1. Problem Description (SQL)

For each user, check if the brand of their 2nd item sold matches their favorite brand.

---

## 2. Approach: SQL — ROW_NUMBER + Join ✅

```sql
SELECT u.user_id AS seller_id,
    CASE WHEN i.item_brand = u.favorite_brand THEN 'yes' ELSE 'no' END AS 2nd_item_fav_brand
FROM Users u
LEFT JOIN (
    SELECT seller_id, item_id,
        ROW_NUMBER() OVER (PARTITION BY seller_id ORDER BY order_date) AS rn
    FROM Orders
) o ON u.user_id = o.seller_id AND o.rn = 2
LEFT JOIN Items i ON o.item_id = i.item_id;
```

---

## 3. Key Takeaway

> Use ROW_NUMBER to find the 2nd sold item per seller, then join with Items to compare brands.
