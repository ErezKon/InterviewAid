# 1321. Restaurant Growth

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/restaurant-growth](https://leetcode.com/problems/restaurant-growth)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Point72, Revolut

---

## Problem Description

Given a `Customer` table with `customer_id`, `name`, `visited_on`, `amount`, compute the **7‑day moving window** (current day + previous 6 days) for total `amount` and average `amount` (rounded to 2 decimals). Only return rows where the window has a full 7 days of data. Order by `visited_on`.

---

## Examples

| visited_on | amount |
|------------|--------|
| 2023‑01‑01 | 100 |
| 2023‑01‑02 | 150 |
| ... | ... |
| 2023‑01‑07 | 200 |

*Explanation:* For `2023‑01‑07`, the window includes dates `2023‑01‑01` to `2023‑01‑07`. The sum is the total of those amounts, and the average is the sum divided by 7, rounded to two decimals.

---

## Approach

```text
FUNCTION computeRolling(customer):
    // Use a correlated subquery to sum amounts over the 7‑day window
    RETURN SELECT visited_on,
           SUM(amount) OVER (PARTITION BY visited_on ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount,
           ROUND(AVG(amount) OVER (PARTITION BY visited_on ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_amount
    FROM Customer
    WHERE visited_on >= (SELECT MIN(visited_on) + INTERVAL 6 DAY FROM Customer)
    ORDER BY visited_on;
```

---

## Walkthrough

1. For each distinct `visited_on`, consider the 6 previous days plus the current day.
2. The `SUM(...) OVER (...)` window function aggregates `amount` over this range.
3. The `AVG(...) OVER (...)` computes the average, which we round to two decimals.
4. Filter out dates where fewer than 7 days are available by ensuring `visited_on` is at least the minimum date plus 6 days.
5. Return the results ordered by `visited_on`.

---

## Complexity Analysis

- **Time:** O(n) – each row is processed once by the window functions.
- **Space:** O(n) – storing the result set.

---

## Follow-Up Questions

- How would you adapt the query for a variable window size `k`?
- How can you compute the rolling median instead of the average?
- How would you handle missing dates in the `Customer` table?

---

## Key Takeaway

> Rolling window aggregates in SQL are efficiently expressed with `ROWS BETWEEN` window functions, avoiding costly correlated subqueries.
