# 1193. Monthly Transactions I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/monthly-transactions-i](https://leetcode.com/problems/monthly-transactions-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Wish

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
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| country       | varchar |
| state         | enum    |
| amount        | int     |
| trans_date    | date    |
+---------------+---------+
id is the primary key of this table.
The table has information about incoming transactions.
The state column is an enum of type ["approved", "declined"].
```

Write an SQL query to find for each month and country, the number of transactions and their total amount, the number of approved transactions and their total amount.

Return the result table in **any order**.

The query result format is in the following example.

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

## 4. Examples

```
Example 1:
  Input:
  Transactions table:
  +------+---------+----------+--------+------------+
  | id   | country | state    | amount | trans_date |
  +------+---------+----------+--------+------------+
  | 121  | US      | approved | 1000   | 2018-12-18 |
  | 122  | US      | declined | 2000   | 2018-12-19 |
  | 123  | US      | approved | 2000   | 2019-01-01 |
  | 124  | DE      | approved | 2000   | 2019-01-07 |
  +------+---------+----------+--------+------------+
  Output:
  +----------+---------+-------------+----------------+--------------------+-----------------------+
  | month    | country | trans_count | approved_count | trans_total_amount | approved_total_amount |
  +----------+---------+-------------+----------------+--------------------+-----------------------+
  | 2018-12  | US      | 2           | 1              | 3000               | 1000                  |
  | 2019-01  | US      | 1           | 1              | 2000               | 2000                  |
  | 2019-01  | DE      | 1           | 1              | 2000               | 2000                  |
  +----------+---------+-------------+----------------+--------------------+-----------------------+
```

---

## 5. Approach

1. Use `DATE_FORMAT` to extract `YYYY-MM` from `trans_date`.
2. Group rows by the derived month and `country`.
3. Apply `COUNT(*)` for total transactions.
4. Use `SUM(CASE WHEN state='approved' THEN 1 ELSE 0 END)` for approved count.
5. Use `SUM(amount)` for total amount and a conditional sum for approved amount.

---

## 6. Walkthrough

Given a small dataset:
| trans_date | country | amount | state |
|------------|---------|--------|-------|
| 2023-01-15 | US      | 100    | approved |
| 2023-01-20 | US      | 50     | declined |
| 2023-02-05 | CA      | 200    | approved |

- Extract months: `2023-01`, `2023-02`.
- Group by (`2023-01`, US) and (`2023-02`, CA).
- Compute counts and sums as per the query.
- Result rows reflect the aggregated numbers.

---

## 7. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(N) – single scan of the table by the database engine |
| **Space** | O(G) – space for groups, where G is number of month-country pairs |

---

## 8. Key Takeaway

> **Conditional aggregation** lets you compute multiple metrics in one grouped query without sub-queries.
