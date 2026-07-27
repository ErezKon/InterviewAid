# 442. Find All Duplicates in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-all-duplicates-in-an-array](https://leetcode.com/problems/find-all-duplicates-in-an-array)
**Companies:** Amazon, Bloomberg, Clevertap, Google, Meta, Microsoft, Oracle, Pocket Gems, Tcs, Tiktok, Walmart Labs

---

## Approach: Index Marking — O(n), O(1) ✅

```
FUNCTION findDuplicates(nums):
    result = []
    FOR num IN nums:
        idx = abs(num) - 1
        IF nums[idx] < 0:
            result.ADD(abs(num))
        ELSE:
            nums[idx] = -nums[idx]
    RETURN result
```

Since values are in [1, n], use the sign of `nums[val-1]` as a visited marker. If already negative, it's a duplicate.
