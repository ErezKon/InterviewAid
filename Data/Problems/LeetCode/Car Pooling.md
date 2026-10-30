# 1094. Car Pooling

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/car-pooling](https://leetcode.com/problems/car-pooling)
**Companies:** Amazon, Bloomberg, Careem, Flipkart, Goldman Sachs, Google, Infosys, Lyft, Meta, Microsoft, Paytm, Tiktok, Zepto

---

## Problem Description

There is a car with `capacity` empty seats. The vehicle only drives east (i.e., it cannot turn around and drive west).

You are given the integer `capacity` and an array `trips` where `trips[i] = [numPassengers_i, from_i, to_i]` indicates that the `i^th` trip has `numPassengers_i` passengers and the locations to pick them up and drop them off are `from_i` and `to_i` respectively. The locations are given as the number of kilometers due east from the car's initial location.

Passengers are dropped off before new passengers are picked up at the same location. At every point along the route, the total number of passengers in the car must not exceed `capacity`.

Return `true` if it is possible to pick up and drop off all passengers for all the given trips, or `false` otherwise.

**Constraints:**
- `1 <= trips.length <= 1000`
- `trips[i].length == 3`
- `1 <= numPassengers_i <= 100`
- `0 <= from_i < to_i <= 1000`
- `1 <= capacity <= 10^5`

## Examples

**Example 1:**
```
Input: trips = [[2,1,5],[3,3,7]], capacity = 4
Output: false
Explanation: At kilometer 1, 2 passengers are picked up, so the car holds 2.
At kilometer 3, 3 more are picked up, so the car holds 5.
Since 5 > capacity = 4, the trips cannot all be completed.
```

**Example 2:**
```
Input: trips = [[2,1,5],[3,3,7]], capacity = 5
Output: true
Explanation: At kilometer 1, the car holds 2 passengers.
At kilometer 3, the car holds 5 passengers.
At kilometer 5, the first 2 are dropped off, so the car holds 3.
At kilometer 7, the last 3 are dropped off, so the car holds 0.
The maximum occupancy is 5, which never exceeds capacity = 5.
```

## Approach
Use a difference array (line sweep) to record net passenger changes at each location. Increment at `from`, decrement at `to`. Then compute a prefix sum to track current load.

```text
FUNCTION carPooling(trips, capacity):
    SET stops ← ARRAY of size 1001 filled with 0
    FOR [numPassengers, from, to] IN trips:
        SET stops[from] ← stops[from] + numPassengers
        SET stops[to] ← stops[to] - numPassengers
    SET current ← 0
    FOR delta IN stops:
        SET current ← current + delta
        IF current > capacity:
            RETURN false
    RETURN true
```

## Walkthrough
| Location | Change | Current Load |
|----------|--------|--------------|
| 1        | +2     | 2            |
| 3        | +3     | 5            |
| 5        | -2     | 3            |
| 7        | -3     | 0            |
If capacity < 5, the load at location 3 would exceed it.

## Complexity Analysis
- **Time:** O(n + m) where n is number of trips and m is the range of locations (≤1000).
- **Space:** O(m) for the stops array.

## Follow-Up Questions
1. How would you handle a large coordinate range without a fixed-size array?
2. Can the problem be solved using a priority queue instead of a difference array?
3. How to extend to support multiple vehicles with shared capacity?

## Key Takeaway
A difference array converts interval updates into O(1) point changes, allowing a simple linear scan to verify capacity constraints.
