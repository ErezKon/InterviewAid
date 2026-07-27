# 1035. Uncrossed Lines

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/uncrossed-lines](https://leetcode.com/problems/uncrossed-lines)
**Companies:** Amazon, Google, Microsoft, Phonepe

---

```
FUNCTION maxUncrossedLines(nums1, nums2):
    // Same as LCS
    m, n = len(nums1), len(nums2)
    dp = (m+1) × (n+1) zeros
    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            IF nums1[i-1] == nums2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            ELSE:
                dp[i][j] = MAX(dp[i-1][j], dp[i][j-1])
    RETURN dp[m][n]
```
