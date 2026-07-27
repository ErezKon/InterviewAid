# 534. Game Play Analysis III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/game-play-analysis-iii](https://leetcode.com/problems/game-play-analysis-iii)
**Companies:** Gsn Games

---

## 1. Problem Description

For each player, report the running total of games played up to each date. (SQL problem)

## 2. Approach: Window Function ✅

```sql
SELECT player_id, event_date,
       SUM(games_played) OVER (PARTITION BY player_id ORDER BY event_date) AS games_played_so_far
FROM Activity;
```

## Key Takeaway

> Use `SUM() OVER (PARTITION BY ... ORDER BY ...)` for running totals.
