# 1549. The Most Recent Orders for Each Product

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-most-recent-orders-for-each-product](https://leetcode.com/problems/the-most-recent-orders-for-each-product)
**Companies:** Amazon

---

## Problem Description
Table: `Customers`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| customer_id   | int     |
| name          | varchar |
+---------------+---------+
customer_id is the column with unique values for this table.
This table contains information about the customers.
```

Table: `Orders`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| order_date    | date    |
| customer_id   | int     |
| product_id    | int     |
+---------------+---------+
order_id is the column with unique values for this table.
This table contains information about the orders made by customer_id.
There will be no product ordered by the same user more than once in one day.
```

Table: `Products`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| product_id    | int     |
| product_name  | varchar |
| price         | int     |
+---------------+---------+
product_id is the column with unique values for this table.
This table contains information about the Products.
```

Write a solution to find the most recent order(s) of each product.

Return the result table ordered by `product_name` in ascending order and in case of a tie by the `product_id` in **ascending order**. If there still a tie, order them by `order_id` in **ascending order**.

The result format is in the following example.

## Examples
```
Example 1:
  Input:
  Customers table:
  +-------------+-----------+
  | customer_id | name      |
  +-------------+-----------+
  | 1           | Winston   |
  | 2           | Jonathan  |
  | 3           | Annabelle |
  | 4           | Marwan    |
  | 5           | Khaled    |
  +-------------+-----------+
  Orders table:
  +----------+------------+-------------+------------+
  | order_id | order_date | customer_id | product_id |
  +----------+------------+-------------+------------+
  | 1        | 2020-07-31 | 1           | 1          |
  | 2        | 2020-07-30 | 2           | 2          |
  | 3        | 2020-08-29 | 3           | 3          |
  | 4        | 2020-07-29 | 4           | 1          |
  | 5        | 2020-06-10 | 1           | 2          |
  | 6        | 2020-08-01 | 2           | 1          |
  | 7        | 2020-08-01 | 3           | 1          |
  | 8        | 2020-08-03 | 1           | 2          |
  | 9        | 2020-08-07 | 2           | 3          |
  | 10       | 2020-07-15 | 1           | 2          |
  +----------+------------+-------------+------------+
  Products table:
  +------------+--------------+-------+
  | product_id | product_name | price |
  +------------+--------------+-------+
  | 1          | keyboard     | 120   |
  | 2          | mouse        | 80    |
  | 3          | screen       | 600   |
  | 4          | hard disk    | 450   |
  +------------+--------------+-------+
  Output:
  +--------------+------------+----------+------------+
  | product_name | product_id | order_id | order_date |
  +--------------+------------+----------+------------+
  | keyboard     | 1          | 6        | 2020-08-01 |
  | keyboard     | 1          | 7        | 2020-08-01 |
  | mouse        | 2          | 8        | 2020-08-03 |
  | screen       | 3          | 3        | 2020-08-29 |
  +--------------+------------+----------+------------+
  Explanation:
  keyboard's most recent order is in 2020-08-01, it was ordered two times this day.
  mouse's most recent order is in 2020-08-03, it was ordered only once this day.
  screen's most recent order is in 2020-08-29, it was ordered only once this day.
  The hard disk was never ordered and we do not include it in the result table.
```

## Approach
Use a SQL window function to rank orders per product by `order_date` descending, then keep the top-ranked row.

```text
SELECT order_id, product_id, order_date
FROM (
    SELECT order_id,
           product_id,
           order_date,
           ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY order_date DESC) AS rn
    FROM Orders
) AS sub
WHERE rn = 1;
```
The inner query assigns a row number per product based on recency; the outer query filters to the most recent order.

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Partition rows by `product_id`. |
| 2 | Within each partition, order rows by `order_date` descending. |
| 3 | Assign `ROW_NUMBER` starting at 1. |
| 4 | Keep rows where `rn = 1`. |
| 5 | Return the selected columns. |

## Complexity Analysis
- **Time:** O(N log N) due to sorting within each partition, where N is the number of orders.
- **Space:** O(N) for intermediate grouping and ranking.

## Follow-Up Questions
1. How would you modify the query to return the top k most recent orders per product?
2. How can you handle ties by returning all orders that share the latest date for a product?
3. If the table is extremely large, what indexes would improve query performance?

## Key Takeaway
Rank orders per product by date using a window function and select the row with rank 1 to obtain the most recent order for each product.
