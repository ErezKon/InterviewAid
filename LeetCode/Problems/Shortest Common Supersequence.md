# 1092. Shortest Common Supersequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-common-supersequence](https://leetcode.com/problems/shortest-common-supersequence)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given strings `str1` and `str2`, return the shortest string that has both as subsequences.

---

## Key Insight

> Length of SCS = `len(str1) + len(str2) - LCS_length`. Build the LCS DP table, then reconstruct by interleaving both strings while merging LCS characters.

---

## Approach: LCS + Reconstruction — O(m·n) ✅

```
FUNCTION shortestCommonSupersequence(str1, str2):
    // 1. Compute LCS DP table
    dp = LCS_table(str1, str2)

    // 2. Reconstruct: interleave both strings, merging LCS chars
    result = []
    i, j = len(str1), len(str2)

    WHILE i > 0 AND j > 0:
        IF str1[i-1] == str2[j-1]:
            result.ADD(str1[i-1])
            i -= 1; j -= 1
        ELSE IF dp[i-1][j] > dp[i][j-1]:
            result.ADD(str1[i-1])
            i -= 1
        ELSE:
            result.ADD(str2[j-1])
            j -= 1

    // Add remaining
    WHILE i > 0: result.ADD(str1[i-1]); i -= 1
    WHILE j > 0: result.ADD(str2[j-1]); j -= 1

    RETURN REVERSE(result) as string
```

Length = len(str1) + len(str2) - LCS length.
