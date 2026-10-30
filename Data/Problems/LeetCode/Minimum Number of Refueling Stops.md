# 871. Minimum Number of Refueling Stops

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-refueling-stops](https://leetcode.com/problems/minimum-number-of-refueling-stops)
**Companies:** Amazon, Bloomberg, De Shaw, Goldman Sachs, Google, Meta, Microsoft, Waymo

---

## Problem Description

A car travels from a starting position to a destination which is `target` miles east of the starting position.

There are gas stations along the way. The gas stations are represented as an array `stations` where `stations[i] = [position_i, fuel_i]` indicates that the `i^th` gas station is `position_i` miles east of the starting position and has `fuel_i` liters of gas.

The car starts with an infinite tank of gas, which initially has `startFuel` liters of fuel in it. It uses one liter of gas per one mile that it drives. When the car reaches a gas station, it may stop and refuel, transferring all the gas from the station into the car.

Return *the minimum number of refueling stops the car must make in order to reach its destination*. If it cannot reach the destination, return `-1`.

Note that if the car reaches a gas station with `0` fuel left, the car can still refuel there. If the car reaches the destination with `0` fuel left, it is still considered to have arrived.

**Constraints:**
- `1 <= target, startFuel <= 10^9`
- `0 <= stations.length <= 500`
- `1 <= position_i < position_i+1 < target`
- `1 <= fuel_i < 10^9`

## Examples

**Example 1:**
```
Input: target = 1, startFuel = 1, stations = []
Output: 0
Explanation: We can reach the target without refueling.
```

**Example 2:**
```
Input: target = 100, startFuel = 1, stations = [[10,100]]
Output: -1
Explanation: We can not reach the target (or even the first gas station).
```

**Example 3:**
```
Input: target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]
Output: 2
Explanation: We start with 10 liters of fuel.
We drive to position 10, expending 10 liters of fuel.  We refuel from 0 liters to 60 liters of gas.
Then, we drive from position 10 to position 60 (expending 50 liters of fuel),
and refuel from 10 liters to 50 liters of gas.  We then drive to and reach the target.
We made 2 refueling stops along the way, so we return 2.
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
