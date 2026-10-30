# 1107. New Users Daily Count

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/new-users-daily-count](https://leetcode.com/problems/new-users-daily-count)
**Companies:** Linkedin

---

## 1. Problem Description

Table: `Traffic`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user_id       | int     |
| activity      | enum    |
| activity_date | date    |
+---------------+---------+
This table may have duplicate rows.
The activity column is an ENUM (category) type of ('login', 'logout', 'jobs', 'groups', 'homepage').
```

Write a solution to reports for every date within at most `90` days from today, the number of users that logged in for the first time on that date. Assume today is `2019-06-30`.

Return the result table in **any order**.

The result format is in the following example.

---

## Examples

```
Example 1:
  Input:
  Traffic table:
  +---------+----------+---------------+
  | user_id | activity | activity_date |
  +---------+----------+---------------+
  | 1       | login    | 2019-05-01    |
  | 1       | homepage | 2019-05-01    |
  | 1       | logout   | 2019-05-01    |
  | 2       | login    | 2019-06-21    |
  | 2       | logout   | 2019-06-21    |
  | 3       | login    | 2019-01-01    |
  | 3       | jobs     | 2019-01-01    |
  | 3       | logout   | 2019-01-01    |
  | 4       | login    | 2019-06-21    |
  | 4       | groups   | 2019-06-21    |
  | 4       | logout   | 2019-06-21    |
  | 5       | login    | 2019-03-01    |
  | 5       | logout   | 2019-03-01    |
  | 5       | login    | 2019-06-21    |
  | 5       | logout   | 2019-06-21    |
  +---------+----------+---------------+
  Output:
  +------------+-------------+
  | login_date | user_count  |
  +------------+-------------+
  | 2019-05-01 | 1           |
  | 2019-06-21 | 2           |
  +------------+-------------+
  Explanation:
  Note that we only care about dates with non zero user count.
  The user with id 5 first logged in on 2019-03-01 so he's not counted on 2019-06-21.
```

---

## Approach: SQL Subquery with MIN() — O(N) ✅

```text
-- Find each user's first login date and count per day
SELECT first_login_date AS login_date, COUNT(*) AS user_count
FROM (
    SELECT user_id, MIN(activity_date) AS first_login_date
    FROM Traffic
    WHERE activity = 'login'
    GROUP BY user_id
) AS first_login
WHERE first_login_date >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY)
GROUP BY first_login_date
ORDER BY first_login_date;
```

---

## Walkthrough

| Step | Action |
|------|--------|
| 1 | Filter `Traffic` for `activity = 'login'`.
| 2 | Group by `user_id` and compute `MIN(activity_date)` → first login per user.
| 3 | Filter those dates to the last 90 days.
| 4 | Group by the resulting date to count users per day.
| 5 | Return ordered list of `(login_date, user_count)`.

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(N) – single pass over activity records |
| **Space** | O(U) – one entry per distinct user |

---

## Follow-Up Questions

1. How would you modify the query to handle multiple activity types (e.g., sign‑up vs. login)?
2. Can you write a version that works on a streaming data source?
3. How would you index the table for optimal performance?

---

## Key Takeaway

> Use a subquery to compute each user's first event with `MIN()`, then aggregate by date to get daily new‑user counts.
