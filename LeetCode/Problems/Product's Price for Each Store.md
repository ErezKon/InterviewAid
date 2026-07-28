# 1777. Product's Price for Each Store

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/products-price-for-each-store](https://leetcode.com/problems/products-price-for-each-store)
**Companies:** Amazon, Mcafee

---

## Problem Description
You are given two tables:
- `Products(product_id, price)` – each product’s base price.
- `Stores(store_id, product_id, discount)` – a discount percentage (0–100) that a store applies to a product.
For every combination of `store_id` and `product_id` that appears in `Stores`, return the final price after applying the discount to the product’s base price. The final price should be rounded down to the nearest integer.

## Examples
**Example**
Assume the tables contain:
| product_id | price |
|------------|-------|
| 1 | 100 |
| 2 | 200 |
| 3 | 150 |
| store_id | product_id | discount |
|----------|------------|----------|
| 10 | 1 | 10 |
| 10 | 2 | 20 |
| 20 | 2 | 5 |
| 20 | 3 | 0 |
The query should return:
| store_id | product_id | final_price |
|----------|------------|-------------|
| 10 | 1 | 90 |
| 10 | 2 | 160 |
| 20 | 2 | 190 |
| 20 | 3 | 150 |
Final price = `price * (100 - discount) / 100`, rounded down.

## Approach
Join the two tables on `product_id` and compute the discounted price. Use integer arithmetic to automatically floor the result.

### Pseudocode (SQL‑style)
```text
SELECT s.store_id,
       s.product_id,
       FLOOR(p.price * (100 - s.discount) / 100) AS final_price
FROM Stores s
JOIN Products p ON s.product_id = p.product_id;
```
The `FLOOR` function (or integer division) ensures the price is rounded down.

## Walkthrough
For store 10, product 1:
- Base price = 100, discount = 10 → `100 * 90 / 100 = 90`.
For store 20, product 2:
- Base price = 200, discount = 5 → `200 * 95 / 100 = 190` (integer division drops the fraction).
Each row follows the same calculation.

## Complexity Analysis
- **Time:** `O(N log N)` for the join operation, where `N` is the total number of rows in both tables (indexing can reduce to `O(N)`).
- **Space:** `O(N)` for the result set.

## Follow‑Up Questions
1. How would you modify the query to include products that have no discount entry (i.e., default discount 0)?
2. What index strategy would optimise the join for large tables?
3. How can you adapt the solution to handle multiple discount tiers per store (e.g., based on quantity)?

## Key Takeaway
A simple join between `Stores` and `Products` combined with integer arithmetic yields the final discounted price for each store‑product pair.
