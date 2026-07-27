# 523. Continuous Subarray Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/continuous-subarray-sum](https://leetcode.com/problems/continuous-subarray-sum)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Phonepe, Swiggy, Tcs, Yandex

---

## Approach: Prefix Sum Modulo — O(n) ✅

```
FUNCTION checkSubarraySum(nums, k):
    remainderMap = {0: -1}
    prefixMod = 0

    FOR i, num IN enumerate(nums):
        prefixMod = (prefixMod + num) % k

        IF prefixMod IN remainderMap:
            IF i - remainderMap[prefixMod] >= 2:
                RETURN true
        ELSE:
            remainderMap[prefixMod] = i

    RETURN false
```

If two prefix sums have the same remainder mod k and are at least 2 apart, the subarray sum is a multiple of k.
