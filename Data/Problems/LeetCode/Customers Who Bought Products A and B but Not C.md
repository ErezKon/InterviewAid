# 1398. Customers Who Bought Products A and B but Not C

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/customers-who-bought-products-a-and-b-but-not-c](https://leetcode.com/problems/customers-who-bought-products-a-and-b-but-not-c)
**Companies:** Meta

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Customers`

```
+---------------------+---------+
| Column Name         | Type    |
+---------------------+---------+
| customer_id         | int     |
| customer_name       | varchar |
+---------------------+---------+
customer_id is the column with unique values for this table.
customer_name is the name of the customer.
```

Table: `Orders`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| customer_id   | int     |
| product_name  | varchar |
+---------------+---------+
order_id is the column with unique values for this table.
customer_id is the id of the customer who bought the product "product_name".
```

Write a solution to report the customer_id and customer_name of customers who bought products **"A"**, **"B"** but did not buy the product **"C"** since we want to recommend them to purchase this product.

Return the result table **ordered** by `customer_id`.

The result format is in the following example.

---

## Examples

**Example 1:**
```
Input:
Customers table:
+-------------+---------------+
| customer_id | customer_name |
+-------------+---------------+
| 1           | Daniel        |
| 2           | Diana         |
| 3           | Elizabeth     |
| 4           | Jhon          |
+-------------+---------------+
Orders table:
+------------+--------------+---------------+
| order_id   | customer_id  | product_name  |
+------------+--------------+---------------+
| 10         |     1        |     A         |
| 20         |     1        |     B         |
| 30         |     1        |     D         |
| 40         |     1        |     C         |
| 50         |     2        |     A         |
| 60         |     3        |     A         |
| 70         |     3        |     B         |
| 80         |     3        |     D         |
| 90         |     4        |     C         |
+------------+--------------+---------------+
Output:
+-------------+---------------+
| customer_id | customer_name |
+-------------+---------------+
| 3           | Elizabeth     |
+-------------+---------------+
Explanation: Only the customer_id with id 3 bought the product A and B but not the product C.
```

---

## Approach

```sql
SELECT DISTINCT c.customer_id, c.customer_name
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
WHERE c.customer_id IN (SELECT customer_id FROM Orders WHERE product_name = 'A')
  AND c.customer_id IN (SELECT customer_id FROM Orders WHERE product_name = 'B')
  AND c.customer_id NOT IN (SELECT customer_id FROM Orders WHERE product_name = 'C');
```

---

## Walkthrough

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Identify customers with product A. | Subquery returns IDs buying A. |
| 2 | Identify customers with product B. | Subquery returns IDs buying B. |
| 3 | Identify customers with product C. | Subquery returns IDs buying C. |
| 4 | Intersect A and B sets, exclude C set. | `IN` for A and B, `NOT IN` for C ensures the condition. |
| 5 | Return distinct customer info. | Guarantees each qualifying customer appears once. |

---

## Complexity Analysis

- **Time:** O(N) scanning the Orders table multiple times (three subqueries). |
- **Space:** O(K) for storing intermediate ID sets, where K is number of distinct customers.

---

## Follow-Up Questions

- How would you rewrite the query using conditional aggregation instead of multiple subqueries?
- How can you adapt the query to handle a dynamic list of required and excluded products?

---

## Key Takeaway

> **Set membership filtering: use IN/NOT IN subqueries (or HAVING with conditional aggregation) to enforce "bought X AND Y but NOT Z" logic.**