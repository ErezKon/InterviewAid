# 1205. Monthly Transactions II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/monthly-transactions-ii](https://leetcode.com/problems/monthly-transactions-ii)
**Companies:** Wish

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Solution: SQL](#3-solution-sql)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Like Monthly Transactions I but also include chargebacks. For each month/country, report approved count, approved amount, chargeback count, and chargeback amount.

---

## 2. Key Insight

> **UNION ALL** approved transactions and chargebacks (using the chargeback month, not original trans month), then apply the same conditional aggregation pattern.

---

## 3. Solution: SQL ✅

```sql
SELECT month, country,
    SUM(CASE WHEN type = 'approved' THEN 1 ELSE 0 END) AS approved_count,
    SUM(CASE WHEN type = 'approved' THEN amount ELSE 0 END) AS approved_amount,
    SUM(CASE WHEN type = 'chargeback' THEN 1 ELSE 0 END) AS chargeback_count,
    SUM(CASE WHEN type = 'chargeback' THEN amount ELSE 0 END) AS chargeback_amount
FROM (
    SELECT DATE_FORMAT(trans_date, '%Y-%m') AS month, country, amount, 'approved' AS type
    FROM Transactions WHERE state = 'approved'
    UNION ALL
    SELECT DATE_FORMAT(c.trans_date, '%Y-%m') AS month, t.country, t.amount, 'chargeback' AS type
    FROM Chargebacks c JOIN Transactions t ON c.trans_id = t.id
) combined
GROUP BY month, country;
```

---

## 4. Key Takeaway

> **UNION ALL to merge event types**, then GROUP BY with conditional aggregation. Chargebacks use the chargeback date, not the original transaction date.
