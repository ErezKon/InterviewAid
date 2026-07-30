# 1173. Immediate Food Delivery I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/immediate-food-delivery-i](https://leetcode.com/problems/immediate-food-delivery-i)
**Companies:** Doordash

---

## Problem Description

Find the percentage of orders where the delivery date equals the order date (immediate delivery). This is an SQL query problem.

## Examples

**Example 1:**
```
Delivery Table:
+----+------------+--------------------------+
| id | order_date | customer_pref_delivery_date |
+----+------------+--------------------------+
| 1  | 2021-01-01 | 2021-01-01 |
| 2  | 2021-01-02 | 2021-01-03 |
| 3  | 2021-01-04 | 2021-01-04 |
+----+------------+--------------------------+
```
Output: `66.67`
Explanation: Two out of three orders are immediate, so (2/3)*100 = 66.67.

**Example 2:**
```
Delivery Table:
+----+------------+--------------------------+
| id | order_date | customer_pref_delivery_date |
+----+------------+--------------------------+
| 1  | 2022-05-10 | 2022-05-11 |
| 2  | 2022-05-12 | 2022-05-13 |
+----+------------+--------------------------+
```
Output: `0.00`
Explanation: No immediate deliveries.

## Approach

Conditional Aggregation ✅

```text
FUNCTION immediateDeliveryPercentage():
    // Use SQL aggregation to compute ratio
    SELECT ROUND(
        100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END)
        / COUNT(*), 2
    ) AS immediate_percentage
    FROM Delivery;
```

## Walkthrough

1. **Count Immediate Orders** – `SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END)` adds 1 for each row where dates match.
2. **Count Total Orders** – `COUNT(*)` gives total rows.
3. **Compute Percentage** – Multiply by 100.0 and round to two decimals.
4. Return the computed value.

## Complexity Analysis

- **Time:** O(N) – the query scans the `Delivery` table once.
- **Space:** O(1) – only constant‑size aggregates are stored.

## Follow‑Up Questions

1. How would you compute the percentage for each customer separately?
2. How to handle cases where `order_date` or `customer_pref_delivery_date` can be NULL?
3. Extend the query to include a filter for a specific date range.

## Key Takeaway

> Use conditional aggregation to count rows meeting a condition and divide by total rows to obtain a percentage.
