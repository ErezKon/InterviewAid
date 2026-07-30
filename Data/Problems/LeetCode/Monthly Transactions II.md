# 1205. Monthly Transactions II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/monthly-transactions-ii](https://leetcode.com/problems/monthly-transactions-ii)
**Companies:** Wish

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Solution: SQL](#3-solution-sql)
4. [Examples](#4-examples)
5. [Approach](#5-approach)
6. [Walkthrough](#6-walkthrough)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Key Takeaway](#8-key-takeaway)

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

## 4. Examples

**Example 1:**
```
Transactions table:
| id | trans_date | country | amount | state |
|----|------------|---------|--------|-------|
| 1  | 2023-01-10 | US      | 100    | approved |
| 2  | 2023-01-12 | US      | 50     | declined |
Chargebacks table:
| trans_id | trans_date |
|----------|------------|
| 1        | 2023-02-01 |
```
Result:
```
month | country | approved_count | approved_amount | chargeback_count | chargeback_amount
2023-01 | US | 1 | 100 | 0 | 0
2023-02 | US | 0 | 0 | 1 | 100
```
*Shows aggregation across months and chargeback handling.*

---

## 5. Approach

1. **Extract approved transactions** with month derived from `trans_date`.
2. **Extract chargebacks** joining to original transaction to get amount and country, using chargeback date as month.
3. **Combine** both sets with `UNION ALL` and label each row as `approved` or `chargeback`.
4. **Group** by month and country.
5. **Apply conditional aggregation** using `SUM(CASE WHEN type='approved' THEN …)` for each metric.

---

## 6. Walkthrough

Given the example data:
- Approved part yields a row `(2023-01, US, 100, 'approved')`.
- Chargeback part yields `(2023-02, US, 100, 'chargeback')`.
- After UNION ALL we have two rows.
- Grouping by month and country aggregates counts and sums per type, producing the final table shown above.

---

## 7. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(N) – single scan of both tables by the database engine |
| **Space** | O(G) – space for groups, where G is number of month‑country pairs |

---

## 8. Key Takeaway

> **UNION ALL + conditional aggregation** lets you merge different event types and compute multiple metrics in one grouped query.
