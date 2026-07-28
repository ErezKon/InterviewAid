# 1972. First and Last Call On the Same Day

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/first-and-last-call-on-the-same-day](https://leetcode.com/problems/first-and-last-call-on-the-same-day)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: SQL Window Functions ✅](#3-approach-sql-window-functions-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a `Calls(caller_id, recipient_id, call_time)` table, find users whose first and last calls on the same day were with the same person. (SQL problem)

---

## 2. Examples

**Example 1**
```
Calls Table
+-----------+--------------+-------------------+
| caller_id | recipient_id | call_time         |
+-----------+--------------+-------------------+
| 1         | 2            | 2023-01-01 08:00  |
| 1         | 2            | 2023-01-01 17:00  |
| 1         | 3            | 2023-01-02 09:00  |
| 1         | 3            | 2023-01-02 18:00  |
+-----------+--------------+-------------------+
```
**Output:** `[1]` – User 1’s first and last calls on each day are with the same contact.

---

## 3. Approach: SQL Window Functions ✅

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

## 4. Walkthrough

| Step | Action |
|------|--------|
| 1 | Duplicate calls in both directions using `UNION ALL` to treat caller and recipient uniformly. |
| 2 | For each `user_id` and `day`, apply `FIRST_VALUE` window function ordered by `call_time` to capture the first contact. |
| 3 | Apply `FIRST_VALUE` ordered descending to capture the last contact. |
| 4 | Keep rows where `first_contact` equals `last_contact`; those users satisfy the condition. |

---

## 5. Complexity Analysis

The query scans the `Calls` table twice (once per `UNION ALL`) and performs window functions that run in linear time over the partitioned rows. Overall time complexity is **O(N)** where *N* is the number of call records. Space complexity is **O(N)** for the intermediate result set.

---

## 6. Follow-Up Questions

1. How would you modify the query to restrict results to a specific date range?
2. Extend the problem to require that the first and last contacts are the *same* **and** the call durations exceed a threshold.
3. How would you solve this problem using procedural code instead of SQL?

---

## 7. Key Takeaway

> Use `FIRST_VALUE` window functions to efficiently retrieve the first and last call contacts per user per day, handling bidirectional calls with a simple `UNION ALL`.