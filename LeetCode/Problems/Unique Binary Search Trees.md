# 96. Unique Binary Search Trees

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unique-binary-search-trees](https://leetcode.com/problems/unique-binary-search-trees)
**Companies:** Amazon, Bloomberg, Clari, Google, Meta, Microsoft, Oracle, Snapchat, Swiggy, Tiktok

---

## Approach: DP (Catalan Numbers) — O(n²) ✅

```
FUNCTION numTrees(n):
    dp = [0] * (n + 1)
    dp[0] = dp[1] = 1

    FOR i ← 2 TO n:
        FOR j ← 0 TO i - 1:
            dp[i] += dp[j] * dp[i - 1 - j]

    RETURN dp[n]
```

`dp[n]` = nth Catalan number = C(2n, n) / (n+1). Each `j` represents choosing root at position j+1.
