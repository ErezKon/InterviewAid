# 511. Game Play Analysis I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/game-play-analysis-i](https://leetcode.com/problems/game-play-analysis-i)
**Companies:** Amazon, Bloomberg, Google, Gsn Games, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: GROUP BY + MIN ✅](#2-approach-group-by--min-)
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
(player_id, event_date) is the primary key (combination of columns with unique values) of this table.
This table shows the activity of players of some games.
Each row is a record of a player who logged in and played a number of games (possibly 0) before logging out on someday using some device.
```

Write a solution to find the **first login date** for each player.

Return the result table in **any order**.

The result format is in the following example.

---

## 2. Approach: GROUP BY + MIN ✅

```sql
SELECT player_id, MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;
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
  | 2         | 3         | 2017-06-25 | 1            |
  | 3         | 1         | 2016-03-02 | 0            |
  | 3         | 4         | 2018-07-03 | 5            |
  +-----------+-----------+------------+--------------+
  Output:
  +-----------+-------------+
  | player_id | first_login |
  +-----------+-------------+
  | 1         | 2016-03-01  |
  | 2         | 2017-06-25  |
  | 3         | 2016-03-02  |
  +-----------+-------------+
```

---

## 4. Walkthrough

1. Group rows by `player_id`.
2. For each group, compute `MIN(event_date)` to get the earliest login.
3. Return `player_id` with its `first_login`.

---

## 5. Complexity Analysis

- **Time:** O(n) – scans the table once.
- **Space:** O(k) – stores aggregated result for `k` distinct players.

---

## 6. Key Takeaway

> Simple `MIN` aggregation grouped by player.
