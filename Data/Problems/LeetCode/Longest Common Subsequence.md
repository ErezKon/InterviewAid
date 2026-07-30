
# 1143. Longest Common Subsequence

**Difficulty:** 🟡 Medium
**Acceptance:** 59.2%
**LeetCode:** [https://leetcode.com/problems/longest-common-subsequence](https://leetcode.com/problems/longest-common-subsequence)
**Companies:** Accenture, Accolite, Amazon, Apple, Bloomberg, Bytedance, Cisco, Doordash, Google, Meta, Micro1, Microsoft, Morgan Stanley, Optum, Oracle, Salesforce, Servicenow, Tcs, Tiktok, Walmart Labs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Solution: 2D DP — O(m × n) ✅](#4-solution-2d-dp--om--n-)
5. [Space-Optimized: 1D DP — O(min(m, n))](#5-space-optimized-1d-dp--ominm-n)
6. [Walkthrough](#6-walkthrough)
7. [Reconstructing the LCS](#7-reconstructing-the-lcs)
8. [Complexity Analysis](#8-complexity-analysis)
9. [Follow-Up Questions](#9-follow-up-questions)

---

## 1. Problem Description

Given two strings `text1` and `text2`, return the length of their **longest common subsequence**. If there is no common subsequence, return `0`.

A **subsequence** is a sequence derived from another by deleting some or no elements without changing the order of remaining elements.

---

## 2. Examples

```
Example 1:
  Input:  text1 = "abcde", text2 = "ace"
  Output: 3
  Reason: LCS is "ace"

Example 2:
  Input:  text1 = "abc", text2 = "abc"
  Output: 3

Example 3:
  Input:  text1 = "abc", text2 = "def"
  Output: 0
```

---

## 3. Key Insight

Compare the last characters of both strings:

- If they **match**: that character is part of the LCS. Add 1 and solve for the remaining prefixes.
- If they **don't match**: skip one character from either string and take the better result.

```
IF text1[i-1] == text2[j-1]:
    dp[i][j] = dp[i-1][j-1] + 1
ELSE:
    dp[i][j] = MAX(dp[i-1][j], dp[i][j-1])
```

---

## 4. Solution: 2D DP — O(m × n) ✅

```
FUNCTION longestCommonSubsequence(text1, text2):
    m = LENGTH(text1)
    n = LENGTH(text2)

    // dp[i][j] = LCS length of text1[0..i-1] and text2[0..j-1]
    dp = 2D ARRAY of (m+1) × (n+1), all zeros

    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            IF text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            ELSE:
                dp[i][j] = MAX(dp[i-1][j], dp[i][j-1])

    RETURN dp[m][n]
```

---

## 5. Space-Optimized: 1D DP — O(min(m, n))

Since each row only depends on the previous row:

```
FUNCTION longestCommonSubsequence(text1, text2):
    // Ensure text2 is shorter for space optimization
    IF LENGTH(text1) < LENGTH(text2):
        SWAP(text1, text2)

    m = LENGTH(text1)
    n = LENGTH(text2)

    prev = ARRAY of (n+1) zeros
    curr = ARRAY of (n+1) zeros

    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            IF text1[i-1] == text2[j-1]:
                curr[j] = prev[j-1] + 1
            ELSE:
                curr[j] = MAX(prev[j], curr[j-1])

        SWAP(prev, curr)
        FILL curr with zeros

    RETURN prev[n]
```

---

## 6. Walkthrough

```
text1 = "abcde", text2 = "ace"

    ""  a  c  e
""   0  0  0  0
a    0  1  1  1
b    0  1  1  1
c    0  1  2  2
d    0  1  2  2
e    0  1  2  3

dp[5][3] = 3 → LCS = "ace" ✅

Key cells:
  dp[1][1]: text1[0]='a' == text2[0]='a' → dp[0][0]+1 = 1
  dp[3][2]: text1[2]='c' == text2[1]='c' → dp[2][1]+1 = 2
  dp[5][3]: text1[4]='e' == text2[2]='e' → dp[4][2]+1 = 3
```

---

## 7. Reconstructing the LCS

Backtrack through the DP table:

```
FUNCTION reconstructLCS(text1, text2, dp):
    lcs = ""
    i = LENGTH(text1)
    j = LENGTH(text2)

    WHILE i > 0 AND j > 0:
        IF text1[i-1] == text2[j-1]:
            lcs = text1[i-1] + lcs
            i -= 1
            j -= 1
        ELSE IF dp[i-1][j] > dp[i][j-1]:
            i -= 1
        ELSE:
            j -= 1

    RETURN lcs
```

---

## 8. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| **2D DP** | **O(m × n)** | O(m × n) |
| **1D DP** | **O(m × n)** | **O(min(m, n))** |

---

## 9. Follow-Up Questions

### 9.1 Edit Distance (LeetCode #72)

Find the minimum edits (insert, delete, replace) to convert one string to another. Very similar DP table:

```
IF text1[i-1] == text2[j-1]:
    dp[i][j] = dp[i-1][j-1]           // no edit needed
ELSE:
    dp[i][j] = 1 + MIN(
        dp[i-1][j],                    // delete from text1
        dp[i][j-1],                    // insert into text1
        dp[i-1][j-1]                   // replace
    )
```

### 9.2 Shortest Common Supersequence (LeetCode #1092)

Find the shortest string that has both `text1` and `text2` as subsequences.

**Length = m + n - LCS length**

To reconstruct: follow the DP table — include matched characters once, and unmatched characters from both strings.

### 9.3 Longest Common Substring (not subsequence)

Subsequence allows gaps; substring doesn't. Change: when characters don't match, set `dp[i][j] = 0` (no carry-over).

```
IF text1[i-1] == text2[j-1]:
    dp[i][j] = dp[i-1][j-1] + 1
ELSE:
    dp[i][j] = 0                       // ← key difference
```

Track the maximum value in the table.

### 9.4 LCS of 3 strings?

Extend to a 3D DP table: `dp[i][j][k]`.

```
IF s1[i-1] == s2[j-1] == s3[k-1]:
    dp[i][j][k] = dp[i-1][j-1][k-1] + 1
ELSE:
    dp[i][j][k] = MAX(dp[i-1][j][k], dp[i][j-1][k], dp[i][j][k-1])
```

**Time:** O(m × n × p).

---

## String DP Problem Family

| Problem | Recurrence Pattern | Time |
|---------|-------------------|------|
| **LCS** (#1143) | Match → diagonal+1, else max(up, left) | O(mn) |
| **Edit Distance** (#72) | Match → diagonal, else 1+min(3 dirs) | O(mn) |
| **Longest Common Substring** | Match → diagonal+1, else 0 | O(mn) |
| **Shortest Common Supersequence** (#1092) | LCS-based reconstruction | O(mn) |

---

## Key Takeaway

> LCS is the foundational **2D string DP** problem. The table structure — two strings as axes, matching characters extend the diagonal, mismatches take the max of skipping either — appears in many variants: edit distance, common substring, diff algorithms (like `git diff`), and bioinformatics sequence alignment.
