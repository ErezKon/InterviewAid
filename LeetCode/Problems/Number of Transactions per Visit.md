# 1336. Number of Transactions per Visit

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-transactions-per-visit](https://leetcode.com/problems/number-of-transactions-per-visit)
**Companies:** Machine Zone, Machinezone

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL with Recursive CTE](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Report the number of users who had exactly 0, 1, 2, ... transactions per visit. Generate all counts from 0 to max.

---

## 2. Approach: SQL with Recursive CTE ✅

```
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
GROUP BY n
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(V + T) |
| **Space** | O(V) |

---

## 4. Key Takeaway

> **Recursive CTE for generating number sequence.** Join visits with transactions per date, then histogram by transaction count. Fill gaps with the number sequence.
