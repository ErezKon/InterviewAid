# 1396. Design Underground System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-underground-system](https://leetcode.com/problems/design-underground-system)
**Companies:** Amazon, Axon, Bloomberg, Goldman Sachs, Google, Mercari, Rippling

---

## Problem Description

Design an underground system that supports three operations: `checkIn(id, stationName, t)` records a passenger's check‑in at a station at time `t`; `checkOut(id, stationName, t)` records the passenger's check‑out; and `getAverageTime(startStation, endStation)` returns the average travel time between two stations based on all completed trips.

---

## Approach

```
CLASS UndergroundSystem:
    CONSTRUCTOR:
        checkIns = {}     // id → (station, time)
        trips = {}        // (start, end) → (totalTime, count)

    FUNCTION checkIn(id, stationName, t):
        checkIns[id] = (stationName, t)

    FUNCTION checkOut(id, stationName, t):
        startStation, startTime = checkIns.POP(id)
        key = (startStation, stationName)
        IF key NOT IN trips: trips[key] = (0, 0)
        trips[key] = (trips[key][0] + t - startTime, trips[key][1] + 1)

    FUNCTION getAverageTime(startStation, endStation):
        total, count = trips[(startStation, endStation)]
        RETURN total / count
```

---

## Examples

| Operation | Input | Output | Explanation |
|---|---|---|---|
| `checkIn(45, "Leyton", 3)` | — | — | Passenger 45 checks in at Leyton at time 3 |
| `checkOut(45, "Waterloo", 15)` | — | — | Completes trip; travel time = 12 |
| `getAverageTime("Leyton", "Waterloo")` | — | 12.0 | Only one trip recorded, average is 12 |
| `checkIn(32, "Leyton", 10)` | — | — | New passenger checks in |
| `checkOut(32, "Waterloo", 20)` | — | — | Travel time = 10 |
| `getAverageTime("Leyton", "Waterloo")` | — | 11.0 | Average of 12 and 10 |

---

## Walkthrough

1. **checkIn** stores `("Leyton", 3)` in `checkIns[45]`.
2. **checkOut** retrieves the start info, computes `duration = 15‑3 = 12`, updates `trips[("Leyton","Waterloo")]` to `(12,1)`.
3. **getAverageTime** reads `(12,1)` and returns `12/1 = 12`.
4. A second trip updates the aggregate to `(22,2)`, so the average becomes `22/2 = 11`.

---

## Complexity Analysis

| Operation | Time | Space |
|---|---|---|
| `checkIn` | O(1) | — |
| `checkOut` | O(1) | — |
| `getAverageTime` | O(1) | — |
| Overall | — | O(n + s²) where *n* = number of passengers, *s* = stations |

---

## Key Takeaway

> Use two hash maps: one for active check‑ins and another for aggregated trip statistics. This enables constant‑time updates and average‑time queries.
