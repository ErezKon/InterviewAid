# 1511. Customer Order Frequency

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/customer-order-frequency](https://leetcode.com/problems/customer-order-frequency)
**Companies:** Amazon

---

## Problem Description

SQL: Find customers who spent at least $100 in both June and July 2020.

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

| June Spend | July Spend | Result |
|------------|------------|--------|
| $120 | $130 | Customer appears in output |
| $90  | $150 | Excluded (June < $100) |
| $200 | $80  | Excluded (July < $100) |

---

## Walkthrough

1. **Join tables** – combine `Customers`, `Orders`, and `Product` to have price information per order.
2. **Group by customer** – aggregate rows per `customer_id` and `name`.
3. **Conditional sums** – use `CASE WHEN` inside `SUM` to compute total spend for June (`MONTH = 6`) and July (`MONTH = 7`).
4. **HAVING clause** – keep only groups where both sums are ≥ 100.
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