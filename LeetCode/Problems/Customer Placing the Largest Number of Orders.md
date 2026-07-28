# 586. Customer Placing the Largest Number of Orders

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/customer-placing-the-largest-number-of-orders](https://leetcode.com/problems/customer-placing-the-largest-number-of-orders)
**Companies:** Amazon, Google, Microsoft, Twitter

---

## Problem Description

SQL: Find the customer who placed the most orders.

---

## Examples

| Orders Table | Description |
|---|---|
| customer_number | Identifier of the customer |
| order_id | Unique order identifier |

**Example 1**: If the `Orders` table contains three orders for customer `101` and one order for customer `102`, the query should return `101` as the customer with the most orders.

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