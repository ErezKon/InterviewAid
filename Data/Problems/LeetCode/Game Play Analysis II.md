# 512. Game Play Analysis II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/game-play-analysis-ii](https://leetcode.com/problems/game-play-analysis-ii)
**Companies:** Amazon, Gsn Games

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Subquery with MIN ✅](#2-approach-subquery-with-min-)
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

Write a solution to report the **device** that is first logged in for each player.

Return the result table in **any order**.

The result format is in the following example.

---

## 2. Approach: Subquery with MIN ✅

```sql
SELECT player_id, device_id FROM Activity
WHERE (player_id, event_date) IN
    (SELECT player_id, MIN(event_date) FROM Activity GROUP BY player_id);
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
  +-----------+-----------+
  | player_id | device_id |
  +-----------+-----------+
  | 1         | 2         |
  | 2         | 3         |
  | 3         | 1         |
  +-----------+-----------+
```

---

## 4. Walkthrough

1. Inner subquery groups rows by `player_id` and selects the earliest `event_date` per player.
2. Outer query joins the original `Activity` table on `(player_id, event_date)` matching those earliest dates.
3. Returns `player_id` with the corresponding `device_id` of the first login.

---

## 5. Complexity Analysis

- **Time:** O(n) – scans the table once for grouping and once for join.
- **Space:** O(k) – stores the minimum date for each of the `k` distinct players.

---

## 6. Key Takeaway

> Use a subquery with `MIN(event_date)` per player to filter the first login, then retrieve the associated device.
