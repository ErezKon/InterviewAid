# 97. Interleaving String

**Difficulty:** 🟡 Medium
**Acceptance:** 40.0%
**LeetCode:** [https://leetcode.com/problems/interleaving-string](https://leetcode.com/problems/interleaving-string)
**Companies:** Amazon, Apple, Axon, Bloomberg, Ebay, Google, Meta, Microsoft, Nuro, Thoughtspot, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP — O(m·n) ✅](#4-approach-dp--omn-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given strings `s1`, `s2`, and `s3`, find whether `s3` is formed by an **interleaving** of `s1` and `s2`.

An **interleaving** of two strings `s` and `t` is a configuration where `s` and `t` are divided into `n` and `m` substrings respectively, such that:

- `s = s_1 + s_2 + ... + s_n`
- `t = t_1 + t_2 + ... + t_m`
- `|n - m| <= 1`
- The **interleaving** is `s_1 + t_1 + s_2 + t_2 + s_3 + t_3 + ...` or `t_1 + s_1 + t_2 + s_2 + t_3 + s_3 + ...`

**Note:** `a + b` is the concatenation of strings `a` and `b`.

**Follow up:** Could you solve it using only `O(s2.length)` additional memory space?

**Constraints:**
- `0 <= s1.length, s2.length <= 100`
- `0 <= s3.length <= 200`
- `s1`, `s2`, and `s3` consist of lowercase English letters.

---

## 2. Examples

**Example 1:**
```
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Explanation: One way to obtain s3 is:
Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
Since s3 can be obtained by interleaving s1 and s2, we return true.
```

**Example 2:**
```
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
Explanation: Notice how it is impossible to interleave s2 with any other string to obtain s3.
```

**Example 3:**
```
Input: s1 = "", s2 = "", s3 = ""
Output: true
```

---

## 3. Key Insight

Position `i+j` in `s3` must come from either position `i` in `s1` or position `j` in `s2`. This gives a natural 2D DP: `dp[i][j]` = whether `s3[0..i+j-1]` can be formed using `s1[0..i-1]` and `s2[0..j-1]`.

---

## 4. Approach: DP — O(m·n) ✅

```
FUNCTION isInterleave(s1, s2, s3):
    m, n = len(s1), len(s2)
    IF m + n != len(s3): RETURN false

    dp = (m+1) × (n+1) boolean matrix
    dp[0][0] = true

    FOR i ← 0 TO m:
        FOR j ← 0 TO n:
            IF i > 0 AND s1[i-1] == s3[i+j-1]:
                dp[i][j] = dp[i][j] OR dp[i-1][j]
            IF j > 0 AND s2[j-1] == s3[i+j-1]:
                dp[i][j] = dp[i][j] OR dp[i][j-1]

    RETURN dp[m][n]
```

`dp[i][j]` = can `s3[0..i+j-1]` be formed by interleaving `s1[0..i-1]` and `s2[0..j-1]`?

---

## 5. Walkthrough

```
s1 = "ab", s2 = "cd", s3 = "acbd"
```

|   | "" | c | cd |
|---|----|----|-----|
| "" | T | F | F |
| a | F | T (a=a from s1, c=c from s2) | F |
| ab | F | F | T (acbd interleaves ab, cd) |

**Result:** `dp[2][2] = true` ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(m·n) | Fill (m+1)×(n+1) table |
| Space | O(m·n) | DP table (optimizable to O(n) with 1D array) |

---

## 7. Follow-Up Questions

### 7.1 Can we optimize space?

Yes. Since `dp[i][j]` depends only on `dp[i-1][j]` and `dp[i][j-1]`, use a single 1D array of size n+1 and update in-place.

### 7.2 What about a greedy approach?

Greedy fails because choosing s1 vs s2 at each step can lead to dead ends. Example: `s1="a"`, `s2="a"`, `s3="aa"` — both choices seem valid at each step.

### 7.3 Can this be solved with BFS?

Yes. Treat `(i, j)` as states in a graph. BFS from `(0,0)` to `(m,n)` visiting valid transitions. Same O(m·n) complexity.

---

## 8. Key Takeaway

> Two-string DP where the position in s3 is determined by `i+j`. At each cell, check if the current s3 character matches the next unused character from s1 or s2. The key constraint is `len(s3) == len(s1) + len(s2)`.
