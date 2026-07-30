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

---

## Examples

**Example 1:**
```
Input: str1 = "abac", str2 = "cab"
Output: "cabac"
Explanation: "cabac" contains both "abac" and "cab" as subsequences and is the shortest possible.
```

**Example 2:**
```
Input: str1 = "aaaaaaaa", str2 = "aaaaaaaa"
Output: "aaaaaaaa"
Explanation: Both strings are identical, so the SCS is the string itself.
```

---

## Walkthrough

| Step | i (str1) | j (str2) | Action | Result so far |
|------|----------|----------|--------|---------------|
| 1 | 4 | 3 | chars equal 'c' | add 'c', i←3, j←2 |
| 2 | 3 | 2 | chars not equal, dp[2][2] > dp[3][1] → take from str1 'a' | add 'a' |
| 3 | 2 | 2 | chars equal 'a' | add 'a', i←1, j←1 |
| 4 | 1 | 1 | chars equal 'a' | add 'a', i←0, j←0 |
| Append remaining str2 prefix "c" | final reversed "cabac" |

---

## Complexity Analysis

- **Time:** O(m·n) – DP table construction and reconstruction each traverse the strings.
- **Space:** O(m·n) – DP table storing LCS lengths.
