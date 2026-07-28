# 1164. Product Price at a Given Date

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/product-price-at-a-given-date](https://leetcode.com/problems/product-price-at-a-given-date)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
You are given a table `Products(product_id, new_price, change_date)` where each row records a price change for a product on a specific date. For every distinct `product_id`, determine the price of the product on **2019‑08‑16**. If a product has no price change on or before that date, its price defaults to `10`.

## Examples
**Example**
Assume the table contains:
| product_id | new_price | change_date |
|------------|-----------|-------------|
| 1 | 20 | 2019‑08‑10 |
| 1 | 30 | 2019‑08‑20 |
| 2 | 15 | 2019‑08‑15 |
| 3 | 40 | 2019‑08‑17 |
The query should return:
| product_id | price |
|------------|-------|
| 1 | 20 |
| 2 | 15 |
| 3 | 10 |
Product 1’s latest price before the target date is 20, product 2’s is 15, and product 3 has no prior price change, so it defaults to 10.

## Approach
The task is a classic “latest‑record‑as‑of‑date” problem. For each `product_id` we need the most recent `new_price` where `change_date` ≤ target date. This can be solved with a correlated subquery or window function. The provided solution uses a correlated subquery that orders rows by `change_date` descending and picks the first matching row. `COALESCE` supplies the default price when no row exists.

### Pseudocode (SQL‑style)
```text
SELECT DISTINCT product_id,
    COALESCE(
        (SELECT new_price
         FROM Products p2
         WHERE p2.product_id = p1.product_id
           AND p2.change_date <= '2019-08-16'
         ORDER BY p2.change_date DESC
         LIMIT 1),
        10) AS price
FROM Products p1;
```
The outer query ensures every `product_id` appears once, while the inner query fetches the latest applicable price.

## Walkthrough
For `product_id = 1`:
- Inner query finds rows with dates ≤ 2019‑08‑16 → only the row dated 2019‑08‑10 (price 20).
- Ordering descending returns 20, which becomes the result.
For `product_id = 3`:
- No rows satisfy the date condition, so the inner query returns NULL.
- `COALESCE` substitutes the default value `10`.

## Complexity Analysis
- **Time:** `O(N log N)` in the worst case due to the correlated subquery sorting per product (or `O(N)` with proper indexing and window functions).
- **Space:** `O(N)` for the intermediate result set.

## Follow‑Up Questions
1. How would you rewrite the query using `ROW_NUMBER()` window function for better performance?
2. How can you adapt the solution if the target date is a parameter supplied at query time?
3. What changes are needed if multiple price changes can occur on the same day and you must pick the highest price?

## Key Takeaway
Use a correlated subquery (or window function) to fetch the most recent price change on or before a given date, falling back to a default when no prior change exists.
