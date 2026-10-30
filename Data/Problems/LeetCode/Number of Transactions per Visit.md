# 1336. Number of Transactions per Visit

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-transactions-per-visit](https://leetcode.com/problems/number-of-transactions-per-visit)
**Companies:** Machine Zone, Machinezone

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL with Recursive CTE](#2-approach)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Visits`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user_id       | int     |
| visit_date    | date    |
+---------------+---------+
(user_id, visit_date) is the primary key (combination of columns with unique values) for this table.
Each row of this table indicates that user_id has visited the bank in visit_date.
```

Table: `Transactions`

```
+------------------+---------+
| Column Name      | Type    |
+------------------+---------+
| user_id          | int     |
| transaction_date | date    |
| amount           | int     |
+------------------+---------+
This table may contain duplicates rows.
Each row of this table indicates that user_id has done a transaction of amount in transaction_date.
It is guaranteed that the user has visited the bank in the transaction_date.(i.e The Visits table contains (user_id, transaction_date) in one row)
```

A bank wants to draw a chart of the number of transactions bank visitors did in one visit to the bank and the corresponding number of visitors who have done this number of transaction in one visit.

Write a solution to find how many users visited the bank and didn't do any transactions, how many visited the bank and did one transaction, and so on.

The result table will contain two columns:

- `transactions_count` which is the number of transactions done in one visit.
- `visits_count` which is the corresponding number of users who did `transactions_count` in one visit to the bank.

`transactions_count` should take all values from `0` to `max(transactions_count)` done by one or more users.

Return the result table ordered by `transactions_count`.

The result format is in the following example.

---

## 2. Approach: SQL with Recursive CTE ✅

```sql
-- Generate numbers 0..max_transactions
-- LEFT JOIN visits with transaction counts
-- Group by transaction count, count users
WITH RECURSIVE nums AS (
    SELECT 0 AS n UNION ALL SELECT n+1 FROM nums WHERE n < max
),
visit_txn AS (
    SELECT v.user_id, v.visit_date, COUNT(t.transaction_date) AS cnt
    FROM Visits v LEFT JOIN Transactions t
    ON v.user_id = t.user_id AND v.visit_date = t.transaction_date
    GROUP BY v.user_id, v.visit_date
)
SELECT n AS transactions_count, COUNT(visit_txn.cnt) AS visits_count
FROM nums LEFT JOIN visit_txn ON nums.n = visit_txn.cnt
GROUP BY n;
```

---

## 3. Examples

**Example 1:**
```
Input:
Visits table:
+---------+------------+
| user_id | visit_date |
+---------+------------+
| 1       | 2020-01-01 |
| 2       | 2020-01-02 |
| 12      | 2020-01-01 |
| 19      | 2020-01-03 |
| 1       | 2020-01-02 |
| 2       | 2020-01-03 |
| 1       | 2020-01-04 |
| 7       | 2020-01-11 |
| 9       | 2020-01-25 |
| 8       | 2020-01-28 |
+---------+------------+
Transactions table:
+---------+------------------+--------+
| user_id | transaction_date | amount |
+---------+------------------+--------+
| 1       | 2020-01-02       | 120    |
| 2       | 2020-01-03       | 22     |
| 7       | 2020-01-11       | 232    |
| 1       | 2020-01-04       | 7      |
| 9       | 2020-01-25       | 33     |
| 9       | 2020-01-25       | 66     |
| 8       | 2020-01-28       | 1      |
| 9       | 2020-01-25       | 99     |
+---------+------------------+--------+
Output:
+--------------------+--------------+
| transactions_count | visits_count |
+--------------------+--------------+
| 0                  | 4            |
| 1                  | 5            |
| 2                  | 0            |
| 3                  | 1            |
+--------------------+--------------+
Explanation: The chart drawn for this example is shown above.
* For transactions_count = 0, The visits (1, "2020-01-01"), (2, "2020-01-02"), (12, "2020-01-01") and (19, "2020-01-03") did no transactions so visits_count = 4.
* For transactions_count = 1, The visits (2, "2020-01-03"), (7, "2020-01-11"), (8, "2020-01-28"), (1, "2020-01-02") and (1, "2020-01-04") did one transaction so visits_count = 5.
* For transactions_count = 2, No customers visited the bank and did two transactions so visits_count = 0.
* For transactions_count = 3, The visit (9, "2020-01-25") did three transactions so visits_count = 1.
* For transactions_count >= 4, No customers visited the bank and did more than three transactions so we will stop at transactions_count = 3
```

---

## 4. Walkthrough

**Step 1 – Count transactions per visit**

```
SELECT v.user_id, v.visit_date,
       COUNT(t.transaction_date) AS cnt
FROM Visits v LEFT JOIN Transactions t
ON v.user_id = t.user_id AND v.visit_date = t.transaction_date
GROUP BY v.user_id, v.visit_date;
```

**Step 2 – Generate a sequence of possible counts**

```
WITH RECURSIVE nums AS (
    SELECT 0 AS n UNION ALL SELECT n+1 FROM nums WHERE n < max
)
```

**Step 3 – Histogram the counts**

```
SELECT n AS transactions_count,
       COUNT(visit_txn.cnt) AS visits_count
FROM nums LEFT JOIN visit_txn ON nums.n = visit_txn.cnt
GROUP BY n;
```

The left join ensures counts with zero visits are included.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(V + T) |
| **Space** | O(V) |

---

## 6. Follow-Up Questions

1. How would you modify the query to limit results to the top k transaction counts?
2. How can you compute the median number of transactions per visit using SQL?
3. Extend the solution to handle a rolling 30‑day window of visits.

---

## 7. Key Takeaway

> **Recursive CTE for generating number sequence.** Join visits with transactions per date, then histogram by transaction count. Fill gaps with the number sequence.
