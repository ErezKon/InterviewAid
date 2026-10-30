# 2329. Product Sales Analysis V

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/product-sales-analysis-v](https://leetcode.com/problems/product-sales-analysis-v)
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
| user_id     | int   |
| quantity    | int   |
+-------------+-------+
sale_id contains unique values.
product_id is a foreign key (column with unique values) to `Product` table.
Each row of this table shows the ID of the product and the quantity purchased by a user.
```

Table: `Product`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| product_id  | int  |
| price       | int  |
+-------------+------+
product_id contains unique values.
Each row of this table indicates the price of each product.
```

Write a solution to report the spending of each user.

Return the resulting table ordered by `spending` in **descending order**. In case of a tie, order them by `user_id` in ascending order.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Sales table:
+---------+------------+---------+----------+
| sale_id | product_id | user_id | quantity |
+---------+------------+---------+----------+
| 1       | 1          | 101     | 10       |
| 2       | 2          | 101     | 1        |
| 3       | 3          | 102     | 3        |
| 4       | 3          | 102     | 2        |
| 5       | 2          | 103     | 3        |
+---------+------------+---------+----------+
Product table:
+------------+-------+
| product_id | price |
+------------+-------+
| 1          | 10    |
| 2          | 25    |
| 3          | 15    |
+------------+-------+
Output:
+---------+----------+
| user_id | spending |
+---------+----------+
| 101     | 125      |
| 102     | 75       |
| 103     | 75       |
+---------+----------+
Explanation:
User 101 spent 10 * 10 + 1 * 25 = 125.
User 102 spent 3 * 15 + 2 * 15 = 75.
User 103 spent 3 * 25 = 75.
Users 102 and 103 spent the same amount and we break the tie by their ID while user 101 is on the top.
```

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
