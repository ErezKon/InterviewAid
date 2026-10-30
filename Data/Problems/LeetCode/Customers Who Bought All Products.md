# 1045. Customers Who Bought All Products

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/customers-who-bought-all-products](https://leetcode.com/problems/customers-who-bought-all-products)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

Table: `Customer`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| customer_id | int     |
| product_key | int     |
+-------------+---------+
This table may contain duplicates rows.
`customer_id` is not NULL`.`
product_key is a foreign key (reference column) to `Product` table.
```

Table: `Product`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_key | int     |
+-------------+---------+
product_key is the primary key (column with unique values) for this table.
```

Write a solution to report the customer ids from the `Customer` table that bought all the products in the `Product` table.

Return the result table in **any order**.

The result format is in the following example.

---

## Examples

**Example 1:**
```
Input:
Customer table:
+-------------+-------------+
| customer_id | product_key |
+-------------+-------------+
| 1           | 5           |
| 2           | 6           |
| 3           | 5           |
| 3           | 6           |
| 1           | 6           |
+-------------+-------------+
Product table:
+-------------+
| product_key |
+-------------+
| 5           |
| 6           |
+-------------+
Output:
+-------------+
| customer_id |
+-------------+
| 1           |
| 3           |
+-------------+
Explanation:
The customers who bought all the products (5 and 6) are customers with IDs 1 and 3.
```

---

## Approach

```sql
SELECT customer_id FROM Customer
GROUP BY customer_id
HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);
```

---

## Walkthrough

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Group orders by `customer_id`. | Collect all purchases per customer. |
| 2 | Count distinct `product_key` per group. | Determines how many different products each customer bought. |
| 3 | Compare count to total number of products. | The subquery `(SELECT COUNT(*) FROM Product)` returns the total distinct products. |
| 4 | Keep groups where counts match. | Those customers bought every product. |

---

## Complexity Analysis

- **Time:** O(N) where N is the number of rows in the `Customer` (or `Orders`) table, because we scan each row once and use aggregation.
- **Space:** O(K) for storing the intermediate grouping, where K is the number of distinct customers.

---

## Follow-Up Questions

- How would you modify the query to find customers who bought *at least* 80% of the products?
- How can you handle large tables efficiently using indexes?

---

## Key Takeaway

> **"Bought all" = HAVING COUNT(DISTINCT key) = total count. Subquery gets the total, HAVING filters groups matching it.**