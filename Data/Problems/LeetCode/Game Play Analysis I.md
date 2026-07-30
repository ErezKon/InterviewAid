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

Find the first login date for each player. (SQL problem)

---

## 2. Approach: GROUP BY + MIN ✅

```sql
SELECT player_id, MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;
```

---

## 3. Examples

| player_id | event_date |
|-----------|------------|
| 1 | 2020-01-01 |
| 1 | 2020-01-05 |
| 2 | 2020-02-10 |
| 2 | 2020-02-12 |

**Result:**
| player_id | first_login |
|-----------|-------------|
| 1 | 2020-01-01 |
| 2 | 2020-02-10 |

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
