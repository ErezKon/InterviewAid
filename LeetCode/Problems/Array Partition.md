# 561. Array Partition

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/array-partition](https://leetcode.com/problems/array-partition)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION arrayPairSum(nums):
    SORT nums
    RETURN SUM(nums[i] for i in range(0, len(nums), 2))
```

Pair adjacent elements after sorting to maximize sum of minimums.
