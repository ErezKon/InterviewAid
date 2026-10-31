# 1084. Sales Analysis III

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sales-analysis-iii](https://leetcode.com/problems/sales-analysis-iii)
**Companies:** Amazon, Bloomberg, Google

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
This table can have duplicate rows.
product_id is a foreign key (reference column) to the Product table.
Each row of this table contains some information about one sale.
```

Write a solution to report the **products** that were **only** sold in the first quarter of `2019`. That is, between `2019-01-01` and `2019-03-31` inclusive.

Return the result table in **any order**.

---

## Approach

```sql
SELECT p.product_id, p.product_name
FROM Product p JOIN Sales s ON p.product_id = s.product_id
GROUP BY p.product_id, p.product_name
HAVING MIN(s.sale_date) >= '2019-01-01' AND MAX(s.sale_date) <= '2019-03-31';
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
  +-------------+--------------+
  | product_id  | product_name |
  +-------------+--------------+
  | 1           | S8           |
  +-------------+--------------+
  Explanation:
  The product with id 1 was only sold in the spring of 2019.
  The product with id 2 was sold in the spring of 2019 but was also sold after the spring of 2019.
  The product with id 3 was sold after spring 2019.
  We return only product 1 as it is the product that was only sold in the spring of 2019.
```

---

## Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Join Product and Sales | rows with product-sale pairs |
| 2 | Group by product | aggregates per product |
| 3 | Apply HAVING clause to keep only products where MIN(date) ≥ start and MAX(date) ≤ end | filtered set |
| 4 | Return product IDs and names | desired output |

---

## Complexity Analysis

- **Time:** O(N) where N is the number of rows in `Sales` (single pass for aggregation).
- **Space:** O(P) for storing aggregates per product, P ≤ N.

---

## Key Takeaway

> `HAVING MIN(date) >= start AND MAX(date) <= end` ensures **all** sales of a product lie within a period.
