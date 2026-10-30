# 534. Game Play Analysis III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/game-play-analysis-iii](https://leetcode.com/problems/game-play-analysis-iii)
**Companies:** Gsn Games

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Window Function ✅](#2-approach-window-function-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

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
(player_id, event_date) is the primary key (column with unique values) of this table.
This table shows the activity of players of some games.
Each row is a record of a player who logged in and played a number of games (possibly 0) before logging out on someday using some device.
```

Write a solution to report for each player and date, how many games played **so far** by the player. That is, the total number of games played by the player until that date. Check the example for clarity.

Return the result table in **any order**.

The result format is in the following example.

---

## 2. Approach: Window Function ✅

```sql
SELECT player_id, event_date,
       SUM(games_played) OVER (PARTITION BY player_id ORDER BY event_date) AS games_played_so_far
FROM Activity;
```

---

## 3. Examples

```
Example 1:
  Input:
  Activity table:
  +-----------+-----------+------------+--------------+
  | player_id | device_id | event_date | games_played |
  +-----------+-----------+------------+--------------+
  | 1         | 2         | 2016-03-01 | 5            |
  | 1         | 2         | 2016-05-02 | 6            |
  | 1         | 3         | 2017-06-25 | 1            |
  | 3         | 1         | 2016-03-02 | 0            |
  | 3         | 4         | 2018-07-03 | 5            |
  +-----------+-----------+------------+--------------+
  Output:
  +-----------+------------+---------------------+
  | player_id | event_date | games_played_so_far |
  +-----------+------------+---------------------+
  | 1         | 2016-03-01 | 5                   |
  | 1         | 2016-05-02 | 11                  |
  | 1         | 2017-06-25 | 12                  |
  | 3         | 2016-03-02 | 0                   |
  | 3         | 2018-07-03 | 5                   |
  +-----------+------------+---------------------+
  Explanation:
  For the player with id 1, 5 + 6 = 11 games played by 2016-05-02, and 5 + 6 + 1 = 12 games played by 2017-06-25.
  For the player with id 3, 0 + 5 = 5 games played by 2018-07-03.
  Note that for each player we only care about the days when the player logged in.
```

---

## 4. Walkthrough

1. The `SUM(...) OVER` clause creates a window for each `player_id` ordered by `event_date`.
2. For each row, it adds `games_played` of the current and all previous rows in that window.
3. The query returns the cumulative total (`games_played_so_far`) for every player on each date.

---

## 5. Complexity Analysis

- **Time:** O(n) – each row is processed once by the window function.
- **Space:** O(k) – stores intermediate aggregates for `k` distinct players.

---

## 6. Key Takeaway

> Use `SUM() OVER (PARTITION BY player_id ORDER BY event_date)` to compute running totals per group.
