# 2651. Calculate Delayed Arrival Time

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-delayed-arrival-time](https://leetcode.com/problems/calculate-delayed-arrival-time)
**Companies:** Google

---

## 1. Problem Description

You are given a positive integer `arrivalTime` denoting the arrival time of a train in hours, and another positive integer `delayedTime` denoting the amount of delay in hours.

Return *the time when the train will arrive at the station.*

Note that the time in this problem is in 24-hours format.

**Constraints:**
- `1 <= arrivaltime < 24`
- `1 <= delayedTime <= 24`

---

## Examples

```
Example 1:
  Input: arrivalTime = 15, delayedTime = 5
  Output: 20
  Explanation: Arrival time of the train was 15:00 hours. It is delayed by 5 hours. Now it will reach at 15+5 = 20 (20:00 hours).
```

```
Example 2:
  Input: arrivalTime = 13, delayedTime = 11
  Output: 0
  Explanation: Arrival time of the train was 13:00 hours. It is delayed by 11 hours. Now it will reach at 13+11=24 (Which is denoted by 00:00 in 24 hours format so return 0).
```

---

## Approach: Modular Arithmetic — O(1) ✅

```text
FUNCTION findDelayedArrivalTime(arrivalTime, delayedTime):
    RETURN (arrivalTime + delayedTime) % 24
```

---

## Walkthrough

Consider `arrivalTime = 23`, `delayedTime = 2`.
1. Sum = 23 + 2 = 25.
2. Apply modulo 24: 25 % 24 = 1.
3. Return 1 as the new arrival time.

---

## Complexity Analysis

- **Time:** O(1) – constant-time arithmetic.
- **Space:** O(1) – only a few scalar variables.

---

## Follow-Up Questions

1. How would you handle minutes in addition to hours?
2. What if the time zone offsets could be negative?
3. Extend the solution to support a 12-hour clock with AM/PM.

---

## Key Takeaway

> 24-hour clock wrap-around is simply modulo 24.
