# 183. Customers Who Never Order

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/customers-who-never-order](https://leetcode.com/problems/customers-who-never-order)
**Companies:** Amazon, Bloomberg, Deloitte, Google, Meta, Microsoft

---

## Problem Description

Table: `Customers`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+
id is the primary key (column with unique values) for this table.
Each row of this table indicates the ID and name of a customer.
```

Table: `Orders`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| id          | int  |
| customerId  | int  |
+-------------+------+
id is the primary key (column with unique values) for this table.
customerId is a foreign key (reference columns) of the ID from the Customers table.
Each row of this table indicates the ID of an order and the ID of the customer who ordered it.
```

Write a solution to find all customers who never order anything.

Return the result table in **any order**.

The result format is in the following example.

---

## Examples

**Example 1:**
```
Input:
Customers table:
+----+-------+
| id | name  |
+----+-------+
| 1  | Joe   |
| 2  | Henry |
| 3  | Sam   |
| 4  | Max   |
+----+-------+
Orders table:
+----+------------+
| id | customerId |
+----+------------+
| 1  | 3          |
| 2  | 1          |
+----+------------+
Output:
+-----------+
| Customers |
+-----------+
| Henry     |
| Max       |
+-----------+
```

---

## Approach

```sql
SELECT name AS Customers
FROM Customers
WHERE id NOT IN (SELECT customerId FROM Orders);
```

---

## Walkthrough

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Select all customers. | Retrieves every row from `Customers`. |
| 2 | Exclude those with orders. | Subquery `SELECT customerId FROM Orders` returns IDs that have placed orders. `NOT IN` filters them out. |
| 3 | Return remaining rows. | The result set contains customers with no matching order record. |

---

## Complexity Analysis

- **Time:** O(N + M) where N is number of customers and M is number of orders, due to scanning both tables.
- **Space:** O(K) for the set of order customer IDs, where K is distinct customers in `Orders`.

---

## Follow-Up Questions

- How would you rewrite the query using a `LEFT JOIN` and `IS NULL` check?
- How can you handle cases where the `Orders` table is extremely large (e.g., using indexes or partitioning)?

---

## Key Takeaway

> **Anti-join pattern: `NOT IN (subquery)` or `LEFT JOIN ... WHERE ... IS NULL` finds rows in one table with no match in another.**