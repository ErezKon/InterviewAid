# 1639. Number of Ways to Form a Target String Given a Dictionary

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-form-a-target-string-given-a-dictionary](https://leetcode.com/problems/number-of-ways-to-form-a-target-string-given-a-dictionary)
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

Form `target` by picking one character per column (left to right) from dictionary words. Count ways mod 10⁹+7.

---

## 2. Key Insight

> Precompute character frequency per column. DP: for each column, either skip it or use it to match the next target character.

---

## 3. Approach: DP — O(m·n) ✅

```
FUNCTION numWays(words, target):
    MOD = 10^9 + 7
    m = len(target)
    n = len(words[0])

    // Count char frequency at each column
    freq = [Counter() for _ in range(n)]
    FOR word IN words:
        FOR j, c IN enumerate(word):
            freq[j][c] += 1

    // dp[j][i] = ways to form target[0..i-1] using columns 0..j-1
    dp = [0] * (m + 1)
    dp[0] = 1

    FOR j ← 0 TO n - 1:
        FOR i ← MIN(m, j+1) DOWN TO 1:
            dp[i] = (dp[i] + dp[i-1] * freq[j][target[i-1]]) % MOD

    RETURN dp[m]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n + W · n) |
| **Space** | O(m + 26n) |

---

## 5. Key Takeaway

> **Column-by-column DP with frequency precomputation.** Process columns left to right; for each, multiply frequency of needed char by accumulated ways. Reverse inner loop to avoid double-counting.
