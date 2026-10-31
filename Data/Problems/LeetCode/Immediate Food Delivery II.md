# 1174. Immediate Food Delivery II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/immediate-food-delivery-ii](https://leetcode.com/problems/immediate-food-delivery-ii)
**Companies:** Amazon, Bloomberg, Doordash, Google, Meta, Microsoft, Starbucks, Swiggy

---

## Problem Description

Table: `Delivery`

```
+-----------------------------+---------+
| Column Name                 | Type    |
+-----------------------------+---------+
| delivery_id                 | int     |
| customer_id                 | int     |
| order_date                  | date    |
| customer_pref_delivery_date | date    |
+-----------------------------+---------+
delivery_id is the column of unique values of this table.
The table holds information about food delivery to customers that make orders at some date and specify a preferred delivery date (on the same order date or after it).
```

If the customer's preferred delivery date is the same as the order date, then the order is called **immediate;** otherwise, it is called **scheduled**.

The **first order** of a customer is the order with the earliest order date that the customer made. It is guaranteed that a customer has precisely one first order.

Write a solution to find the percentage of immediate orders in the first orders of all customers, **rounded to 2 decimal places**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Delivery table:
+-------------+-------------+------------+-----------------------------+
| delivery_id | customer_id | order_date | customer_pref_delivery_date |
+-------------+-------------+------------+-----------------------------+
| 1           | 1           | 2019-08-01 | 2019-08-02                  |
| 2           | 2           | 2019-08-02 | 2019-08-02                  |
| 3           | 1           | 2019-08-11 | 2019-08-12                  |
| 4           | 3           | 2019-08-24 | 2019-08-24                  |
| 5           | 3           | 2019-08-21 | 2019-08-22                  |
| 6           | 2           | 2019-08-11 | 2019-08-13                  |
| 7           | 4           | 2019-08-09 | 2019-08-09                  |
+-------------+-------------+------------+-----------------------------+
Output:
+----------------------+
| immediate_percentage |
+----------------------+
| 50.00                |
+----------------------+
Explanation:
The customer id 1 has a first order with delivery id 1 and it is scheduled.
The customer id 2 has a first order with delivery id 2 and it is immediate.
The customer id 3 has a first order with delivery id 5 and it is scheduled.
The customer id 4 has a first order with delivery id 7 and it is immediate.
Hence, half the customers have immediate first orders.
```

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

## Follow-Up Questions

1. How would you compute the immediate-first-order percentage for each customer individually?
2. How to handle ties when a customer has multiple orders on the same earliest date?
3. Extend the query to consider only orders within a specific date range.

## Key Takeaway

> Filter to each customer's first order using a subquery, then apply conditional aggregation to compute the immediate-delivery percentage.
