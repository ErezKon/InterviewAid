# 1827. Minimum Operations to Make the Array Increasing

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-the-array-increasing](https://leetcode.com/problems/minimum-operations-to-make-the-array-increasing)
**Companies:** Amazon, Deutsche Bank, Google, Tiktok

---

```
FUNCTION minOperations(nums):
    ops = 0
    FOR i ← 1 TO len(nums) - 1:
        IF nums[i] <= nums[i-1]:
            ops += nums[i-1] - nums[i] + 1
            nums[i] = nums[i-1] + 1
    RETURN ops
```
