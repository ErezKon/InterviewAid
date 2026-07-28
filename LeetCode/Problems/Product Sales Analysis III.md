# 1070. Product Sales Analysis III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/product-sales-analysis-iii](https://leetcode.com/problems/product-sales-analysis-iii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given a `Sales` table with columns `product_id`, `year`, `quantity`, and `price`, return each product's first year of sale along with the quantity and price for that year. The result should include `product_id`, `first_year`, `quantity`, and `price`.

## Examples
| product_id | year | quantity | price |
|------------|------|----------|-------|
| 1 | 2019 | 10 | 100 |
| 1 | 2020 | 5 | 110 |
| 2 | 2018 | 7 | 200 |

**Output**
| product_id | first_year | quantity | price |
|------------|------------|----------|-------|
| 1 | 2019 | 10 | 100 |
| 2 | 2018 | 7 | 200 |

## Approach
Use a sub‑query to compute the minimum year for each `product_id`, then join back to the original table to fetch the corresponding `quantity` and `price`.

## Walkthrough
1. Sub‑query groups rows by `product_id` and selects `MIN(year)` as `first_year`.
2. Join the original `Sales` table on both `product_id` and `year = first_year`.
3. Project the required columns.

## Complexity Analysis
- Time: O(N) where N is the number of rows, due to a single scan for grouping and a join on indexed columns.
- Space: O(P) for storing the minimum year per product, where P is the number of distinct products.

## Follow‑Up Questions
- How to handle ties if multiple rows share the same earliest year?
- Extend to retrieve the cumulative sales for the first three years of each product.
- Adapt the query for databases without window functions.

## Key Takeaway
Finding the first occurrence per group can be achieved by computing the minimum value per group and joining back to the original table.
