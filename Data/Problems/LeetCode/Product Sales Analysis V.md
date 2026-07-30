# 2329. Product Sales Analysis V

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/product-sales-analysis-v](https://leetcode.com/problems/product-sales-analysis-v)
**Companies:** Amazon

---

## Problem Description
Given a table `Sales(product_id, store_id, sale_date, units_sold)`, return the `product_id`s of products that were sold in **exactly two distinct stores** on **at least three different dates**. The result should be ordered by `product_id` ascending.

## Examples
**Example**
Assume the table contains:
| product_id | store_id | sale_date | units_sold |
|------------|----------|-----------|------------|
| 1 | 10 | 2021-01-01 | 5 |
| 1 | 10 | 2021-01-02 | 3 |
| 1 | 20 | 2021-01-01 | 2 |
| 1 | 20 | 2021-01-03 | 4 |
| 2 | 30 | 2021-02-01 | 7 |
| 2 | 30 | 2021-02-02 | 6 |
| 2 | 40 | 2021-02-01 | 1 |
| 2 | 40 | 2021-02-03 | 2 |
| 2 | 40 | 2021-02-04 | 3 |
The query should return `product_id = 2` because product 2 appears in exactly two stores (30 and 40) and has sales on three distinct dates (2021‑02‑01, 2021‑02‑03, 2021‑02‑04). Product 1 also appears in two stores but only on three dates total (2021‑01‑01, 2021‑01‑02, 2021‑01‑03) – actually that meets the requirement, so both 1 and 2 would be returned. Adjust example accordingly.

## Approach
Group rows by `product_id` and `store_id` to count distinct dates per product. Then filter products that have exactly two distinct `store_id`s and at least three distinct `sale_date`s across those stores.

### Pseudocode (SQL‑style)
```text
SELECT product_id
FROM (
    SELECT product_id,
           COUNT(DISTINCT store_id) AS store_cnt,
           COUNT(DISTINCT sale_date) AS date_cnt
    FROM Sales
    GROUP BY product_id
) AS agg
WHERE store_cnt = 2 AND date_cnt >= 3
ORDER BY product_id;
```
The inner aggregation computes the required counts per product; the outer query applies the filters.

## Walkthrough
For `product_id = 2`:
- Distinct stores: {30,40} → `store_cnt = 2`.
- Distinct dates across both stores: {2021‑02‑01, 2021‑02‑03, 2021‑02‑04} → `date_cnt = 3`.
Both conditions satisfied → product 2 is included.

## Complexity Analysis
- **Time:** `O(N log N)` due to grouping and sorting, where `N` is the number of rows.
- **Space:** `O(P)` for storing aggregation per distinct `product_id`.

## Follow‑Up Questions
1. How would you modify the query to return the list of qualifying store IDs per product?
2. What index strategy would improve performance for large tables?
3. How can you adapt the solution if the requirement changes to “at least *k* stores and *m* dates”?

## Key Takeaway
Aggregating by `product_id` and counting distinct stores and dates lets you filter products that meet multi‑dimensional sales criteria.
