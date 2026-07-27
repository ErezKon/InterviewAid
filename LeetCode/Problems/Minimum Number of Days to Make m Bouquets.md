# 1482. Minimum Number of Days to Make m Bouquets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets](https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets)
**Companies:** Adobe, Amazon, Barclays, Bloomberg, Flipkart, Google, Meta, Microsoft, Phonepe

---

## Approach: Binary Search on Answer — O(n log D) ✅

```
FUNCTION minDays(bloomDay, m, k):
    IF m * k > n: RETURN -1
    lo, hi = MIN(bloomDay), MAX(bloomDay)

    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF canMake(bloomDay, m, k, mid):
            hi = mid
        ELSE:
            lo = mid + 1

    RETURN lo

FUNCTION canMake(bloomDay, m, k, day):
    bouquets = 0
    consecutive = 0
    FOR d IN bloomDay:
        IF d <= day:
            consecutive += 1
            IF consecutive == k:
                bouquets += 1
                consecutive = 0
        ELSE:
            consecutive = 0
    RETURN bouquets >= m
```

Binary search on the day. Check if we can make m bouquets of k consecutive flowers by that day.
