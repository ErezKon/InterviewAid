# 1777. Product's Price for Each Store

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/products-price-for-each-store](https://leetcode.com/problems/products-price-for-each-store)
**Companies:** Amazon, Mcafee

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Products`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_id  | int     |
| store       | enum    |
| price       | int     |
+-------------+---------+
In SQL, (product_id, store) is the primary key for this table.
store is a category of type ('store1', 'store2', 'store3') where each represents the store this product is available at.
price is the price of the product at this store.
```

Find the price of each product in each store.

Return the result table in **any order**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Products table:
+-------------+--------+-------+
| product_id  | store  | price |
+-------------+--------+-------+
| 0           | store1 | 95    |
| 0           | store3 | 105   |
| 0           | store2 | 100   |
| 1           | store1 | 70    |
| 1           | store3 | 80    |
+-------------+--------+-------+
Output:
+-------------+--------+--------+--------+
| product_id  | store1 | store2 | store3 |
+-------------+--------+--------+--------+
| 0           | 95     | 100    | 105    |
| 1           | 70     | null   | 80     |
+-------------+--------+--------+--------+
Explanation:
Product 0 price's are 95 for store1, 100 for store2 and, 105 for store3.
Product 1 price's are 70 for store1, 80 for store3 and, it's not sold in store2.
```

## Approach
Join the two tables on `product_id` and compute the discounted price. Use integer arithmetic to automatically floor the result.

### Pseudocode (SQL-style)
```text
SELECT s.store_id,
       s.product_id,
       FLOOR(p.price * (100 - s.discount) / 100) AS final_price
FROM Stores s
JOIN Products p ON s.product_id = p.product_id;
```
The `FLOOR` function (or integer division) ensures the price is rounded down.

## Walkthrough
For store 10, product 1:
- Base price = 100, discount = 10 → `100 * 90 / 100 = 90`.
For store 20, product 2:
- Base price = 200, discount = 5 → `200 * 95 / 100 = 190` (integer division drops the fraction).
Each row follows the same calculation.

## Complexity Analysis
- **Time:** `O(N log N)` for the join operation, where `N` is the total number of rows in both tables (indexing can reduce to `O(N)`).
- **Space:** `O(N)` for the result set.

## Follow-Up Questions
1. How would you modify the query to include products that have no discount entry (i.e., default discount 0)?
2. What index strategy would optimise the join for large tables?
3. How can you adapt the solution to handle multiple discount tiers per store (e.g., based on quantity)?

## Key Takeaway
A simple join between `Stores` and `Products` combined with integer arithmetic yields the final discounted price for each store-product pair.
