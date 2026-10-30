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

Table: `Transactions`

```
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| id             | int     |
| country        | varchar |
| state          | enum    |
| amount         | int     |
| trans_date     | date    |
+----------------+---------+
id is the column of unique values of this table.
The table has information about incoming transactions.
The state column is an ENUM (category) of type ["approved", "declined"].
```

Table: `Chargebacks`

```
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| trans_id       | int     |
| trans_date     | date    |
+----------------+---------+
Chargebacks contains basic information regarding incoming chargebacks from some transactions placed in Transactions table.
trans_id is a foreign key (reference column) to the id column of Transactions table.
Each chargeback corresponds to a transaction made previously even if they were not approved.
```

Write a solution to find for each month and country: the number of approved transactions and their total amount, the number of chargebacks, and their total amount.

**Note**: In your solution, given the month and country, ignore rows with all zeros.

Return the result table in **any order**.

The result format is in the following example.

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

```
Example 1:
  Input:
  Transactions table:
  +-----+---------+----------+--------+------------+
  | id  | country | state    | amount | trans_date |
  +-----+---------+----------+--------+------------+
  | 101 | US      | approved | 1000   | 2019-05-18 |
  | 102 | US      | declined | 2000   | 2019-05-19 |
  | 103 | US      | approved | 3000   | 2019-06-10 |
  | 104 | US      | declined | 4000   | 2019-06-13 |
  | 105 | US      | approved | 5000   | 2019-06-15 |
  +-----+---------+----------+--------+------------+
  Chargebacks table:
  +----------+------------+
  | trans_id | trans_date |
  +----------+------------+
  | 102      | 2019-05-29 |
  | 101      | 2019-06-30 |
  | 105      | 2019-09-18 |
  +----------+------------+
  Output:
  +---------+---------+----------------+-----------------+------------------+-------------------+
  | month   | country | approved_count | approved_amount | chargeback_count | chargeback_amount |
  +---------+---------+----------------+-----------------+------------------+-------------------+
  | 2019-05 | US      | 1              | 1000            | 1                | 2000              |
  | 2019-06 | US      | 2              | 8000            | 1                | 1000              |
  | 2019-09 | US      | 0              | 0               | 1                | 5000              |
  +---------+---------+----------------+-----------------+------------------+-------------------+
```

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
