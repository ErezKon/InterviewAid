# 718. Maximum Length of Repeated Subarray

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-length-of-repeated-subarray](https://leetcode.com/problems/maximum-length-of-repeated-subarray)
**Companies:** Amazon, Bloomberg, Citadel, Google, Microsoft, Netflix, Palantir

---

## Approach: DP — O(m·n) ✅

```
FUNCTION findLength(nums1, nums2):
    m, n = len(nums1), len(nums2)
    dp = (m+1) × (n+1) zeros
    maxLen = 0

    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            IF nums1[i-1] == nums2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
                maxLen = MAX(maxLen, dp[i][j])

    RETURN maxLen
```

Like LCS but only extend on exact matches (subarray, not subsequence).
