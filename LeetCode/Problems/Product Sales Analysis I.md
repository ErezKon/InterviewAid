# 1068. Product Sales Analysis I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/product-sales-analysis-i](https://leetcode.com/problems/product-sales-analysis-i)
**Companies:** Amazon, Bloomberg, Cognizant, Google, Meta, Microsoft, Tcs

---

## Problem Description
Given two tables `Product(product_id, product_name)` and `Sales(product_id, year, price)`, return the product name, year, and price for every sale. The result should include all rows from `Sales` joined with the corresponding product name.

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
| 1          | 2020 | 1000 |
| 2          | 2021 | 500 |
+------------+------+-------+

Result:
+--------------+------+-------+
| product_name | year | price |
+--------------+------+-------+
| 'Laptop'     | 2020 | 1000 |
| 'Phone'      | 2021 | 500 |
+--------------+------+-------+
```
*Explanation:* Each sale row is paired with its product name via an inner join.

## Approach
The task is a straightforward inner join between `Product` and `Sales` on `product_id`. Use a SQL `SELECT` statement that joins the tables and selects the required columns.

```text
SELECT p.product_name, s.year, s.price
FROM Sales AS s
JOIN Product AS p ON s.product_id = p.product_id;
```

## Walkthrough
| Step | Action | Result |
|------|--------|--------|
| 1    | Join `Sales` with `Product` on `product_id` | Temporary table with columns `product_name, year, price` |
| 2    | Project the three columns | Final result set as shown in the example |

## Complexity Analysis
- **Time:** The database performs a join, typically `O(m + n)` where `m` and `n` are the row counts of the two tables.
- **Space:** Result set size is proportional to the number of matching rows.

## Follow-Up Questions
1. How would you modify the query to include products with no sales (i.e., a left join)?
2. How can you compute the total sales amount per product per year?
3. How would you filter results for sales within a specific price range?

## Key Takeaway
An inner join on the foreign key `product_id` efficiently combines product information with its sales records, producing the desired output with a single SQL statement.
