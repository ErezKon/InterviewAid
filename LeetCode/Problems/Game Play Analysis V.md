# 1097. Game Play Analysis V

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/game-play-analysis-v](https://leetcode.com/problems/game-play-analysis-v)
**Companies:** Gsn Games

---

## 1. Problem Description

For each install date, report the number of players installed and day-1 retention rate. (SQL problem)

## 2. Approach: First Login + Left Join ✅

```sql
WITH first_login AS (
    SELECT player_id, MIN(event_date) AS install_dt
    FROM Activity GROUP BY player_id
)
SELECT f.install_dt,
       COUNT(f.player_id) AS installs,
       ROUND(COUNT(a.player_id) / COUNT(f.player_id), 2) AS Day1_retention
FROM first_login f
LEFT JOIN Activity a ON f.player_id = a.player_id
    AND a.event_date = DATE_ADD(f.install_dt, INTERVAL 1 DAY)
GROUP BY f.install_dt;
```

## Key Takeaway

> Group by install date, LEFT JOIN on day+1 to compute retention. Classic cohort analysis in SQL.
