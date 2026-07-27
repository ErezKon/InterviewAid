# 813. Largest Sum of Averages

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Google

---

## 1. Problem Description

Partition array `nums` into at most `k` groups and maximize the sum of each group's average.

---

## 2. Approach: DP + Prefix Sums — O(n²·k) ✅

```
FUNCTION largestSumOfAverages(nums, k):
    n = len(nums)
    prefix = prefix sums of nums

    // dp[i][j] = max avg sum for first i elements with j groups
    dp[i][1] = prefix[i] / i for all i

    FOR j ← 2 TO k:
        FOR i ← j TO n:
            FOR m ← j-1 TO i-1:
                dp[i][j] = MAX(dp[i][j],
                    dp[m][j-1] + (prefix[i] - prefix[m]) / (i - m))

    RETURN dp[n][k]
```

| Time | Space |
|------|-------|
| O(n²·k) | O(n·k) |

---

## 3. Key Takeaway

> DP where `dp[i][j]` = best sum of averages for first `i` elements split into `j` groups. Use prefix sums for O(1) average computation. More groups always ≥ fewer groups (Jensen's inequality).
