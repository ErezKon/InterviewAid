# 2896. Apply Operations to Make Two Strings Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apply-operations-to-make-two-strings-equal](https://leetcode.com/problems/apply-operations-to-make-two-strings-equal)
**Companies:** Zeta

---

## Approach: DP on Mismatch Positions — O(m²) ✅

```
FUNCTION minOperations(s1, s2, x):
    diffs = [i for i where s1[i] != s2[i]]
    m = len(diffs)
    IF m % 2 != 0: RETURN -1

    // dp[i] = min cost to fix first i mismatches
    // Option 1: pair diffs[i-1] with diffs[i-2] at cost diffs[i-1] - diffs[i-2]
    // Option 2: flip diffs[i-1] independently at cost x/2

    dp = [0] * (m + 1)
    dp[1] = x / 2
    FOR i ← 2 TO m:
        dp[i] = MIN(
            dp[i-2] + diffs[i-1] - diffs[i-2],
            dp[i-1] + x / 2
        )

    RETURN int(dp[m])
```
