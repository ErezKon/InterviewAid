# 3824. Minimum K to Reduce Array Within Limit

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-k-to-reduce-array-within-limit](https://leetcode.com/problems/minimum-k-to-reduce-array-within-limit)
**Companies:** Google

---

## Problem Description

Find the minimum `k` such that repeatedly dividing each element by `k` (or reducing by `k`) brings the entire array within a given limit.

## Key Insight

> Binary search on `k`. For each candidate `k`, simulate the reduction and check if the result meets the limit constraint.

## Approach: Binary Search — O(n log M) ✅

```
FUNCTION minimumK(nums, limit):
    lo ← 1; hi ← MAX(nums)
    WHILE lo < hi:
        mid ← (lo + hi) / 2
        IF canReduce(nums, mid, limit):
            hi ← mid
        ELSE:
            lo ← mid + 1
    RETURN lo
```

| Time | Space |
|------|-------|
| O(n log M) | O(1) |

## Key Takeaway

> When finding the minimum parameter that satisfies a monotonic constraint, **binary search** on the parameter value — verify each candidate in O(n).
