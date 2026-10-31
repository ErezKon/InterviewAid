# 550. Game Play Analysis IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/game-play-analysis-iv](https://leetcode.com/problems/game-play-analysis-iv)
**Companies:** Amazon, Bloomberg, Google, Gsn Games, Meta, Microsoft

---

## 1. Problem Description

Table: `Activity`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| player_id    | int     |
| device_id    | int     |
| event_date   | date    |
| games_played | int     |
+--------------+---------+
(player_id, event_date) is the primary key (combination of columns with unique values) of this table.
This table shows the activity of players of some games.
Each row is a record of a player who logged in and played a number of games (possibly 0) before logging out on someday using some device.
```

Write a solution to report the **fraction** of players that logged in again on the day after the day they first logged in, **rounded to 2 decimal places**. In other words, you need to determine the number of players who logged in on the day immediately following their initial login, and divide it by the number of total players.

The result format is in the following example.

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

```
Example 1:
  Input:
  Activity table:
  +-----------+-----------+------------+--------------+
  | player_id | device_id | event_date | games_played |
  +-----------+-----------+------------+--------------+
  | 1         | 2         | 2016-03-01 | 5            |
  | 1         | 2         | 2016-03-02 | 6            |
  | 2         | 3         | 2017-06-25 | 1            |
  | 3         | 1         | 2016-03-02 | 0            |
  | 3         | 4         | 2018-07-03 | 5            |
  +-----------+-----------+------------+--------------+
  Output:
  +-----------+
  | fraction  |
  +-----------+
  | 0.33      |
  +-----------+
  Explanation:
  Only the player with id 1 logged back in after the first day he had logged in so the answer is 1/3 = 0.33
```

## 4. Walkthrough

1. **First login per player** – group by `player_id` and take `MIN(event_date)`.
2. **Left-join** the activity table on `player_id` with `event_date = first_login + 1`.
3. **Count** distinct `player_id` that have a matching row (returned players).
4. **Divide** by total distinct players and round to two decimals.

## 5. Complexity Analysis

- **Time:** O(N) – single scans of the `Activity` table and a join on indexed columns.
- **Space:** O(P) – where P is the number of distinct players (temporary aggregation).

## Key Takeaway

> LEFT JOIN on `first_login + 1 day` — count non-null matches over total players for the retention fraction.
