# 1069. Product Sales Analysis II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/product-sales-analysis-ii](https://leetcode.com/problems/product-sales-analysis-ii)
**Companies:** Amazon

---

## Problem Description
Given two tables `Product(product_id, product_name)` and `Sales(product_id, year, price)`, return the `product_id`, `year`, and total sales amount (`SUM(price)`) for each product-year pair where the total sales amount is **strictly greater than 100**. The result should be ordered by `product_id` ascending and then `year` ascending.

## Examples
**Example 1:**
```
Product table:
+------------+--------------+
| product_id | product_name |
+------------+--------------+
| 1          | 'Laptop'     |
| 2          | 'Phone'      |
+------------+--------------+

Sales table:
+------------+------+-------+
| product_id | year | price |
+------------+------+-------+
| 1          | 2020 | 60    |
| 1          | 2020 | 50    |
| 2          | 2021 | 30    |
| 2          | 2021 | 80    |
+------------+------+-------+

Result:
+------------+------+-----------+
| product_id | year | total_sum |
+------------+------+-----------+
| 1          | 2020 | 110       |
| 2          | 2021 | 110       |
+------------+------+-----------+
```
*Explanation:* For product 1 in 2020 the sum is 110 (>100); similarly for product 2 in 2021.

## Approach
Use a `GROUP BY` on `product_id` and `year` to compute the sum of `price`. Then filter with `HAVING SUM(price) > 100` and order the result.

```text
SELECT product_id, year, SUM(price) AS total_sum
FROM Sales
GROUP BY product_id, year
HAVING total_sum > 100
ORDER BY product_id ASC, year ASC;
```

## Walkthrough
| Step | Action | Result |
|------|--------|--------|
| 1    | Group rows by `product_id` and `year` | Intermediate groups with summed prices |
| 2    | Apply `HAVING` filter >100 | Keep only groups meeting the threshold |
| 3    | Order by `product_id`, `year` | Final ordered result set |

## Complexity Analysis
- **Time:** The database performs a grouping and aggregation, typically `O(m)` where `m` is the number of rows in `Sales`.
- **Space:** Additional space for grouping, proportional to distinct `(product_id, year)` pairs.

## Follow-Up Questions
1. How would you modify the query to include products with no sales (left join with `Product`)?
2. What if the threshold (100) should be a parameter supplied at runtime?
3. How can you compute the average price per product per year instead of the sum?

## Key Takeaway
Aggregating sales with `GROUP BY` and filtering via `HAVING` efficiently extracts product‑year pairs that exceed a sales threshold.
