# 1045. Customers Who Bought All Products

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/customers-who-bought-all-products](https://leetcode.com/problems/customers-who-bought-all-products)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

SQL: Find customers who bought every product in the Product table.

---

## Examples

**Example 1:**
```
Customer Table:
+----+----------+
| id | name     |
+----+----------+
| 1  | Alice    |
| 2  | Bob      |
+----+----------+

Product Table:
+----+----------+
| id | name     |
+----+----------+
| 1  | Phone    |
| 2  | Laptop   |
+----+----------+

Orders Table:
+----+------------+----------+
| id | customerId | productId|
+----+------------+----------+
| 1  | 1          | 1        |
| 2  | 1          | 2        |
| 3  | 2          | 1        |
+----+------------+----------+
```
**Output:**
```
+----+----------+
| id | name     |
+----+----------+
| 1  | Alice    |
+----+----------+
```
*Alice bought both Phone and Laptop, covering all products.*

**Example 2:**
```
(If a customer has no orders, they are excluded because they haven't bought any product.)
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