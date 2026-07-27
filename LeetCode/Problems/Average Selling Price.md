# 1251. Average Selling Price

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/average-selling-price](https://leetcode.com/problems/average-selling-price)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Paypal

---

## Problem Description
Given two tables `Prices(product_id, price, start_date, end_date)` and `UnitsSold(product_id, units, purchase_date)`, compute the average selling price for each product. The average price is the weighted average of the price over the units sold during the price’s validity period. Return `0` for products with no sales.

## Examples
- **Input:**
  ```sql
  Prices: [(1, 10, '2020-01-01', '2020-01-31'), (2, 20, '2020-01-01', '2020-01-31')]
  UnitsSold: [(1, 5, '2020-01-15'), (2, 0, '2020-01-20')]
  ```
  **Output:** `product_id 1 -> 10.00`, `product_id 2 -> 0.00`
  *Explanation:* Product 1 sold 5 units at $10 each, average = $10. Product 2 sold none, average = 0.
- **Input:** (multiple price intervals) – the query correctly joins on overlapping dates and computes the weighted average.

## Approach
Join `Prices` and `UnitsSold` on matching `product_id` where the purchase date falls within the price’s active interval. Multiply price by units, sum these products and total units per product, then divide. Use `IFNULL` to handle division by zero.

```text
SELECT p.product_id,
    IFNULL(ROUND(SUM(p.price * u.units) / SUM(u.units), 2), 0) AS average_price
FROM Prices p
LEFT JOIN UnitsSold u
    ON p.product_id = u.product_id
    AND u.purchase_date BETWEEN p.start_date AND p.end_date
GROUP BY p.product_id;
```

## Walkthrough
| Step | Join Condition | price*units | units | cumulative sum | average |
|------|----------------|------------|------|----------------|---------|
| 1    | product 1, date 2020‑01‑15 in range | 10*5 = 50 | 5 | SUM(price*units)=50, SUM(units)=5 | 50/5 = 10 |
| 2    | product 2, no matching units | – | 0 | SUM=0, SUM(units)=0 | 0 |

## Complexity Analysis
- **Time:** O(p + u) for scanning both tables; the join is performed by the database engine.
- **Space:** O(p + u) for intermediate join results.

## Follow‑Up Questions
1. How would you handle overlapping price intervals for the same product?
2. Extend the query to compute the average price per month.
3. What indexes would improve the performance of this query?

## Key Takeaway
A weighted average selling price can be derived by joining price intervals with sales records, summing `price * units`, and dividing by total units, handling zero‑sale cases with `IFNULL`.
