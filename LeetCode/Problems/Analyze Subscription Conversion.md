# 3497. Analyze Subscription Conversion

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/analyze-subscription-conversion](https://leetcode.com/problems/analyze-subscription-conversion)
**Companies:** Bloomberg

---

## 1. Problem Description

**SQL Problem.** Given a `UserActivity` table tracking user actions (`trial_start`, `trial_end`, `subscribe_date`, `cancel_date`), compute subscription conversion rates and average trial durations for each cohort.

---

## 2. Approach: SQL Aggregation ✅

```sql
SELECT activity_type,
       COUNT(DISTINCT CASE WHEN subscribe_date IS NOT NULL THEN user_id END) AS conversions,
       COUNT(DISTINCT user_id) AS total_users,
       ROUND(100.0 * COUNT(DISTINCT CASE WHEN subscribe_date IS NOT NULL THEN user_id END) /
             COUNT(DISTINCT user_id), 2) AS conversion_rate,
       ROUND(AVG(DATEDIFF(trial_end, trial_start)), 2) AS avg_trial_duration
FROM UserActivity
GROUP BY activity_type;
```

---

## Key Takeaway

> Standard conversion funnel analysis in SQL. Use conditional `COUNT(DISTINCT CASE WHEN ...)` for filtered aggregation, `DATEDIFF` for duration, and `ROUND` for formatting.
