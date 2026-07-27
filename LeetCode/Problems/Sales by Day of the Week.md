# 1479. Sales by Day of the Week

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sales-by-day-of-the-week](https://leetcode.com/problems/sales-by-day-of-the-week)
**Companies:** Amazon

---

## Problem Description

Given `Orders` and `Items` tables, report the quantity of each item category sold for each day of the week (Mon-Sun) as columns.

---

## Approach

```sql
SELECT i.item_category AS Category,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 2 THEN o.quantity ELSE 0 END) AS Monday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 3 THEN o.quantity ELSE 0 END) AS Tuesday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 4 THEN o.quantity ELSE 0 END) AS Wednesday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 5 THEN o.quantity ELSE 0 END) AS Thursday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 6 THEN o.quantity ELSE 0 END) AS Friday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 7 THEN o.quantity ELSE 0 END) AS Saturday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 1 THEN o.quantity ELSE 0 END) AS Sunday
FROM Items i LEFT JOIN Orders o ON i.item_id = o.item_id
GROUP BY i.item_category
ORDER BY i.item_category;
```

---

## Key Takeaway

> Manual pivot with `SUM(CASE WHEN day = X THEN value ELSE 0 END)` for each column — the standard SQL technique when `PIVOT` isn't available.
