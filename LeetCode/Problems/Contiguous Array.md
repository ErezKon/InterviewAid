# 525. Contiguous Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/contiguous-array](https://leetcode.com/problems/contiguous-array)
**Companies:** Accenture, Adobe, Akamai, Amazon, Bloomberg, Google, Infosys, Meta, Microsoft, Morgan Stanley, Motive, Oracle, Tiktok, Walmart Labs

---

## Approach: Prefix Sum with Hash Map — O(n) ✅

Convert 0s to -1s. Find longest subarray with sum 0.

```
FUNCTION findMaxLength(nums):
    count = 0    // running sum (0 → -1)
    maxLen = 0
    firstSeen = {0: -1}

    FOR i ← 0 TO n - 1:
        count += 1 IF nums[i] == 1 ELSE -1

        IF count IN firstSeen:
            maxLen = MAX(maxLen, i - firstSeen[count])
        ELSE:
            firstSeen[count] = i

    RETURN maxLen
```

Same prefix sum technique as Subarray Sum Equals K (#560) but track first occurrence for maximum length.
