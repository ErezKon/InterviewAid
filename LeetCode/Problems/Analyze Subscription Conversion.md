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

## 3. Examples

| activity_type | conversions | total_users | conversion_rate | avg_trial_duration |
|---------------|-------------|-------------|-----------------|---------------------|
| "email"      | 120         | 500         | 24.00           | 7.5                 |
| "ad"         | 80          | 400         | 20.00           | 6.2                 |

*Explanation*: For the "email" cohort, 120 of 500 users eventually subscribed, giving a 24% conversion rate, and the average trial lasted 7.5 days.

---

## 4. Walkthrough

1. **Group by cohort** – `activity_type` distinguishes different acquisition channels.
2. **Count conversions** – `COUNT(DISTINCT CASE WHEN subscribe_date IS NOT NULL THEN user_id END)` counts unique users who have a non‑null `subscribe_date`.
3. **Total users** – `COUNT(DISTINCT user_id)` gives the size of the cohort.
4. **Conversion rate** – Compute the percentage of converters over total users.
5. **Average trial** – `DATEDIFF(trial_end, trial_start)` yields the trial length per user; `AVG` aggregates it per cohort.

---

## 5. Complexity Analysis

- **Time**: O(N) – a single scan of the `UserActivity` table, where N is the number of rows.
- **Space**: O(G) – storage for aggregation per distinct `activity_type` (G groups).

---

## Key Takeaway

> Standard conversion funnel analysis in SQL. Use conditional `COUNT(DISTINCT CASE WHEN ...)` for filtered aggregation, `DATEDIFF` for duration, and `ROUND` for formatting.
