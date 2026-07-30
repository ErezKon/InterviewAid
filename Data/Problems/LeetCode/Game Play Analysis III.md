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

For each player, report the running total of games played up to each date. (SQL problem)

---

## 2. Approach: Window Function ✅

```sql
SELECT player_id, event_date,
       SUM(games_played) OVER (PARTITION BY player_id ORDER BY event_date) AS games_played_so_far
FROM Activity;
```

---

## 3. Examples

**Activity Table**
| player_id | event_date | games_played |
|-----------|------------|--------------|
| 1 | 2020-01-01 | 2 |
| 1 | 2020-01-02 | 3 |
| 2 | 2020-01-01 | 1 |
| 2 | 2020-01-03 | 4 |

**Result**
| player_id | event_date | games_played_so_far |
|-----------|------------|---------------------|
| 1 | 2020-01-01 | 2 |
| 1 | 2020-01-02 | 5 |
| 2 | 2020-01-01 | 1 |
| 2 | 2020-01-03 | 5 |

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
