# 2419. Longest Subarray With Maximum Bitwise AND

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and](https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and)
**Companies:** Amazon, Bloomberg, Fourkites, Google, Meta, Microsoft

---

## 1. Problem Description

Find the longest subarray whose bitwise AND equals the maximum possible AND of any subarray.

---

## 2. Approach: Find Max + Longest Run — O(n) ✅

AND of a subarray ≤ every element. Maximum AND = max value in array. Find the longest consecutive run of that max value.

```
FUNCTION longestSubarray(nums):
    maxVal = MAX(nums)
    maxLen = 0; currLen = 0

    FOR num IN nums:
        IF num == maxVal:
            currLen += 1
            maxLen = MAX(maxLen, currLen)
        ELSE:
            currLen = 0

    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Key insight: `AND(subarray) ≤ min(subarray) ≤ max(array)`. The max AND is achieved by a subarray of identical max-value elements. Just find the longest such run.
