# 1158. Market Analysis I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/market-analysis-i](https://leetcode.com/problems/market-analysis-i)
**Companies:** Amazon, Bloomberg, Google, Poshmark

---

## 1. Problem Description (SQL)

For each user, find their join date and count of orders placed in 2019.

---

## 2. Approach: SQL — LEFT JOIN + GROUP BY ✅

```sql
SELECT u.user_id AS buyer_id, u.join_date,
    COUNT(o.order_id) AS orders_in_2019
FROM Users u
LEFT JOIN Orders o ON u.user_id = o.buyer_id AND YEAR(o.order_date) = 2019
GROUP BY u.user_id, u.join_date;
```

---

## 3. Key Takeaway

> LEFT JOIN to include users with zero orders. Filter year in the JOIN condition (not WHERE) to preserve all users.
