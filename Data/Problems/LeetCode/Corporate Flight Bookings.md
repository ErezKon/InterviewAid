# 1109. Corporate Flight Bookings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/corporate-flight-bookings](https://leetcode.com/problems/corporate-flight-bookings)
**Companies:** Amazon, Goldman Sachs, Google, Meta, Microsoft

---

## Problem Description
There are `n` flights labeled from `1` to `n`. You are given a list of bookings where each booking is `[first, last, seats]`, meaning `seats` seats were booked on every flight from `first` to `last` inclusive. Return an array `answer` of length `n` where `answer[i]` is the total number of seats booked on flight `i+1`.

## Examples
- Input: `bookings = [[1,2,10],[2,3,20]], n = 3` → Output: `[10,30,20]`
- Input: `bookings = [[1,1,5],[2,2,10],[3,3,15]], n = 3` → Output: `[5,10,15]`
These illustrate how each range update adds seats to the affected flights.

## Approach
Use a difference array to perform range updates in O(1) per booking, then compute the prefix sum to obtain final seat counts.

```text
FUNCTION CorporateFlightBookings(bookings, n):
    SET diff ← ARRAY of zeros size n+1
    FOR EACH [first, last, seats] IN bookings:
        SET diff[first-1] ← diff[first-1] + seats
        IF last < n:
            SET diff[last] ← diff[last] - seats
    // Convert difference array to actual seat counts
    FOR i ← 1 TO n-1:
        SET diff[i] ← diff[i] + diff[i-1]
    RETURN SUBARRAY(diff, 0, n)
```

## Walkthrough
Consider `bookings = [[1,2,10],[2,3,20]]`, `n = 3`.
| Step | diff array after update | Explanation |
|------|--------------------------|-------------|
| Init | `[0,0,0,0]` | size `n+1` |
| Booking 1 | `[10,0,-10,0]` | add 10 at index 0, subtract at index 2 |
| Booking 2 | `[10,20,-10,-20]` | add 20 at index 1, subtract at index 3 |
| Prefix sum | `[10,30,20]` | cumulative addition yields final seats |

## Complexity Analysis
- **Time:** O(n + m) where `m` is number of bookings.
- **Space:** O(n) for the difference array.

## Follow-Up Questions
- How would you handle queries that ask for the total seats booked in a specific flight range after all bookings?
- Can the method be extended to support dynamic updates (add/remove bookings) efficiently?
- What if the number of flights `n` is extremely large (e.g., 10⁹) but bookings are sparse?

## Key Takeaway
A difference array turns range‑addition updates into constant‑time operations, and a single prefix‑sum pass yields the final values.
