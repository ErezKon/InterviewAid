# 1479. Sales by Day of the Week

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sales-by-day-of-the-week](https://leetcode.com/problems/sales-by-day-of-the-week)
**Companies:** Amazon

---

## Problem Description

Given `Orders` and `Items` tables, report the quantity of each item category sold for each day of the week (Mon‑Sun) as separate columns.

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

## Examples

**Example 1:**
- `Items` has categories "Electronics" and "Books".
- `Orders` contains rows with various `order_date` values.
- Query returns a row for each category with quantities for Monday‑Sunday columns.

---

## Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Join `Items` with `Orders` on `item_id` | rows of category‑order pairs |
| 2 | For each row, compute `DAYOFWEEK(order_date)` and add quantity to the appropriate day column via `SUM(CASE …)` |
| 3 | Group by `item_category` to aggregate quantities per day |
| 4 | Output one row per category with 7 day columns |

---

## Complexity Analysis

- **Time:** O(N) where N is the number of rows in `Orders` (each row processed once in aggregation).
- **Space:** O(C) for storing aggregates per category, C = number of distinct categories.

---

## Key Takeaway

> Use `SUM(CASE WHEN day = X THEN value ELSE 0 END)` to manually pivot rows into columns when a native `PIVOT` operator is unavailable.
