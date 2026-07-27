# 1613. Find the Missing IDs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-missing-ids](https://leetcode.com/problems/find-the-missing-ids)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL Recursive CTE ✅](#2-approach-sql-recursive-cte-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given a `Customers` table with IDs, find all IDs from 1 to the maximum ID that are **not** in the table. (SQL problem)

---

## 2. Approach: SQL Recursive CTE ✅

```sql
WITH RECURSIVE seq AS (
    SELECT 1 AS id
    UNION ALL
    SELECT id + 1 FROM seq WHERE id < (SELECT MAX(customer_id) FROM Customers)
)
SELECT id AS ids
FROM seq
WHERE id NOT IN (SELECT customer_id FROM Customers)
ORDER BY id;
```

Alternative: Generate numbers using a numbers table or `GENERATE_SERIES` if available.

---

## 3. Key Takeaway

> Use a **recursive CTE to generate the full ID range**, then anti-join with the existing table to find gaps.
