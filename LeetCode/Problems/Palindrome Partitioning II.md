# 132. Palindrome Partitioning II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/palindrome-partitioning-ii](https://leetcode.com/problems/palindrome-partitioning-ii)
**Companies:** Amazon, Bloomberg, Google, Josh Technology, Meta, Microsoft, Mykaarma, Nutanix, Scaler, Zeta

---

## Approach: DP — O(n²) ✅

```
FUNCTION minCut(s):
    n = len(s)
    // Precompute palindrome table
    isPalin = n×n false matrix
    FOR r ← n-1 DOWN TO 0:
        FOR c ← r TO n-1:
            isPalin[r][c] = (s[r] == s[c]) AND (c - r <= 2 OR isPalin[r+1][c-1])

    dp = [n] * n    // dp[i] = min cuts for s[0..i]
    FOR i ← 0 TO n-1:
        IF isPalin[0][i]:
            dp[i] = 0
        ELSE:
            FOR j ← 1 TO i:
                IF isPalin[j][i]:
                    dp[i] = MIN(dp[i], dp[j-1] + 1)

    RETURN dp[n-1]
```
