# 1107. New Users Daily Count

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/new-users-daily-count](https://leetcode.com/problems/new-users-daily-count)
**Companies:** Linkedin

---

## 1. Problem Description

Report the number of new users who logged in for the first time each day within the last 90 days.

---

## Examples

**Example 1:**
```
Input: Traffic table with user login activities
Output: A list of dates with counts of first‑time logins per day for the past 90 days.
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
