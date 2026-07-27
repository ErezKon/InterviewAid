# 871. Minimum Number of Refueling Stops

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-refueling-stops](https://leetcode.com/problems/minimum-number-of-refueling-stops)
**Companies:** Amazon, Bloomberg, De Shaw, Goldman Sachs, Google, Meta, Microsoft, Waymo

---

## Approach: Greedy + Max-Heap — O(n log n) ✅

```
FUNCTION minRefuelStops(target, startFuel, stations):
    heap = MaxHeap()
    fuel = startFuel
    stops = 0
    i = 0

    WHILE fuel < target:
        WHILE i < len(stations) AND stations[i][0] <= fuel:
            heap.PUSH(stations[i][1])
            i += 1

        IF heap is empty: RETURN -1

        fuel += heap.POP()    // refuel at the station with most fuel
        stops += 1

    RETURN stops
```

Greedily collect all reachable stations, then refuel at the one with the most fuel when we run out.
