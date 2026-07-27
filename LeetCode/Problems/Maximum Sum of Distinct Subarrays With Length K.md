# 2461. Maximum Sum of Distinct Subarrays With Length K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k](https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k)
**Companies:** Amazon, Bloomberg, Google, Ibm, Jpmorgan, Meta, Microsoft, Nvidia, Tcs, Walmart Labs

---

## Approach: Fixed Window + Hash Map — O(n) ✅

```
FUNCTION maximumSubarraySum(nums, k):
    count = {}
    windowSum = 0
    maxSum = 0

    FOR i ← 0 TO n - 1:
        count[nums[i]] = count.get(nums[i], 0) + 1
        windowSum += nums[i]

        IF i >= k:
            count[nums[i - k]] -= 1
            IF count[nums[i - k]] == 0: DELETE count[nums[i - k]]
            windowSum -= nums[i - k]

        IF i >= k - 1 AND len(count) == k:
            maxSum = MAX(maxSum, windowSum)

    RETURN maxSum
```

Fixed window of size k. Track distinct elements with a frequency map. Valid window has exactly k distinct elements.
