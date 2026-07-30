# 1369. Get the Second Most Recent Activity

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/get-the-second-most-recent-activity](https://leetcode.com/problems/get-the-second-most-recent-activity)
**Companies:** Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Window Function ✅](#3-approach-window-function-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

For each user, return the second most recent activity. If they only have one activity, return that one. (SQL problem)

---

## 2. Examples

| username | startDate   | endDate   | activity |
|----------|------------|-----------|----------|
| alice    | 2023-01-10 | 2023-01-12| A1       |
| alice    | 2023-01-05 | 2023-01-06| A2       |
| bob      | 2023-02-01 | 2023-02-02| B1       |

**Result**
| username | activity | startDate   | endDate   |
|----------|----------|------------|-----------|
| alice    | A2       | 2023-01-05 | 2023-01-06 |
| bob      | B1       | 2023-02-01 | 2023-02-02 |

---

## 3. Approach: Window Function ✅

```sql
WITH ranked AS (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY username ORDER BY startDate DESC) AS rn,
           COUNT(*) OVER (PARTITION BY username) AS cnt
    FROM UserActivity
)
SELECT username, activity, startDate, endDate
FROM ranked
WHERE rn = 2 OR cnt = 1;
```

---

## 4. Walkthrough

1. **Rank rows** per `username` by `startDate` descending using `ROW_NUMBER()`.
2. **Count** total rows per user with `COUNT(*)`.
3. **Select** rows where the rank is `2` (second most recent) **or** the user has only one row (`cnt = 1`).
4. The query returns exactly the required activity for each user.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(N) – single scan of the table with window functions |
| **Space** | O(N) – temporary ranking data stored by the DB engine |

---

## 6. Follow-Up Questions

* How would you modify the query to return the *k*‑th most recent activity?
* Can you achieve the same result without window functions, using only `GROUP BY` and sub‑queries?

---

## 7. Key Takeaway

> Use `ROW_NUMBER()` partitioned by user, ordered by date desc. Pick `rn = 2` (second most recent) or `cnt = 1` (only one activity).
