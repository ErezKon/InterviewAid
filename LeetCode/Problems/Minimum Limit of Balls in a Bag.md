# 1760. Minimum Limit of Balls in a Bag

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag](https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag)
**Companies:** Amazon, Bloomberg, Flipkart, Google, Intuit, Meta, Microsoft, Porter

---

## Problem Description

Given bags of balls, you can split any bag into two. After at most `maxOperations` splits, minimize the **maximum** bag size.

## Key Insight

> Binary search on the answer (max bag size). For a target max `mid`, each bag of size `num` needs `ceil(num/mid) - 1` = `(num-1)/mid` splits. Check if total splits ≤ `maxOperations`.

## Approach: Binary Search on Answer — O(n log max) ✅

```
FUNCTION minimumSize(nums, maxOperations):
    lo, hi = 1, MAX(nums)

    WHILE lo < hi:
        mid = (lo + hi) / 2
        ops = SUM((num - 1) / mid for num in nums)
        IF ops <= maxOperations:
            hi = mid
        ELSE:
            lo = mid + 1

    RETURN lo
```

| Time | Space |
|------|-------|
| O(n log max) | O(1) |

## Key Takeaway

> Classic "binary search on answer" — the feasibility check (can we achieve max size `mid` within `k` operations?) is monotonic and O(n) per check.
