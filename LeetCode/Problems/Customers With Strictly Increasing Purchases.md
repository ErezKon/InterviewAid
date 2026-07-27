# 2474. Customers With Strictly Increasing Purchases

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/customers-with-strictly-increasing-purchases](https://leetcode.com/problems/customers-with-strictly-increasing-purchases)
**Companies:** Amazon

---

## Problem Description

SQL: Find customers whose total yearly purchases are strictly increasing every consecutive year (no gaps in years).

---

## Approach

```sql
WITH yearly AS (
    SELECT customer_id, YEAR(order_date) AS yr, SUM(price) AS total
    FROM Orders
    GROUP BY customer_id, YEAR(order_date)
),
ranked AS (
    SELECT *, LAG(total) OVER (PARTITION BY customer_id ORDER BY yr) AS prev_total,
              LAG(yr) OVER (PARTITION BY customer_id ORDER BY yr) AS prev_yr
    FROM yearly
)
SELECT DISTINCT customer_id FROM ranked
GROUP BY customer_id
HAVING SUM(CASE WHEN prev_total IS NOT NULL AND (total <= prev_total OR yr != prev_yr + 1)
                THEN 1 ELSE 0 END) = 0;
```

---

## Key Takeaway

> **Strictly increasing over consecutive years: use LAG() to compare each year's total with the previous, and verify no year gaps. HAVING ensures all comparisons pass.**
