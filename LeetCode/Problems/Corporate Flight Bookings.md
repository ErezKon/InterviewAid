# 1109. Corporate Flight Bookings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/corporate-flight-bookings](https://leetcode.com/problems/corporate-flight-bookings)
**Companies:** Amazon, Goldman Sachs, Google, Meta, Microsoft

---

## Approach: Difference Array — O(n) ✅

```
FUNCTION corpFlightBookings(bookings, n):
    diff = [0] * (n + 1)
    FOR [first, last, seats] IN bookings:
        diff[first - 1] += seats
        IF last < n: diff[last] -= seats

    // Prefix sum
    FOR i ← 1 TO n - 1:
        diff[i] += diff[i - 1]

    RETURN diff[:n]
```
