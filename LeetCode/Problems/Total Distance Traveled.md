# 2739. Total Distance Traveled

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/total-distance-traveled](https://leetcode.com/problems/total-distance-traveled)
**Companies:** Compass, Meta

---

## Problem Description
A car starts with a full tank that can travel `capacity` miles. After each trip, the car refuels to full capacity. Given `capacity` and `numTrips`, compute the total distance the car will travel after completing `numTrips` trips.

## Examples
| capacity | numTrips | Output |
|----------|----------|--------|
| 10 | 3 | 30 |
| 5 | 0 | 0 |
| 7 | 4 | 28 |

## Approach
The car travels `capacity` miles per trip, and the trips are independent. Multiply the two values.

```text
FUNCTION totalDistanceTraveled(capacity, numTrips):
    RETURN capacity * numTrips
```

## Walkthrough
For `capacity = 10`, `numTrips = 3`:
- Trip 1: 10 miles
- Trip 2: 10 miles
- Trip 3: 10 miles
Total = 30 miles.

## Complexity Analysis
*Time*: O(1)
*Space*: O(1)

## Follow‑Up Questions
1. How would the answer change if the car loses 1 mile of range after each refuel due to wear?
2. What if the car can only refuel after every two trips?
3. Can you compute the total distance modulo a large prime for huge `numTrips`?

## Key Takeaway
The total distance is simply the product of capacity and the number of trips.
