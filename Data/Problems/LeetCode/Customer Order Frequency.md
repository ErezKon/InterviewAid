# 1511. Customer Order Frequency

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/customer-order-frequency](https://leetcode.com/problems/customer-order-frequency)
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
| country       | varchar |
+---------------+---------+
customer_id is the column with unique values for this table.
This table contains information about the customers in the company.
```

Table: `Product`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| product_id    | int     |
| description   | varchar |
| price         | int     |
+---------------+---------+
product_id is the column with unique values for this table.
This table contains information on the products in the company.
price is the product cost.
```

Table: `Orders`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| customer_id   | int     |
| product_id    | int     |
| order_date    | date    |
| quantity      | int     |
+---------------+---------+
order_id is the column with unique values for this table.
This table contains information on customer orders.
customer_id is the id of the customer who bought "quantity" products with id "product_id".
Order_date is the date in format ('YYYY-MM-DD') when the order was shipped.
```

Write a solution to report the `customer_id` and `customer_name` of customers who have spent at least `$100` in each month of **June and July 2020**.

Return the result table in **any order**.

---

## Approach

```sql
SELECT c.customer_id, c.name
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
JOIN Product p ON o.product_id = p.product_id
GROUP BY c.customer_id, c.name
HAVING SUM(CASE WHEN MONTH(o.order_date) = 6 AND YEAR(o.order_date) = 2020
                THEN o.quantity * p.price ELSE 0 END) >= 100
   AND SUM(CASE WHEN MONTH(o.order_date) = 7 AND YEAR(o.order_date) = 2020
                THEN o.quantity * p.price ELSE 0 END) >= 100;
```

---

## Examples

```
Example 1:
  Input:
  Customers table:
  +--------------+-----------+-------------+
  | customer_id  | name      | country     |
  +--------------+-----------+-------------+
  | 1            | Winston   | USA         |
  | 2            | Jonathan  | Peru        |
  | 3            | Moustafa  | Egypt       |
  +--------------+-----------+-------------+
  Product table:
  +--------------+-------------+-------------+
  | product_id   | description | price       |
  +--------------+-------------+-------------+
  | 10           | LC Phone    | 300         |
  | 20           | LC T-Shirt  | 10          |
  | 30           | LC Book     | 45          |
  | 40           | LC Keychain | 2           |
  +--------------+-------------+-------------+
  Orders table:
  +--------------+-------------+-------------+-------------+-----------+
  | order_id     | customer_id | product_id  | order_date  | quantity  |
  +--------------+-------------+-------------+-------------+-----------+
  | 1            | 1           | 10          | 2020-06-10  | 1         |
  | 2            | 1           | 20          | 2020-07-01  | 1         |
  | 3            | 1           | 30          | 2020-07-08  | 2         |
  | 4            | 2           | 10          | 2020-06-15  | 2         |
  | 5            | 2           | 40          | 2020-07-01  | 10        |
  | 6            | 3           | 20          | 2020-06-24  | 2         |
  | 7            | 3           | 30          | 2020-06-25  | 2         |
  | 9            | 3           | 30          | 2020-05-08  | 3         |
  +--------------+-------------+-------------+-------------+-----------+
  Output:
  +--------------+------------+
  | customer_id  | name       |
  +--------------+------------+
  | 1            | Winston    |
  +--------------+------------+
  Explanation:
  Winston spent $300 (300 * 1) in June and $100 (10 * 1 + 45 * 2) in July 2020.
  Jonathan spent $600 (300 * 2) in June and $20 (2 * 10) in July 2020.
  Moustafa spent $110 (10 * 2 + 45 * 2) in June and $0 in July 2020.
```

---

## Walkthrough

1. **Join tables** – combine `Customers`, `Orders`, and `Product` to have price information per order.
2. **Group by customer** – aggregate rows per `customer_id` and `name`.
3. **Conditional sums** – use `CASE WHEN` inside `SUM` to compute total spend for June (`MONTH = 6`) and July (`MONTH = 7`).
4. **HAVING clause** – keep only groups where both sums are ≥ 100.
5. The query returns the IDs and names of customers satisfying the condition.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(N) where N is the number of order rows (single scan with joins and aggregation) |
| **Space** | O(G) where G is the number of distinct customers (hash table for grouping) |

---

## Follow-Up Questions

1. How would you modify the query to find customers who spent at least $X in any **K** consecutive months?
2. Can you write a version that returns the total spend per month for each qualifying customer?
3. How would you handle time zones or timestamps stored in UTC when extracting month/year?

---

## Key Takeaway

> **Conditional aggregation with CASE WHEN inside SUM + HAVING to filter groups meeting thresholds in multiple months.**