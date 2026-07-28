# 1398. Customers Who Bought Products A and B but Not C

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/customers-who-bought-products-a-and-b-but-not-c](https://leetcode.com/problems/customers-who-bought-products-a-and-b-but-not-c)
**Companies:** Meta

---

## Problem Description

SQL: Find customers who bought both product A and product B but did not buy product C.

---

## Examples

**Example 1:**
```
Customers Table:
+----+----------+
| id | name     |
+----+----------+
| 1  | Alice    |
| 2  | Bob      |
| 3  | Carol    |
+----+----------+

Orders Table:
+----+------------+------------+
| id | customerId | product    |
+----+------------+------------+
| 1  | 1          | A          |
| 2  | 1          | B          |
| 3  | 1          | C          |
| 4  | 2          | A          |
| 5  | 2          | B          |
| 6  | 3          | A          |
| 7  | 3          | B          |
+----+------------+------------+
```
**Output:**
```
+----+----------+
| id | name     |
+----+----------+
| 3  | Carol    |
+----+----------+
```
*Carol bought A and B but never bought C.*

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