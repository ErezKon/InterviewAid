# 1596. The Most Frequently Ordered Products for Each Customer

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-most-frequently-ordered-products-for-each-customer](https://leetcode.com/problems/the-most-frequently-ordered-products-for-each-customer)
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
No customer will order the same product more than once in a single day.
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
This table contains information about the products.
```

Write a solution to find the most frequently ordered product(s) for each customer.

The result table should have the `product_id` and `product_name` for each `customer_id` who ordered at least one order.

Return the result table in **any order**.

The result format is in the following example.

## Examples
```
Example 1:
  Input:
  Customers table:
  +-------------+-------+
  | customer_id | name  |
  +-------------+-------+
  | 1           | Alice |
  | 2           | Bob   |
  | 3           | Tom   |
  | 4           | Jerry |
  | 5           | John  |
  +-------------+-------+
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
  | 7        | 2020-08-01 | 3           | 3          |
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
  +-------------+------------+--------------+
  | customer_id | product_id | product_name |
  +-------------+------------+--------------+
  | 1           | 2          | mouse        |
  | 2           | 1          | keyboard     |
  | 2           | 2          | mouse        |
  | 2           | 3          | screen       |
  | 3           | 3          | screen       |
  | 4           | 1          | keyboard     |
  +-------------+------------+--------------+
  Explanation:
  Alice (customer 1) ordered the mouse three times and the keyboard one time, so the mouse is the most
  frequently ordered product for them.
  Bob (customer 2) ordered the keyboard, the mouse, and the screen one time, so those are the most
  frequently ordered products for them.
  Tom (customer 3) only ordered the screen (two times), so that is the most frequently ordered product for them.
  Jerry (customer 4) only ordered the keyboard (one time), so that is the most frequently ordered product for them.
  John (customer 5) did not order anything, so we do not include them in the result table.
```

## Approach
Use SQL aggregation: group by `customer_id` and `product_id` to count orders, then for each customer select the product with the maximum count using a window function or a self-join.

```text
SELECT customer_id, product_id
FROM (
    SELECT customer_id,
           product_id,
           COUNT(*) AS cnt,
           ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY COUNT(*) DESC) AS rn
    FROM Orders
    GROUP BY customer_id, product_id
) AS sub
WHERE rn = 1;
```
The inner query computes frequencies and ranks them per customer; the outer query keeps the top rank.

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Group rows by `customer_id` and `product_id`, count occurrences. |
| 2 | For each `customer_id`, order groups by count descending and assign row numbers. |
| 3 | Keep rows where row number = 1 (most frequent product). |
| 4 | Return `customer_id` and `product_id` columns. |

## Complexity Analysis
- **Time:** The grouping and window function run in O(N log N) where N is number of orders, due to sorting for ranking.
- **Space:** O(N) to store intermediate aggregates.

## Follow-Up Questions
1. How would you modify the query to return the top k most frequent products per customer?
2. How can you handle ties by returning all products that share the maximum frequency?
3. If the dataset is huge, what indexing strategies improve performance?

## Key Takeaway
Aggregate orders per customer and use a window function to rank product frequencies, then select the top-ranked product for each customer.
