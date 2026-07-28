# 1174. Immediate Food Delivery II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/immediate-food-delivery-ii](https://leetcode.com/problems/immediate-food-delivery-ii)
**Companies:** Amazon, Bloomberg, Doordash, Google, Meta, Microsoft, Starbucks, Swiggy

---

## Problem Description

Find the percentage of first orders that are immediate, i.e., the delivery date equals the order date, for each customer. This is an SQL query problem.

## Examples

**Example 1:**
```
Delivery Table:
+----+------------+--------------------------+------------+
| id | customer_id| order_date               | customer_pref_delivery_date |
+----+------------+--------------------------+------------+
| 1  | 101        | 2021-01-01               | 2021-01-01 |
| 2  | 101        | 2021-01-05               | 2021-01-06 |
| 3  | 102        | 2021-02-01               | 2021-02-01 |
+----+------------+--------------------------+------------+
```
Output: `50.00`
Explanation: For customer 101, the first order (2021-01-01) is immediate. For customer 102, the first order is also immediate. Two immediate first orders out of four total first orders → (2/4)*100 = 50.00.

**Example 2:**
```
Delivery Table:
+----+------------+------------+--------------------------+
| id | customer_id| order_date | customer_pref_delivery_date |
+----+------------+------------+--------------------------+
| 1  | 200        | 2022-03-10 | 2022-03-11 |
| 2  | 200        | 2022-04-01 | 2022-04-01 |
+----+------------+------------+--------------------------+
```
Output: `0.00`
Explanation: Only the first order for customer 200 (2022-03-10) is not immediate, so 0% immediate first orders.

## Approach

Subquery for First Orders ✅

```text
FUNCTION immediateFirstOrderPercentage():
    // SQL query using subquery to select first order per customer
    SELECT ROUND(
        100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END)
        / COUNT(*), 2
    ) AS immediate_percentage
    FROM Delivery
    WHERE (customer_id, order_date) IN (
        SELECT customer_id, MIN(order_date)
        FROM Delivery
        GROUP BY customer_id
    );
```

## Walkthrough

1. **Identify First Orders** – Subquery groups rows by `customer_id` and picks the earliest `order_date`.
2. **Filter Table** – The outer query keeps only those rows that match the `(customer_id, order_date)` pairs from the subquery.
3. **Conditional Count** – `SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END)` counts immediate first orders.
4. **Compute Percentage** – Divide by total first orders, multiply by 100, and round.

## Complexity Analysis

- **Time:** O(N) – the query scans the `Delivery` table a constant number of times.
- **Space:** O(N) for the subquery result set (one row per customer), otherwise O(1) additional.

## Follow‑Up Questions

1. How would you compute the immediate‑first‑order percentage for each customer individually?
2. How to handle ties when a customer has multiple orders on the same earliest date?
3. Extend the query to consider only orders within a specific date range.

## Key Takeaway

> Filter to each customer's first order using a subquery, then apply conditional aggregation to compute the immediate‑delivery percentage.
