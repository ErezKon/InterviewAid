# 1109. Corporate Flight Bookings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/corporate-flight-bookings](https://leetcode.com/problems/corporate-flight-bookings)
**Companies:** Amazon, Goldman Sachs, Google, Meta, Microsoft

---

## Problem Description
There are `n` flights that are labeled from `1` to `n`.

You are given an array of flight bookings `bookings`, where `bookings[i] = [firsti, lasti, seatsi]` represents a booking for flights `firsti` through `lasti` (**inclusive**) with `seatsi` seats reserved for **each flight** in the range.

Return *an array* `answer` *of length* `n`*, where* `answer[i]` *is the total number of seats reserved for flight* `i`.

**Constraints:**
- `1 <= n <= 2 * 10^4`
- `1 <= bookings.length <= 2 * 10^4`
- `bookings[i].length == 3`
- `1 <= firsti <= lasti <= n`
- `1 <= seatsi <= 10^4`

## Examples
```
Example 1:
  Input: bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
  Output: [10,55,45,25,25]
  Explanation:
    Flight labels:        1   2   3   4   5
    Booking 1 reserved:  10  10
    Booking 2 reserved:      20  20
    Booking 3 reserved:      25  25  25  25
    Total seats:         10  55  45  25  25
    Hence, answer = [10,55,45,25,25]
```
```
Example 2:
  Input: bookings = [[1,2,10],[2,2,15]], n = 2
  Output: [10,25]
  Explanation:
    Flight labels:        1   2
    Booking 1 reserved:  10  10
    Booking 2 reserved:      15
    Total seats:         10  25
    Hence, answer = [10,25]
```

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
