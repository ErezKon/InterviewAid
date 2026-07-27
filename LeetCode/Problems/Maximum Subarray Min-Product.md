# 1856. Maximum Subarray Min-Product

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-subarray-min-product](https://leetcode.com/problems/maximum-subarray-min-product)
**Companies:** Amazon, Google, Uber

---

```
FUNCTION maxSumMinProduct(nums):
    MOD = 10^9 + 7
    prefix = [0] + accumulate(nums)
    stack = []; maxProd = 0

    FOR i ← 0 TO len(nums):
        WHILE stack AND (i == len(nums) OR nums[stack[-1]] > nums[i]):
            mid = stack.POP()
            left = stack[-1] IF stack ELSE -1
            subarraySum = prefix[i] - prefix[left + 1]
            maxProd = MAX(maxProd, nums[mid] * subarraySum)
        stack.PUSH(i)

    RETURN maxProd % MOD
```
