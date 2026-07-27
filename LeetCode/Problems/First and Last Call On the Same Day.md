# 1972. First and Last Call On the Same Day

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/first-and-last-call-on-the-same-day](https://leetcode.com/problems/first-and-last-call-on-the-same-day)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL Window Functions ✅](#2-approach-sql-window-functions-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given a `Calls(caller_id, recipient_id, call_time)` table, find users whose first and last calls on the same day were with the same person. (SQL problem)

---

## 2. Approach: SQL Window Functions ✅

```sql
WITH all_calls AS (
    SELECT caller_id AS user_id, recipient_id AS contact, DATE(call_time) AS day, call_time FROM Calls
    UNION ALL
    SELECT recipient_id, caller_id, DATE(call_time), call_time FROM Calls
),
ranked AS (
    SELECT user_id, contact, day,
           FIRST_VALUE(contact) OVER (PARTITION BY user_id, day ORDER BY call_time) AS first_contact,
           FIRST_VALUE(contact) OVER (PARTITION BY user_id, day ORDER BY call_time DESC) AS last_contact
    FROM all_calls
)
SELECT DISTINCT user_id
FROM ranked
WHERE first_contact = last_contact;
```

---

## 3. Key Takeaway

> Use `FIRST_VALUE` window function to get the first and last call contact per user per day. Include both directions of calls via UNION ALL.
