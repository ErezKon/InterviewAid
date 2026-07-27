# 1581. Customer Who Visited but Did Not Make Any Transactions

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions](https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft, Nerdwallet, Tcs

---

## Problem Description

SQL: Find customers who visited but made no transactions, and count such visits per customer.

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

## Key Takeaway

> **LEFT JOIN + WHERE IS NULL = anti-join. Finds visits with no matching transaction, then GROUP BY counts per customer.**
