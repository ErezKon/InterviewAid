# 2651. Calculate Delayed Arrival Time

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-delayed-arrival-time](https://leetcode.com/problems/calculate-delayed-arrival-time)
**Companies:** Google

---

## 1. Problem Description

Given `arrivalTime` (0–23) and `delayedTime` (1–24), return the actual arrival time in 24-hour format.

---

## 2. Approach: Modular Arithmetic — O(1) ✅

```
FUNCTION findDelayedArrivalTime(arrivalTime, delayedTime):
    RETURN (arrivalTime + delayedTime) % 24
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Key Takeaway

> 24-hour clock wrap-around is simply modulo 24.
