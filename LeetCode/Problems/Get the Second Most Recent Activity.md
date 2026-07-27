# 1369. Get the Second Most Recent Activity

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/get-the-second-most-recent-activity](https://leetcode.com/problems/get-the-second-most-recent-activity)
**Companies:** Microsoft

---

## 1. Problem Description

For each user, return the second most recent activity. If they only have one activity, return that one. (SQL problem)

## 2. Approach: Window Function ✅

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

## Key Takeaway

> Use `ROW_NUMBER()` partitioned by user, ordered by date desc. Pick `rn = 2` (second most recent) or `cnt = 1` (only one activity).
