# 853. Car Fleet

**Difficulty:** 🟡 Medium
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/car-fleet](https://leetcode.com/problems/car-fleet)
**Companies:** Amazon, Bloomberg, Bny Mellon, Goldman Sachs, Google, Infosys, Meta, Microsoft, Nutanix, Phonepe, Ripple, Waymo

---

## 1. Problem Description

`n` cars at different positions heading toward a target. Each car has a speed. A car can't pass another — it joins a fleet. Return the number of car fleets arriving at target.

---

## 2. Approach: Sort + Stack — O(n log n) ✅

Sort by position (descending). Calculate arrival time for each car. If a car arrives later than the one ahead, it forms a new fleet.

```
FUNCTION carFleet(target, position, speed):
    pairs = SORT by position descending: [(pos, speed), ...]
    fleets = 0
    prevTime = 0

    FOR (pos, spd) IN pairs:
        time = (target - pos) / spd

        IF time > prevTime:
            fleets += 1
            prevTime = time

    RETURN fleets
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## Key Takeaway

> Sort by position (closest to target first). A car forms a new fleet only if its arrival time exceeds the current fleet's time. Cars that arrive earlier or at the same time merge into the fleet ahead.
