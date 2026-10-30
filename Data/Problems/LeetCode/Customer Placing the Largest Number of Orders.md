# 586. Customer Placing the Largest Number of Orders

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/customer-placing-the-largest-number-of-orders](https://leetcode.com/problems/customer-placing-the-largest-number-of-orders)
**Companies:** Amazon, Google, Microsoft, Twitter

---

## Problem Description

Table: `Orders`

```
+-----------------+----------+
| Column Name     | Type     |
+-----------------+----------+
| order_number    | int      |
| customer_number | int      |
+-----------------+----------+
order_number is the primary key (column with unique values) for this table.
This table contains information about the order ID and the customer ID.
```

Write a solution to find the `customer_number` for the customer who has placed **the largest number of orders**.

The test cases are generated so that **exactly one customer** will have placed more orders than any other customer.

The result format is in the following example.

---

## Examples

**Example 1:**
```
Input:
Orders table:
+--------------+-----------------+
| order_number | customer_number |
+--------------+-----------------+
| 1            | 1               |
| 2            | 2               |
| 3            | 3               |
| 4            | 3               |
+--------------+-----------------+
Output:
+-----------------+
| customer_number |
+-----------------+
| 3               |
+-----------------+
Explanation:
The customer with number 3 has two orders, which is greater than either customer 1 or 2 because each of them only has one order.
So the result is customer_number 3.
Follow up: What if more than one customer has the largest number of orders, can you find all the customer_number in this case?
```

---

## Approach

```sql
SELECT customer_number FROM Orders
GROUP BY customer_number
ORDER BY COUNT(*) DESC
LIMIT 1;
```

---

## Walkthrough

1. **Group** rows by `customer_number` to aggregate orders per customer.
2. **Count** the number of rows in each group using `COUNT(*)`.
3. **Order** the groups in descending order of the count.
4. **Limit** the result to the top row, which represents the customer with the highest order count.

---

## Complexity Analysis

- **Time Complexity:** O(N log N) due to the sorting step performed by `ORDER BY` on N groups.
- **Space Complexity:** O(N) for storing the grouped counts.

---

## Follow-Up Questions

- How would you modify the query to return the top K customers with the most orders?
- How can you handle ties where multiple customers have the same maximum order count?
- How would you retrieve the total order amount for the top customer if an `order_amount` column existed?

---

## Key Takeaway

> **GROUP BY + ORDER BY COUNT(*) DESC + LIMIT 1 finds the top group by frequency.**