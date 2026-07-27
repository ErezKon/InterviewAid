# 550. Game Play Analysis IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/game-play-analysis-iv](https://leetcode.com/problems/game-play-analysis-iv)
**Companies:** Amazon, Bloomberg, Google, Gsn Games, Meta, Microsoft

---

## 1. Problem Description

Find the fraction of players who logged in again the day after their first login. (SQL problem)

## 2. Approach: Self-Join on Day+1 ✅

```sql
SELECT ROUND(
    COUNT(DISTINCT a2.player_id) / COUNT(DISTINCT a1.player_id), 2
) AS fraction
FROM (
    SELECT player_id, MIN(event_date) AS first_login
    FROM Activity
    GROUP BY player_id
) a1
LEFT JOIN Activity a2 ON a1.player_id = a2.player_id
    AND a2.event_date = DATE_ADD(a1.first_login, INTERVAL 1 DAY);
```

## Key Takeaway

> LEFT JOIN on `first_login + 1 day` — count non-null matches over total players for the retention fraction.
