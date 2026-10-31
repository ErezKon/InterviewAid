# 1070. Product Sales Analysis III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/product-sales-analysis-iii](https://leetcode.com/problems/product-sales-analysis-iii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Table: `Sales`

```
+-------------+-------+
| Column Name | Type  |
+-------------+-------+
| sale_id     | int   |
| product_id  | int   |
| year        | int   |
| quantity    | int   |
| price       | int   |
+-------------+-------+
(sale_id, year) is the primary key (combination of columns with unique values) of this table.
Each row records a sale of a product in a given year.
A product may have multiple sales entries in the same year.
Note that the per-unit price.
```

Write a solution to find all sales that occurred in the **first year** each product was sold.

  For each product_id`, identify the earliest year` it appears in the Sales` table.

  Return **all** sales entries for that product in that year.

Return a table with the following columns: **product_id**,** first_year**, **quantity, **and** price**.**
Return the result in any order.

## Examples

**Example 1:**
```
Input:
Sales table:
+---------+------------+------+----------+-------+
| sale_id | product_id | year | quantity | price |
+---------+------------+------+----------+-------+
| 1       | 100        | 2008 | 10       | 5000  |
| 2       | 100        | 2009 | 12       | 5000  |
| 7       | 200        | 2011 | 15       | 9000  |
+---------+------------+------+----------+-------+
Output:
+------------+------------+----------+-------+
| product_id | first_year | quantity | price |
+------------+------------+----------+-------+
| 100        | 2008       | 10       | 5000  |
| 200        | 2011       | 15       | 9000  |
+------------+------------+----------+-------+
```

## Approach
Use a sub-query to compute the minimum year for each `product_id`, then join back to the original table to fetch the corresponding `quantity` and `price`.

## Walkthrough
1. Sub-query groups rows by `product_id` and selects `MIN(year)` as `first_year`.
2. Join the original `Sales` table on both `product_id` and `year = first_year`.
3. Project the required columns.

## Complexity Analysis
- Time: O(N) where N is the number of rows, due to a single scan for grouping and a join on indexed columns.
- Space: O(P) for storing the minimum year per product, where P is the number of distinct products.

## Follow-Up Questions
- How to handle ties if multiple rows share the same earliest year?
- Extend to retrieve the cumulative sales for the first three years of each product.
- Adapt the query for databases without window functions.

## Key Takeaway
Finding the first occurrence per group can be achieved by computing the minimum value per group and joining back to the original table.
