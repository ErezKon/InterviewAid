# 1321. Restaurant Growth

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/restaurant-growth](https://leetcode.com/problems/restaurant-growth)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Point72, Revolut

---

## Problem Description

Given a `Customer` table with `customer_id`, `name`, `visited_on`, `amount`, compute the **7-day moving window** (current day + previous 6 days) for total `amount` and average `amount` (rounded to 2 decimals). Only return rows where the window has a full 7 days of data. Order by `visited_on`.

---

## Key Insight

> Use a correlated subquery with `BETWEEN DATE_SUB(date, INTERVAL 6 DAY) AND date` to compute the 7-day rolling sum. Only start output from the 7th distinct date onward.

---

## Approach

```sql
SELECT visited_on,
    (SELECT SUM(amount) FROM Customer c2
     WHERE c2.visited_on BETWEEN DATE_SUB(c1.visited_on, INTERVAL 6 DAY) AND c1.visited_on
    ) AS amount,
    ROUND(
        (SELECT SUM(amount) FROM Customer c2
         WHERE c2.visited_on BETWEEN DATE_SUB(c1.visited_on, INTERVAL 6 DAY) AND c1.visited_on
        ) / 7, 2
    ) AS average_amount
FROM (SELECT DISTINCT visited_on FROM Customer) c1
WHERE visited_on >= (SELECT DATE_ADD(MIN(visited_on), INTERVAL 6 DAY) FROM Customer)
ORDER BY visited_on;
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n·d) — correlated subquery scans rows for each distinct date d |
| Space  | O(d) — distinct dates |

---

## Key Takeaway

> Rolling window aggregates in SQL use `BETWEEN DATE_SUB(date, INTERVAL k DAY) AND date` in a correlated subquery or `ROWS BETWEEN` in a window function — filter out incomplete windows with a `WHERE` on the minimum date offset.
