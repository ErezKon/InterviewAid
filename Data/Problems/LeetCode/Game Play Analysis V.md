# 1097. Game Play Analysis V

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/game-play-analysis-v](https://leetcode.com/problems/game-play-analysis-v)
**Companies:** Gsn Games

---

## 1. Problem Description

For each install date, report the number of players installed and day‑1 retention rate. (SQL problem)

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

## 3. Examples

| install_dt | installs | Day1_retention |
|------------|----------|----------------|
| 2020‑01‑01 | 100      | 0.45 |
| 2020‑01‑02 | 80       | 0.50 |

**Explanation:** For each install date we count total installs and how many of those players logged in the next day, then compute the ratio.

## 4. Walkthrough

1. **First login per player** – `first_login` CTE groups by `player_id` and selects the earliest `event_date` as `install_dt`.
2. **Left join** the `Activity` table on `player_id` where `event_date = install_dt + 1` to find day‑1 activity.
3. **Aggregate** by `install_dt` counting total installs and day‑1 matches.
4. **Compute retention** as `COUNT(day1) / COUNT(installs)` and round.

## 5. Complexity Analysis

- **Time:** O(N) – single pass to compute first login and a join on indexed columns.
- **Space:** O(P) – temporary storage for distinct players.

## Key Takeaway

> Group by install date, LEFT JOIN on day+1 to compute retention. Classic cohort analysis in SQL.
