# 1581. Customer Who Visited but Did Not Make Any Transactions

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions](https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft, Nerdwallet, Tcs

---

## Problem Description

SQL: Find customers who visited but made no transactions, and count such visits per customer.

---

## Examples

| Visits Table | Transactions Table |
|---|---|
| visit_id | transaction_id |
| customer_id | visit_id |
| visit_date | amount |

**Example**: If customer `C1` has three visits (`v1,v2,v3`) but only one matching transaction (`t1` linked to `v1`), the query should return `C1` with a count of `2` (visits `v2` and `v3` without transactions).

---

## Approach

```sql
SELECT v.customer_id, COUNT(*) AS count_no_trans
FROM Visits v
LEFT JOIN Transactions t ON v.visit_id = t.visit_id
WHERE t.visit_id IS NULL
GROUP BY v.customer_id;
```

---

## Walkthrough

1. **LEFT JOIN** `Visits` with `Transactions` on `visit_id` to keep all visit rows.
2. **WHERE t.visit_id IS NULL** filters rows where no matching transaction exists (anti‑join).
3. **GROUP BY v.customer_id** aggregates the filtered rows per customer.
4. **COUNT(*)** counts the number of visits without transactions for each customer.

---

## Complexity Analysis

- **Time Complexity:** O(N log N) – the join processes N rows and the grouping sorts/aggregates the result.
- **Space Complexity:** O(G) – where G is the number of distinct customers with at least one non‑transaction visit.

---

## Follow-Up Questions

- How would you modify the query to list the specific visit IDs that lacked transactions?
- How can you restrict the analysis to visits within the last 30 days?
- How would you include customers who never visited at all in the result set?

---

## Key Takeaway

> **LEFT JOIN + WHERE IS NULL = anti‑join. Finds visits with no matching transaction, then GROUP BY counts per customer.**