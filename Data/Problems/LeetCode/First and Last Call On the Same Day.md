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

> *Note: premium SQL problem — schema/statement/example verified via doocs/leetcode.*

Table: `Calls`

```
+--------------+----------+
| Column Name  | Type     |
+--------------+----------+
| caller_id    | int      |
| recipient_id | int      |
| call_time    | datetime |
+--------------+----------+
(caller_id, recipient_id, call_time) is the primary key (combination of columns with unique values) for this table.
Each row contains information about the time of a phone call between caller_id and recipient_id.
```

Write a solution to report the IDs of the users whose first and last calls on **any day** were with **the same person**. Calls are counted regardless of being the caller or the recipient.

Return the result table in **any order**.

The result format is in the following example.

---

## 2. Examples

**Example 1:**
```
Input:
Calls table:
+-----------+--------------+---------------------+
| caller_id | recipient_id | call_time           |
+-----------+--------------+---------------------+
| 8         | 4            | 2021-08-24 17:46:07 |
| 4         | 8            | 2021-08-24 19:57:13 |
| 5         | 1            | 2021-08-11 05:28:44 |
| 8         | 3            | 2021-08-17 04:04:15 |
| 11        | 3            | 2021-08-17 13:07:00 |
| 8         | 11           | 2021-08-17 22:22:22 |
+-----------+--------------+---------------------+
Output:
+---------+
| user_id |
+---------+
| 1       |
| 4       |
| 5       |
| 8       |
+---------+
Explanation:
On 2021-08-24, the first and last call of this day for user 8 was with user 4. User 8 should be included in the answer.
Similarly, user 4 on 2021-08-24 had their first and last call with user 8. User 4 should be included in the answer.
On 2021-08-11, user 1 and 5 had a call. This call was the only call for both of them on this day. Since this call is the first and last call of the day for both of them, they should both be included in the answer.
```

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