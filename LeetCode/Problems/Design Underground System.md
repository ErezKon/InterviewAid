# 1396. Design Underground System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-underground-system](https://leetcode.com/problems/design-underground-system)
**Companies:** Amazon, Axon, Bloomberg, Goldman Sachs, Google, Mercari, Rippling

---

## Problem Description

Design an underground system: `checkIn(id, station, t)`, `checkOut(id, station, t)`, `getAverageTime(start, end)` returns average travel time between two stations.

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

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) all operations |
| **Space** | O(n + s²) where s = stations |

---

## Key Takeaway

> **Two maps: active check-ins (id → station+time) and trip aggregates ((start,end) → total+count). On checkout, pop check-in and accumulate trip stats. Average = total/count.**
