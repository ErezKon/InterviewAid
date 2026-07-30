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

Report the number of users who had exactly 0, 1, 2, ... transactions per visit. Generate all counts from 0 to max.

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

| Visits Table | Transactions Table | Output |
|--------------|--------------------|--------|
| (1, '2021-01-01')<br>(2, '2021-01-01') | (1, '2021-01-01') | 0 → 0, 1 → 1, 2 → 1 |
| (1, '2021-01-02')<br>(2, '2021-01-02')<br>(3, '2021-01-02') | (1, '2021-01-02')<br>(2, '2021-01-02') | 0 → 1, 1 → 2 |

*Explanation*: For the first day, user 1 made a transaction, user 2 did not. Hence counts: 0 transactions → 1 visit, 1 transaction → 1 visit.

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
