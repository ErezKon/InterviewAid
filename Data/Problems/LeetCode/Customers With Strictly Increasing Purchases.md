# 2474. Customers With Strictly Increasing Purchases

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/customers-with-strictly-increasing-purchases](https://leetcode.com/problems/customers-with-strictly-increasing-purchases)
**Companies:** Amazon

---

## Problem Description

SQL: Find customers whose total yearly purchases are strictly increasing every consecutive year (no gaps in years).

---

## Examples

**Example 1:**
```
Orders table:
+----+------------+-------+
| id | order_date | price |
+----+------------+-------+
| 1  | 2020-01-10 | 100   |
| 2  | 2020-06-15 | 150   |
| 3  | 2021-03-20 | 300   |
| 4  | 2021-11-05 | 350   |
| 5  | 2022-02-14 | 500   |
+----+------------+-------+
```
**Output:** `[customer_id]` of customers whose yearly totals increase each year without gaps.

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

## Walkthrough

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Compute yearly totals per customer | `yearly` CTE aggregates `price` by `customer_id` and year. |
| 2 | Compare each year with previous | `ranked` uses `LAG` to fetch previous year's total and year. |
| 3 | Filter customers | `HAVING` ensures no year where total is not greater than previous **or** years are not consecutive. |

---

## Complexity Analysis

- **Time:** O(N log N) – aggregation and window functions scan the `Orders` table once; sorting by `customer_id` and `yr` is implicit in the window operation.
- **Space:** O(N) – stores intermediate yearly aggregates.

---

## Follow-Up Questions

- How would you modify the query to handle missing years by treating missing totals as zero?
- Can you extend the solution to return the longest streak of increasing purchases for each customer?

---

## Key Takeaway

> **Strictly increasing over consecutive years: use LAG() to compare each year's total with the previous, and verify no year gaps. HAVING ensures all comparisons pass.**