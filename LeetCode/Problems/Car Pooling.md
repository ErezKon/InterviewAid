# 1094. Car Pooling

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/car-pooling](https://leetcode.com/problems/car-pooling)
**Companies:** Amazon, Bloomberg, Careem, Flipkart, Goldman Sachs, Google, Infosys, Lyft, Meta, Microsoft, Paytm, Tiktok, Zepto

---

## Approach: Difference Array / Line Sweep — O(n + max_stop) ✅

```
FUNCTION carPooling(trips, capacity):
    stops = [0] * 1001

    FOR [numPassengers, from, to] IN trips:
        stops[from] += numPassengers
        stops[to] -= numPassengers

    current = 0
    FOR passengers IN stops:
        current += passengers
        IF current > capacity: RETURN false

    RETURN true
```

Difference array: add passengers at pickup, remove at dropoff. Prefix sum gives current load.
