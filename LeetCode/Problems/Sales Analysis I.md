# 1082. Sales Analysis I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sales-analysis-i](https://leetcode.com/problems/sales-analysis-i)
**Companies:** Amazon

---

## Problem Description

Report sellers who sold the most total price of products. If tied, report all of them.

---

## Approach

```sql
SELECT seller_id
FROM Sales
GROUP BY seller_id
HAVING SUM(price) = (
    SELECT SUM(price) FROM Sales GROUP BY seller_id ORDER BY SUM(price) DESC LIMIT 1
);
```

---

## Key Takeaway

> For "top group(s) with ties" use `HAVING aggregate = (SELECT MAX of aggregate)` or rank with a window function.
