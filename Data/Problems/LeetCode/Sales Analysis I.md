# 1082. Sales Analysis I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sales-analysis-i](https://leetcode.com/problems/sales-analysis-i)
**Companies:** Amazon

---

## Problem Description

Table: `Product`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| product_id   | int     |
| product_name | varchar |
| unit_price   | int     |
+--------------+---------+
product_id is the primary key (column with unique values) of this table.
Each row of this table indicates the name and the price of each product.
```

Table: `Sales`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| seller_id   | int     |
| product_id  | int     |
| buyer_id    | int     |
| sale_date   | date    |
| quantity    | int     |
| price       | int     |
+-------------+---------+
This table can have repeated rows.
product_id is a foreign key (reference column) to the Product table.
Each row of this table contains some information about one sale.
```

Write a solution that reports the best **seller** by total sales price. If there is a tie, report them all.

Return the result table in **any order**.

---

## Approach

```text
FUNCTION topSellers():
    // Compute total sales per seller
    SELECT seller_id, SUM(price) AS total
    FROM Sales
    GROUP BY seller_id
    // Find maximum total
    maxTotal ← SELECT MAX(total) FROM (previous query)
    // Return sellers with total == maxTotal
    SELECT seller_id FROM (previous query) WHERE total = maxTotal
```

---

## Examples

```
Example 1:
  Input:
  Product table:
  +------------+--------------+------------+
  | product_id | product_name | unit_price |
  +------------+--------------+------------+
  | 1          | S8           | 1000       |
  | 2          | G4           | 800        |
  | 3          | iPhone       | 1400       |
  +------------+--------------+------------+
  Sales table:
  +-----------+------------+----------+------------+----------+-------+
  | seller_id | product_id | buyer_id | sale_date  | quantity | price |
  +-----------+------------+----------+------------+----------+-------+
  | 1         | 1          | 1        | 2019-01-21 | 2        | 2000  |
  | 1         | 2          | 2        | 2019-02-17 | 1        | 800   |
  | 2         | 2          | 3        | 2019-06-02 | 1        | 800   |
  | 3         | 3          | 4        | 2019-05-13 | 2        | 2800  |
  +-----------+------------+----------+------------+----------+-------+
  Output:
  +-------------+
  | seller_id   |
  +-------------+
  | 1           |
  | 3           |
  +-------------+
  Explanation: Both sellers with id 1 and 3 sold products with the most total price of 2800.
```

---

## Walkthrough

For the first example:

1. Group by `seller_id` → totals: `1 → 250`, `2 → 200`.
2. Maximum total = `250`.
3. Return seller(s) with total `250` → `seller_id = 1`.

---

## Complexity Analysis

- **Time:** O(N) – single pass over the `Sales` rows to aggregate.
- **Space:** O(K) – storage for aggregates of K distinct sellers.

---

## Follow‑Up Questions

1. How would you modify the query to return the top K sellers instead of just the maximum?
2. How can you handle ties when ranking sellers using window functions?

---

## Key Takeaway

Aggregating with `GROUP BY` and comparing to the maximum total lets you efficiently identify the top‑selling seller(s), handling ties naturally.
