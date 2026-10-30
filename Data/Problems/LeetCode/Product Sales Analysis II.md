# 1069. Product Sales Analysis II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/product-sales-analysis-ii](https://leetcode.com/problems/product-sales-analysis-ii)
**Companies:** Amazon

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

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
product_id is a foreign key (reference column) to `Product` table.
Each row of this table shows a sale on the product product_id in a certain year.
Note that the price is per unit.
```

Table: `Product`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| product_id   | int     |
| product_name | varchar |
+--------------+---------+
product_id is the primary key (column with unique values) of this table.
Each row of this table indicates the product name of each product.
```

Write a solution that reports the total quantity sold for every product id.

Return the resulting table in **any order**.

The result format is in the following example.

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
Product table:
+------------+--------------+
| product_id | product_name |
+------------+--------------+
| 100        | Nokia        |
| 200        | Apple        |
| 300        | Samsung      |
+------------+--------------+
Output:
+--------------+----------------+
| product_id   | total_quantity |
+--------------+----------------+
| 100          | 22             |
| 200          | 15             |
+--------------+----------------+
```

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
