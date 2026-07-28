# 1639. Number of Ways to Form a Target String Given a Dictionary

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/number-of-ways-to-form-a-target-string-given-a-dictionary
**Companies:** Amazon, Bloomberg, Dunzo, Google, Meesho, Meta, Snapchat, Snowflake, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(m·n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a list of equal‑length words (the dictionary) and a target string, pick exactly one character from each column of the dictionary (left to right). The chosen characters, in order, must form the target. Count the number of ways modulo 10⁹+7.

---

## Examples

| words | target | output |
|-------|--------|--------|
| ["abc","abc","abc"] | "abc" | 27 |
| ["abc","bca","dac","dbc","cba"] | "abbc" | 4 |

*Explanation*: In the first case each column has three identical letters, giving 3³ = 27 ways.

---

## 2. Key Insight

> Pre‑compute the frequency of each character at every column. Then use DP: for each column, either skip it or use it to match the next needed character of the target.

---

## 3. Approach: DP — O(m·n) ✅

```text
FUNCTION numWays(words, target):
    MOD ← 10^9 + 7
    m ← LENGTH(target)
    n ← LENGTH(words[0])
    // freq[j][c] = occurrences of character c in column j
    freq ← MATRIX[n][26] FILLED WITH 0
    FOR word IN words:
        FOR j ← 0 TO n-1:
            c ← word[j]
            freq[j][c] ← freq[j][c] + 1
    dp ← ARRAY[0..m] FILLED WITH 0
    dp[0] ← 1
    FOR j ← 0 TO n-1:
        FOR i ← MIN(m, j+1) DOWNTO 1:
            char ← target[i-1]
            ways ← freq[j][char]
            dp[i] ← (dp[i] + dp[i-1] * ways) MOD MOD
    RETURN dp[m]
```

---

## Walkthrough

Target = "abc", words = ["abc","abc","abc"]:
1. freq for each column = {a:3}, {b:3}, {c:3}.
2. dp starts [1,0,0,0].
3. Column 0 (a): update dp[1] = dp[1] + dp[0]*3 → 3.
4. Column 1 (b): update dp[2] = dp[2] + dp[1]*3 → 9.
5. Column 2 (c): update dp[3] = dp[3] + dp[2]*3 → 27.
6. Result dp[3] = 27.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n + W·n) |
| **Space** | O(m + 26·n) |

---

## Follow-Up Questions

1. How would the solution change if you could reuse columns multiple times?
2. Can you extend the DP to handle variable‑length words?

---

## 5. Key Takeaway

> **Column‑wise DP with frequency counts.** Process columns left to right, using reverse DP to combine ways without double‑counting.
