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

## 3. Examples

| player_id | event_date |
|-----------|------------|
| 1         | 2020-01-01 |
| 1         | 2020-01-02 |
| 2         | 2020-01-01 |
| 2         | 2020-01-03 |

**Result:** `0.50` – only player 1 logged in the next day, so fraction = 1/2.

## 4. Walkthrough

1. **First login per player** – group by `player_id` and take `MIN(event_date)`.
2. **Left‑join** the activity table on `player_id` with `event_date = first_login + 1`.
3. **Count** distinct `player_id` that have a matching row (returned players).
4. **Divide** by total distinct players and round to two decimals.

## 5. Complexity Analysis

- **Time:** O(N) – single scans of the `Activity` table and a join on indexed columns.
- **Space:** O(P) – where P is the number of distinct players (temporary aggregation).

## Key Takeaway

> LEFT JOIN on `first_login + 1 day` — count non‑null matches over total players for the retention fraction.
