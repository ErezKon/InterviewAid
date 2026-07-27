# 2221. Find Triangular Sum of an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-triangular-sum-of-an-array](https://leetcode.com/problems/find-triangular-sum-of-an-array)
**Companies:** Amazon, De Shaw, Google, Microsoft, Zoho

---

```
FUNCTION triangularSum(nums):
    WHILE len(nums) > 1:
        nums = [(nums[i] + nums[i+1]) % 10 for i in range(len(nums) - 1)]
    RETURN nums[0]
```
