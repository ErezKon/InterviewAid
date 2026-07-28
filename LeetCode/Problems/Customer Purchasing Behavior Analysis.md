# 3230. Customer Purchasing Behavior Analysis

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/customer-purchasing-behavior-analysis](https://leetcode.com/problems/customer-purchasing-behavior-analysis)
**Companies:** Amazon

---

## Problem Description

SQL: Analyze customer purchasing behavior by computing metrics like total spending, transaction count, unique categories, and a loyalty score. Rank customers by score.

---

## Examples

| Transactions Table | Description |
|---|---|
| customer_id | Identifier of the customer |
| amount | Purchase amount for the transaction |
| category | Category of the purchased item |

**Example**: For a customer with three transactions of amounts 10, 20, 30 in categories `A`, `A`, `B`, the total amount is 60, transaction count is 3, unique categories = 2, and loyalty score = ROUND(60/3 * 2, 2) = 40.00.

---

## Approach

```sql
SELECT customer_id,
       SUM(amount) AS total_amount,
       COUNT(*) AS transaction_count,
       COUNT(DISTINCT category) AS unique_categories,
       ROUND(SUM(amount) / COUNT(*) * COUNT(DISTINCT category), 2) AS loyalty_score
FROM Transactions
GROUP BY customer_id
ORDER BY loyalty_score DESC, customer_id;
```

---

## Walkthrough

1. **Group** rows by `customer_id` to aggregate per‑customer data.
2. **SUM(amount)** gives total spending per customer.
3. **COUNT(*)** counts the number of transactions.
4. **COUNT(DISTINCT category)** counts distinct purchase categories.
5. **Compute loyalty_score** using the formula `SUM(amount) / COUNT(*) * COUNT(DISTINCT category)` and round to two decimals.
6. **ORDER BY** the computed `loyalty_score` descending (and `customer_id` to break ties) to rank customers.

---

## Complexity Analysis

- **Time Complexity:** O(N log N) – the `GROUP BY` processes N rows and the final `ORDER BY` sorts the grouped results.
- **Space Complexity:** O(G) – where G is the number of distinct customers stored for aggregation.

---

## Follow-Up Questions

- How would you modify the query to include only customers with at least a certain number of transactions?
- How can you compute a moving average loyalty score over the last M transactions per customer?
- How would you incorporate a time window (e.g., last 30 days) into the analysis?

---

## Key Takeaway

> **Combine aggregation functions (SUM, COUNT, COUNT(DISTINCT)) in a single `GROUP BY` and derive a composite score to rank customers efficiently.**