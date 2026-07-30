# 1094. Car Pooling

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/car-pooling](https://leetcode.com/problems/car-pooling)
**Companies:** Amazon, Bloomberg, Careem, Flipkart, Goldman Sachs, Google, Infosys, Lyft, Meta, Microsoft, Paytm, Tiktok, Zepto

---

## Problem Description
Given a list of trips `[[numPassengers, from, to], ...]` and a vehicle capacity, determine if it is possible to pick up and drop off all passengers without exceeding the capacity at any point. `from` and `to` are integer locations on a line, and passengers board at `from` and alight at `to`.

## Examples
**Example 1:**
```
trips = [[2,1,5],[3,3,7]], capacity = 4
Output: false
Explanation: At location 3, 2 passengers from first trip are still in the car and 3 new passengers board, exceeding capacity.
```
**Example 2:**
```
trips = [[2,1,5],[3,3,7]], capacity = 5
Output: true
Explanation: Capacity 5 is sufficient for all pickups.
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
