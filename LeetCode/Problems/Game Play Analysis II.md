# 512. Game Play Analysis II

**Difficulty:** 🟢 Easy
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

Find the device each player first logged in with. (SQL problem)

---

## 2. Approach: Subquery with MIN ✅

```sql
SELECT player_id, device_id FROM Activity
WHERE (player_id, event_date) IN
    (SELECT player_id, MIN(event_date) FROM Activity GROUP BY player_id);
```

---

## 3. Examples

**Activity Table**
| player_id | device_id | event_date |
|-----------|-----------|------------|
| 1 | 101 | 2020-01-01 |
| 1 | 102 | 2020-01-05 |
| 2 | 201 | 2020-02-10 |
| 2 | 202 | 2020-02-12 |

**Result:**
| player_id | device_id |
|-----------|-----------|
| 1 | 101 |
| 2 | 201 |

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
