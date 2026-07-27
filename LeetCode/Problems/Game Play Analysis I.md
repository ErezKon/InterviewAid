# 511. Game Play Analysis I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/game-play-analysis-i](https://leetcode.com/problems/game-play-analysis-i)
**Companies:** Amazon, Bloomberg, Google, Gsn Games, Meta, Microsoft

---

## 1. Problem Description

Find the first login date for each player. (SQL problem)

## 2. Approach: GROUP BY + MIN ✅

```sql
SELECT player_id, MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;
```

## Key Takeaway

> Simple `MIN` aggregation grouped by player.
