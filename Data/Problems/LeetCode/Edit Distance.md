# 72. Edit Distance

**Difficulty:** 🟡 Medium
**Acceptance:** 56.0%
**LeetCode:** [https://leetcode.com/problems/edit-distance](https://leetcode.com/problems/edit-distance)
**Companies:** Accenture, Amazon, Apple, Arcesium, Arista Networks, Axon, Bloomberg, Cisco, Deloitte, Epam Systems, Flipkart, Google, Hashedin, Ibm, Infosys, Linkedin, Meta, Microsoft, Oracle, Qualcomm, Samsung, Sprinklr, Swiggy, Tiktok, Visa, Walmart Labs, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: DP — O(m·n) ✅](#3-approach-dp--omn-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.

You can: **Insert** a character, **Delete** a character, or **Replace** a character.

**Constraints:**
- `0 <= word1.length, word2.length <= 500`
- `word1` and `word2` consist of lowercase English letters.

---

## 2. Examples

```
Example 1:
  Input:  word1 = "horse", word2 = "ros"
  Output: 3
  Reason: horse → rorse (replace h→r) → rose (delete r) → ros (delete e)

Example 2:
  Input:  word1 = "intention", word2 = "execution"
  Output: 5
```

---

## 3. Approach: DP — O(m·n) ✅

### Recurrence

`dp[i][j]` = min operations to convert `word1[0..i-1]` to `word2[0..j-1]`.

```
IF word1[i-1] == word2[j-1]:
    dp[i][j] = dp[i-1][j-1]                    // no operation needed
ELSE:
    dp[i][j] = 1 + MIN(
        dp[i-1][j],         // delete from word1
        dp[i][j-1],         // insert into word1
        dp[i-1][j-1]        // replace
    )
```

### Base Cases

```
dp[i][0] = i    // delete all characters from word1
dp[0][j] = j    // insert all characters of word2
```

### Pseudocode

```
FUNCTION minDistance(word1, word2):
    m = len(word1)
    n = len(word2)
    dp = (m+1) × (n+1) matrix

    FOR i ← 0 TO m: dp[i][0] = i
    FOR j ← 0 TO n: dp[0][j] = j

    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            IF word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            ELSE:
                dp[i][j] = 1 + MIN(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])

    RETURN dp[m][n]
```

---

## 4. Walkthrough

```
word1 = "horse", word2 = "ros"

     ""  r  o  s
""  [ 0  1  2  3]
h   [ 1  1  2  3]
o   [ 2  2  1  2]
r   [ 3  2  2  2]
s   [ 4  3  3  2]
e   [ 5  4  4  3]

dp[5][3] = 3 ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m·n) |
| **Space** | O(m·n), optimizable to O(min(m,n)) |

---

## 6. Follow-Up Questions

### 6.1 What if we only allow insertions and deletions (no replacements)?

Remove the diagonal case. `dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1])` when characters differ. This equals `m + n - 2 * LCS(word1, word2)`.

### 6.2 What if each operation has different costs?

Change `1 +` to the respective cost for each operation in the recurrence.

### 6.3 One Edit Distance (LeetCode #161)?

Check if exactly one edit transforms word1 to word2. Compare lengths and characters without full DP — O(n) solution.

### 6.4 Delete Operations for Two Strings (LeetCode #583)?

Min deletions to make both equal. Answer = `m + n - 2 * LCS(word1, word2)`.

---

## Key Takeaway

> Edit Distance (Levenshtein distance) is the **foundational DP on two strings** problem. The three operations (insert, delete, replace) map to three directions in the DP table (left, up, diagonal). Understanding this is key to solving many string transformation problems.
