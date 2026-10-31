# 2332. The Latest Time to Catch a Bus

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-latest-time-to-catch-a-bus](https://leetcode.com/problems/the-latest-time-to-catch-a-bus)
**Companies:** Google, Meta, Microsoft
---

## Problem Description
You are given a **0-indexed** integer array `buses` of length `n`, where `buses[i]` represents the departure time of the `i`-th bus. You are also given a **0-indexed** integer array `passengers` of length `m`, where `passengers[j]` represents the arrival time of the `j`-th passenger. All bus departure times are unique. All passenger arrival times are unique.

You are given an integer `capacity`, which represents the **maximum** number of passengers that can get on each bus.

When a passenger arrives, they will wait in line for the next available bus. You can get on a bus that departs at `x` minutes if you arrive at `y` minutes where `y <= x`, and the bus is not full. Passengers with the **earliest** arrival times get on the bus first.

More formally when a bus arrives, either:

- If `capacity` or fewer passengers are waiting for a bus, they will **all** get on the bus, or
- The `capacity` passengers with the **earliest** arrival times will get on the bus.

Return *the latest time you may arrive at the bus station to catch a bus*. You **cannot** arrive at the same time as another passenger.

**Note:** The arrays `buses` and `passengers` are not necessarily sorted.

**Constraints:**
- `n == buses.length`
- `m == passengers.length`
- `1 <= n, m, capacity <= 10^5`
- `2 <= buses[i], passengers[i] <= 10^9`
- Each element in `buses` is **unique**.
- Each element in `passengers` is **unique**.

## Examples
```
Example 1:
  Input: buses = [10,20], passengers = [2,17,18,19], capacity = 2
  Output: 16
  Explanation: Suppose you arrive at time 16.
  At time 10, the first bus departs with the 0th passenger.
  At time 20, the second bus departs with you and the 1st passenger.
  Note that you may not arrive at the same time as another passenger, which is why you must arrive
  before the 1st passenger to catch the bus.
```
```
Example 2:
  Input: buses = [20,30,10], passengers = [19,13,26,4,25,11,21], capacity = 2
  Output: 20
  Explanation: Suppose you arrive at time 20.
  At time 10, the first bus departs with the 3rd passenger.
  At time 20, the second bus departs with the 5th and 1st passengers.
  At time 30, the third bus departs with the 0th passenger and you.
  Notice if you had arrived any later, then the 6th passenger would have taken your seat on the third bus.
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

## Follow-Up Questions
1. How would you modify the algorithm if passengers could board at the exact bus departure time?
2. Can the solution be adapted to handle multiple new passengers arriving simultaneously?
3. What changes are needed if each bus has a different capacity?

## Key Takeaway
Greedy boarding of earliest possible passengers combined with a backward scan yields the latest feasible arrival time.
