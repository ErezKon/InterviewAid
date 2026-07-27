# 1193. Monthly Transactions I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/monthly-transactions-i](https://leetcode.com/problems/monthly-transactions-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Wish

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Solution: SQL](#3-solution-sql)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

For each month and country, report: total transaction count, approved count, total amount, and approved amount.

---

## 2. Key Insight

> **Conditional aggregation with CASE.** Group by month+country, use `SUM(CASE WHEN ... THEN 1/amount ELSE 0 END)` for filtered counts and sums.

---

## 3. Solution: SQL ✅

```sql
SELECT DATE_FORMAT(trans_date, '%Y-%m') AS month, country,
    COUNT(*) AS trans_count,
    SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count,
    SUM(amount) AS trans_total_amount,
    SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount
FROM Transactions
GROUP BY month, country;
```

---

## 4. Key Takeaway

> **CASE WHEN inside SUM** — the standard pattern for conditional aggregation in SQL. Avoids subqueries and self-joins.
