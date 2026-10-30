# 712. Minimum ASCII Delete Sum for Two Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings)
**Companies:** Amazon, Google, Meta, Triplebyte

---

## Problem Description

Given two strings `s1` and `s2`, return *the lowest **ASCII** sum of deleted characters to make two strings equal*.

**Constraints:**
- `1 <= s1.length, s2.length <= 1000`
- `s1` and `s2` consist of lowercase English letters.

---

## Examples

```
Example 1:
  Input: s1 = "sea", s2 = "eat"
  Output: 231
  Explanation: Deleting "s" from "sea" adds the ASCII value of "s" (115) to the sum.
  Deleting "t" from "eat" adds 116 to the sum.
  At the end, both strings are equal, and 115 + 116 = 231 is the minimum sum possible to achieve this.
```

```
Example 2:
  Input: s1 = "delete", s2 = "leet"
  Output: 403
  Explanation: Deleting "dee" from "delete" to turn the string into "let",
  adds 100[d] + 101[e] + 101[e] to the sum.
  Deleting "e" from "leet" adds 101[e] to the sum.
  At the end, both strings are equal to "let", and the answer is 100+101+101+101 = 403.
  If instead we turned both strings into "lee" or "eet", we would get answers of 433 or 417, which are higher.
```

---

## Approach

**Algorithm:** Dynamic Programming – Weighted Longest Common Subsequence (LCS)

Key insight: The problem is a variant of LCS where the cost of deleting mismatched characters is their ASCII values instead of a unit cost. Define `dp[i][j]` as the minimum delete cost to make `s1[0..i-1]` and `s2[0..j-1]` equal.

Pseudocode:
```text
FUNCTION minimumDeleteSum(s1, s2):
    m ← LEN(s1)
    n ← LEN(s2)
    CREATE dp[0..m][0..n]
    // base cases: delete all characters from one string
    FOR i ← 1 TO m DO
        dp[i][0] ← dp[i-1][0] + ORD(s1[i-1])
    FOR j ← 1 TO n DO
        dp[0][j] ← dp[0][j-1] + ORD(s2[j-1])
    // fill table
    FOR i ← 1 TO m DO
        FOR j ← 1 TO n DO
            IF s1[i-1] = s2[j-1] THEN
                dp[i][j] ← dp[i-1][j-1]
            ELSE
                dp[i][j] ← MIN(dp[i-1][j] + ORD(s1[i-1]),
                               dp[i][j-1] + ORD(s2[j-1]))
    RETURN dp[m][n]
```
---

## Walkthrough

Consider `s1 = "sea"`, `s2 = "eat"`.
| i / j | 0 (" ") | 1 ("e") | 2 ("a") | 3 ("t") |
|-------|----------|----------|----------|----------|
| 0 (" ") | 0 | 101 | 198 | 322 |
| 1 ("s") | 115 | 101 | 198 | 322 |
| 2 ("e") | 214 | 0   | 198 | 322 |
| 3 ("a") | 313 | 115 | 0   | 322 |
The final cell `dp[3][3] = 231` gives the minimum delete sum.
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP (2D) | O(m·n) | O(m·n) |
---

## Follow-Up Questions

1. How would you reduce the space complexity to O(min(m, n))?
2. Can the algorithm be adapted to handle Unicode characters with variable byte lengths?
3. What changes are needed if deletions have different costs per character class?
---

## Key Takeaway

> Treat the problem as a weighted LCS where deletion cost equals the character’s ASCII value, and solve it with a straightforward DP table.
