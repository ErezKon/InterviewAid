# 1454. Active Users

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/active-users](https://leetcode.com/problems/active-users)
**Companies:** Ciena

---

## 1. Problem Description

**SQL Problem.** Given `Accounts` and `Logins` tables, find "active users" — those who logged in on **5 or more consecutive days**.

---

## 2. Approach: Self-Join or Window Functions ✅

```sql
WITH ranked AS (
    SELECT DISTINCT id, login_date,
           login_date - INTERVAL ROW_NUMBER() OVER (PARTITION BY id ORDER BY login_date) DAY AS grp
    FROM Logins
)
SELECT DISTINCT a.id, a.name
FROM ranked r
JOIN Accounts a ON r.id = a.id
GROUP BY r.id, a.name, r.grp
HAVING COUNT(*) >= 5
ORDER BY a.id;
```

**Trick:** Subtract row_number from date — consecutive dates produce the same group value.

---

## Key Takeaway

> The "consecutive days" pattern uses `date - ROW_NUMBER()` to create groups. Consecutive dates yield the same group, non-consecutive dates yield different groups. Then `HAVING COUNT(*) >= k` filters for runs of length k.
