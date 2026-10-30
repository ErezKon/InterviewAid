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

You are given a list of strings of the **same length** `words` and a string `target`.

Your task is to form `target` using the given `words` under the following rules:

- `target` should be formed from left to right.
- To form the `i^th` character (**0-indexed**) of `target`, you can choose the `k^th` character of the `j^th` string in `words` if `target[i] = words[j][k]`.
- Once you use the `k^th` character of the `j^th` string of `words`, you **can no longer** use the `x^th` character of any string in `words` where `x <= k`. In other words, all characters to the left of or at index `k` become unusuable for every string.
- Repeat the process until you form the string `target`.

**Notice** that you can use **multiple characters** from the **same string** in `words` provided the conditions above are met.

Return *the number of ways to form `target` from `words`*. Since the answer may be too large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 1000`
- All strings in `words` have the same length.
- `1 <= target.length <= 1000`
- `words[i]` and `target` contain only lowercase English letters.

---

## Examples

**Example 1:**
```
Input: words = ["acca","bbbb","caca"], target = "aba"
Output: 6
Explanation: There are 6 ways to form target.
"aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("caca")
"aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("caca")
"aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("acca")
"aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("acca")
"aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("acca")
"aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("caca")
```

**Example 2:**
```
Input: words = ["abba","baab"], target = "bab"
Output: 4
Explanation: There are 4 ways to form target.
"bab" -> index 0 ("baab"), index 1 ("baab"), index 2 ("abba")
"bab" -> index 0 ("baab"), index 1 ("baab"), index 3 ("baab")
"bab" -> index 0 ("baab"), index 2 ("baab"), index 3 ("baab")
"bab" -> index 1 ("abba"), index 2 ("baab"), index 3 ("baab")
```

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
