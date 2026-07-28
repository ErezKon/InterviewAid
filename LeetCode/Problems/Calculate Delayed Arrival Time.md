# 2651. Calculate Delayed Arrival Time

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-delayed-arrival-time](https://leetcode.com/problems/calculate-delayed-arrival-time)
**Companies:** Google

---

## 1. Problem Description

Given `arrivalTime` (0–23) and `delayedTime` (1–24), return the actual arrival time in 24-hour format.

---

## Examples

| arrivalTime | delayedTime | output |
|-------------|-------------|--------|
| 23          | 2           | 1 |
| 0           | 24          | 0 |
| 12          | 5           | 17 |

*Explanation:* The time wraps around after 23, so `(23 + 2) % 24 = 1`.

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

- **Time:** O(1) – constant‑time arithmetic.
- **Space:** O(1) – only a few scalar variables.

---

## Follow-Up Questions

1. How would you handle minutes in addition to hours?
2. What if the time zone offsets could be negative?
3. Extend the solution to support a 12‑hour clock with AM/PM.

---

## Key Takeaway

> 24‑hour clock wrap‑around is simply modulo 24.
