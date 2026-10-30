# 1934. Confirmation Rate

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/confirmation-rate](https://leetcode.com/problems/confirmation-rate)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Table: `Signups`

```
+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| user_id        | int      |
| time_stamp     | datetime |
+----------------+----------+
user_id is the column of unique values for this table.
Each row contains information about the signup time for the user with ID user_id.
```

Table: `Confirmations`

```
+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| user_id        | int      |
| time_stamp     | datetime |
| action         | ENUM     |
+----------------+----------+
(user_id, time_stamp) is the primary key (combination of columns with unique values) for this table.
user_id is a foreign key (reference column) to the Signups table.
action is an ENUM (category) of the type ('confirmed', 'timeout')
Each row of this table indicates that the user with ID user_id requested a confirmation message at time_stamp and that confirmation message was either confirmed ('confirmed') or expired without confirming ('timeout').
```

The **confirmation rate** of a user is the number of `'confirmed'` messages divided by the total number of requested confirmation messages. The confirmation rate of a user that did not request any confirmation messages is `0`. Round the confirmation rate to **two decimal** places.

Write a solution to find the **confirmation rate** of each user.

Return the result table in **any order**.

## Examples
```
Example 1:
  Input:
    Signups table:
    +---------+---------------------+
    | user_id | time_stamp          |
    +---------+---------------------+
    | 3       | 2020-03-21 10:16:13 |
    | 7       | 2020-01-04 13:57:59 |
    | 2       | 2020-07-29 23:09:44 |
    | 6       | 2020-12-09 10:39:37 |
    +---------+---------------------+
    Confirmations table:
    +---------+---------------------+-----------+
    | user_id | time_stamp          | action    |
    +---------+---------------------+-----------+
    | 3       | 2021-01-06 03:30:46 | timeout   |
    | 3       | 2021-07-14 14:00:00 | timeout   |
    | 7       | 2021-06-12 11:57:29 | confirmed |
    | 7       | 2021-06-13 12:58:28 | confirmed |
    | 7       | 2021-06-14 13:59:27 | confirmed |
    | 2       | 2021-01-22 00:00:00 | confirmed |
    | 2       | 2021-02-28 23:59:59 | timeout   |
    +---------+---------------------+-----------+
  Output:
    +---------+-------------------+
    | user_id | confirmation_rate |
    +---------+-------------------+
    | 6       | 0.00              |
    | 3       | 0.00              |
    | 7       | 1.00              |
    | 2       | 0.50              |
    +---------+-------------------+
  Explanation:
    User 6 did not request any confirmation messages. The confirmation rate is 0.
    User 3 made 2 requests and both timed out. The confirmation rate is 0.
    User 7 made 3 requests and all were confirmed. The confirmation rate is 1.
    User 2 made 2 requests where one was confirmed and the other timed out. The confirmation rate is 1 / 2 = 0.5.
```

## Approach
Aggregate confirmations per user, compute the average of a boolean expression (`action='confirmed'`), and round the result. Use a `LEFT JOIN` to include users without confirmations.

```text
FUNCTION compute_confirmation_rate():
    // SQL logic expressed in pseudocode
    FOR each user IN Signups:
        SET total ← COUNT(Confirmations WHERE user_id = user.id)
        SET confirmed ← COUNT(Confirmations WHERE user_id = user.id AND action = 'confirmed')
        IF total = 0:
            SET rate ← 0.00
        ELSE:
            SET rate ← ROUND(confirmed / total, 2)
        OUTPUT (user.id, rate)
```

## Walkthrough
| User | Confirmations | Confirmed | Total | Rate |
|------|---------------|-----------|-------|------|
| 1 | ['confirmed','rejected'] | 1 | 2 | 0.50 |
| 2 | ['rejected'] | 0 | 1 | 0.00 |
| 3 | [] (no rows) | 0 | 0 | 0.00 |

## Complexity Analysis
- **Time:** `O(U + C)` where `U` is number of users and `C` is number of confirmation rows (handled by the database engine).
- **Space:** `O(U)` for the result set.

## Follow‑Up Questions
1. How would you modify the query to compute the rate for a specific time window?
2. How can you index the tables to improve performance for large datasets?
3. Extend the problem to handle multiple action types with different weights.

## Key Takeaway
A left join combined with conditional aggregation lets you calculate per‑user rates while gracefully handling users with no activity.
