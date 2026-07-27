# 3396. Minimum Number of Operations to Make Elements in Array Distinct

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-elements-in-array-distinct](https://leetcode.com/problems/minimum-number-of-operations-to-make-elements-in-array-distinct)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION minimumOperations(nums):
    ops = 0
    WHILE len(SET(nums)) != len(nums):
        nums = nums[3:]
        ops += 1
    RETURN ops
```
