# 325. Maximum Size Subarray Sum Equals k

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-size-subarray-sum-equals-k](https://leetcode.com/problems/maximum-size-subarray-sum-equals-k)
**Companies:** Amazon, Goldman Sachs, Google, Meta, Microsoft, Oracle, Palantir, Tiktok

---

## Approach: Prefix Sum + Hash Map — O(n) ✅

```
FUNCTION maxSubArrayLen(nums, k):
    prefixMap = {0: -1}
    prefixSum = 0
    maxLen = 0

    FOR i, num IN enumerate(nums):
        prefixSum += num
        IF (prefixSum - k) IN prefixMap:
            maxLen = MAX(maxLen, i - prefixMap[prefixSum - k])
        IF prefixSum NOT IN prefixMap:
            prefixMap[prefixSum] = i    // keep earliest index

    RETURN maxLen
```

Store first occurrence of each prefix sum for maximum length.
