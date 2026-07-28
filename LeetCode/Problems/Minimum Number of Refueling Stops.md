# 871. Minimum Number of Refueling Stops

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-refueling-stops](https://leetcode.com/problems/minimum-number-of-refueling-stops)
**Companies:** Amazon, Bloomberg, De Shaw, Goldman Sachs, Google, Meta, Microsoft, Waymo

---

## Problem Description
You are driving a car from position `0` to a destination `target` miles away. Initially you have `startFuel` gallons. Along the way there are `stations`, each represented as `[position, fuel]`. When you reach a station you may stop and refuel any amount of its fuel. Determine the minimum number of refueling stops required to reach the destination. If it is impossible, return `-1`.

## Examples
**Example 1:**
```
target = 1, startFuel = 1, stations = []
Output: 0
Explanation: You can reach the target without refueling.
```
**Example 2:**
```
target = 100, startFuel = 10,
stations = [[10,60],[20,30],[30,30],[60,40]]
Output: 2
Explanation: Refuel at 10 (gain 60) then at 60 (gain 40).
```

## Approach
Greedy + Max‑Heap. Collect all stations reachable with current fuel, push their fuel amounts into a max‑heap, and when you cannot move further, pop the largest fuel to refuel. Repeat until you reach the target.

```text
FUNCTION minRefuelStops(target, startFuel, stations):
    SET heap ← MaxHeap()
    SET fuel ← startFuel
    SET stops ← 0
    SET i ← 0
    WHILE fuel < target:
        WHILE i < LENGTH(stations) AND stations[i][0] ≤ fuel:
            heap.PUSH(stations[i][1])
            i ← i + 1
        IF heap is empty: RETURN -1
        fuel ← fuel + heap.POP()
        stops ← stops + 1
    RETURN stops
```

## Walkthrough
| Step | Fuel before | Reachable stations | Heap contents | Action |
|------|-------------|--------------------|---------------|--------|
| 1 | 10 | [10,60] | [60] | No refuel needed yet |
| 2 | 10 (cannot move) | push 60, pop 60 | [] | Refuel +60 → fuel=70, stops=1 |
| 3 | 70 | stations at 20,30,60 added (30,30,40) | [40,30,30] | Continue moving |
| 4 | 70 → target 100 reachable | pop 40 | [] | Refuel +40 → fuel=110, stops=2 |
| 5 | fuel ≥ target | stop |

## Complexity Analysis
- Time: `O(n log n)` where `n` is the number of stations (each station is pushed/popped at most once).
- Space: `O(n)` for the heap.

## Follow‑Up Questions
1. How would the solution change if you could only refuel at most `k` stations?
2. What if stations could be visited multiple times?
3. Can you adapt the algorithm for a circular route?

## Key Takeaway
Greedy selection of the largest available fuel via a max‑heap ensures the minimum number of stops.
