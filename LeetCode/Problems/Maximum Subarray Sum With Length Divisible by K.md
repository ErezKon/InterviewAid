# 3381. Maximum Subarray Sum With Length Divisible by K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-subarray-sum-with-length-divisible-by-k](https://leetcode.com/problems/maximum-subarray-sum-with-length-divisible-by-k)
**Companies:** Amazon, Bloomberg, Google, Meta

---

```
FUNCTION maxSubarraySum(nums, k):
    prefix = [0]
    FOR num IN nums: prefix.ADD(prefix[-1] + num)

    minPrefix = [infinity] * k
    result = -infinity
    FOR i ← 0 TO len(nums):
        r = i % k
        IF i >= k:
            result = MAX(result, prefix[i] - minPrefix[r])
        minPrefix[r] = MIN(minPrefix[r], prefix[i])
    RETURN result
```
