# 512. Game Play Analysis II

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Gsn Games
---

## 1. Problem Description

Find the device each player first logged in with. (SQL problem)

## 2. Approach: Subquery with MIN ✅

```
SELECT player_id, device_id FROM Activity
WHERE (player_id, event_date) IN
    (SELECT player_id, MIN(event_date) FROM Activity GROUP BY player_id);
```

## Key Takeaway

> Filter to first login date per player using a subquery, then select the device.
