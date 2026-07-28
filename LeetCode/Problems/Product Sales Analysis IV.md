# 2324. Product Sales Analysis IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/product-sales-analysis-iv](https://leetcode.com/problems/product-sales-analysis-iv)
**Companies:** Amazon

---

## Problem Description
Given a `Sales` table with columns `product_id`, `year`, `quantity`, and `price`, return the `product_id`s of products whose total sales (quantity × price) increased for **three consecutive years**. The result should be ordered by `product_id`.

## Examples
| product_id | year | quantity | price |
|------------|------|----------|-------|
| 1 | 2018 | 5 | 100 |
| 1 | 2019 | 6 | 110 |
| 1 | 2020 | 7 | 120 |
| 2 | 2018 | 3 | 200 |
| 2 | 2019 | 2 | 210 |
| 2 | 2020 | 4 | 220 |

**Output**
| product_id |
|------------|
| 1 |

## Approach
1. Compute yearly revenue per product: `revenue = quantity * price`.
2. Use a window function to compare each year’s revenue with the previous two years for the same product.
3. Keep products where `revenue > LAG(revenue,1) AND revenue > LAG(revenue,2)` holds for three consecutive rows.
4. Return distinct `product_id`s ordered ascending.

## Walkthrough
1. Aggregate `quantity * price` per `product_id` and `year`.
2. Apply `LAG(revenue, 1) OVER (PARTITION BY product_id ORDER BY year)` and `LAG(revenue, 2) …` to get prior revenues.
3. Filter rows where current revenue is greater than both prior revenues.
4. Group by `product_id` and keep those with at least three qualifying rows.
5. Sort the final list.

## Complexity Analysis
- Time: O(N log N) for sorting/grouping N rows.
- Space: O(N) to store intermediate aggregates and window values.

## Follow‑Up Questions
- How to modify the query for a variable length of increasing streaks?
- Find the longest increasing revenue streak per product.
- Extend to handle missing years (non‑consecutive calendar years).

## Key Takeaway
Window functions like `LAG` let you compare a row with its predecessors, enabling detection of consecutive increasing trends.
