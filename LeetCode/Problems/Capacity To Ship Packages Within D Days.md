# 1011. Capacity To Ship Packages Within D Days

**Difficulty:** 🟡 Medium
**Acceptance:** 69.0%
**LeetCode:** [https://leetcode.com/problems/capacity-to-ship-packages-within-d-days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days)
**Companies:** Agoda, Amazon, Apolloio, Apple, Bloomberg, Chalo, Dp World, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Mindtickle, Myntra, Oracle, Spinny, Tiktok, Uber, Visa, Walmart Labs, Zeta

---

## Approach: Binary Search on Answer — O(n log S) ✅

```
FUNCTION shipWithinDays(weights, days):
    lo = MAX(weights)           // must fit the heaviest package
    hi = SUM(weights)           // ship everything in one day

    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF canShip(weights, days, mid):
            hi = mid
        ELSE:
            lo = mid + 1

    RETURN lo

FUNCTION canShip(weights, days, capacity):
    daysNeeded = 1
    currentLoad = 0
    FOR w IN weights:
        IF currentLoad + w > capacity:
            daysNeeded += 1
            currentLoad = 0
        currentLoad += w
    RETURN daysNeeded <= days
```

Same "binary search on answer" pattern as Koko Eating Bananas.
