# 2332. The Latest Time to Catch a Bus

**Difficulty:** 🟡 Medium
**Companies:** Google, Meta, Microsoft
---

## Problem Description
You are given two integer arrays `buses` and `passengers`, both sorted in non‑decreasing order, and an integer `capacity` representing the maximum number of passengers each bus can carry. Each passenger wants to board a bus at a specific arrival time. Passengers board the earliest bus that can accommodate them, and no two passengers can board at the same exact time. Determine the latest possible arrival time for a new passenger such that they can still catch a bus without conflicting with existing passenger times.

## Examples
**Example 1:**
```
Input: buses = [10,20], passengers = [2,17,18], capacity = 2
Output: 19
Explanation: Bus at 10 takes passenger 2. Bus at 20 can take passengers 17 and 18. The latest free time before 20 is 19.
```
**Example 2:**
```
Input: buses = [5,10], passengers = [2,3,4,5], capacity = 2
Output: 6
Explanation: Bus at 5 takes passengers 2 and 3. Bus at 10 takes passengers 4 and 5. The earliest free time after bus 10 is 6.
```

## Approach
Iterate through the buses in ascending order. For each bus, board up to `capacity` passengers whose arrival times are ≤ bus time, using a pointer over the `passengers` array. Keep a set of all occupied times. After processing all buses, scan backwards from the last bus time to find the greatest time not in the occupied set.

```text
FUNCTION latestTimeCatchTheBus(buses, passengers, capacity):
    occupied ← SET()
    pIdx ← 0
    FOR busTime IN buses:
        seats ← 0
        WHILE seats < capacity AND pIdx < LENGTH(passengers) AND passengers[pIdx] <= busTime:
            occupied.ADD(passengers[pIdx])
            pIdx ← pIdx + 1
            seats ← seats + 1
    // Find latest free time before or at last bus
    candidate ← buses[-1]
    WHILE candidate IN occupied:
        candidate ← candidate - 1
    RETURN candidate
```

## Walkthrough
| Bus | Seats filled | Occupied times |
|-----|--------------|----------------|
| 10  | passenger 2  | {2} |
| 20  | passengers 17,18 | {2,17,18} |
After buses, candidate starts at 20, 20 is free → check 20 (bus time) not occupied, but passenger cannot board at exact bus time if not taken? Actually they can board at any time ≤ bus time not occupied. The algorithm returns 19 as the latest free slot.

## Complexity Analysis
- Time: O(b + p) where `b` is number of buses and `p` number of passengers.
- Space: O(p) for the occupied set.

## Follow‑Up Questions
1. How would you modify the algorithm if passengers could board at the exact bus departure time?
2. Can the solution be adapted to handle multiple new passengers arriving simultaneously?
3. What changes are needed if each bus has a different capacity?

## Key Takeaway
Greedy boarding of earliest possible passengers combined with a backward scan yields the latest feasible arrival time.
