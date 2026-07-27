# 1107. New Users Daily Count

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/new-users-daily-count](https://leetcode.com/problems/new-users-daily-count)
**Companies:** Linkedin

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Solution: SQL](#3-solution-sql)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Report the number of new users who logged in for the first time each day within the last 90 days.

---

## 2. Key Insight

> Find each user's first login date with `MIN(activity_date)`. Filter to last 90 days and count per day.

---

## 3. Solution: SQL ✅

```sql
SELECT login_date, COUNT(*) AS user_count
FROM (
    SELECT user_id, MIN(activity_date) AS login_date
    FROM Traffic
    WHERE activity = 'login'
    GROUP BY user_id
) first_login
WHERE login_date >= DATE_SUB('2019-06-30', INTERVAL 90 DAY)
GROUP BY login_date;
```

---

## 4. Key Takeaway

> **Subquery for first event + outer filter and count.** `MIN(date)` per user gives first login, then group by date for daily counts.
