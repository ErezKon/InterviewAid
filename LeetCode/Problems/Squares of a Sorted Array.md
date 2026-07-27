# 977. Squares of a Sorted Array

**Difficulty:** 🟢 Easy
**Acceptance:** 72.0%
**LeetCode:** [https://leetcode.com/problems/squares-of-a-sorted-array](https://leetcode.com/problems/squares-of-a-sorted-array)
**Companies:** Accenture, Adobe, Agoda, Amazon, Bloomberg, Crowdstrike, Deutsche Bank, Google, Infosys, Instacart, Meta, Microsoft, Ozon, Tcs, Uber, Whatnot, Yandex

---

## Approach: Two Pointers — O(n) ✅

Squares of negative numbers are sorted in reverse. Merge from both ends.

```
FUNCTION sortedSquares(nums):
    n = len(nums)
    result = [0] * n
    lo, hi = 0, n - 1

    FOR i ← n - 1 DOWN TO 0:
        IF ABS(nums[lo]) > ABS(nums[hi]):
            result[i] = nums[lo] * nums[lo]
            lo += 1
        ELSE:
            result[i] = nums[hi] * nums[hi]
            hi -= 1

    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(n) |
