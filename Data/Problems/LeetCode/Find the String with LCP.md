# 2573. Find the String with LCP

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-string-with-lcp](https://leetcode.com/problems/find-the-string-with-lcp)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Greedy Construction + Validation — O(n²) ✅](#3-approach-greedy-construction--validation--on²-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

We define the `lcp` matrix of any **0-indexed** string `word` of `n` lowercase English letters as an `n x n` grid such that:

- `lcp[i][j]` is equal to the length of the **longest common prefix** between the substrings `word[i,n-1]` and `word[j,n-1]`.

Given an `n x n` matrix `lcp`, return the alphabetically smallest string `word` that corresponds to `lcp`. If there is no such string, return an empty string.

A string `a` is lexicographically smaller than a string `b` (of the same length) if in the first position where `a` and `b` differ, string `a` has a letter that appears earlier in the alphabet than the corresponding letter in `b`. For example, `"aabd"` is lexicographically smaller than `"aaca"` because the first position they differ is at the third letter, and `'b'` comes before `'c'`.

**Constraints:**
- `1 <= n == ``lcp.length == ``lcp[i].length` `<= 1000`
- `0 <= lcp[i][j] <= n`

---

## 2. Examples

**Example 1:**
```
Input: lcp = [[4,0,2,0],[0,3,0,1],[2,0,2,0],[0,1,0,1]]
Output: "abab"
Explanation: lcp corresponds to any 4 letter string with two alternating letters. The lexicographically smallest of them is "abab".
```

**Example 2:**
```
Input: lcp = [[4,3,2,1],[3,3,2,1],[2,2,2,1],[1,1,1,1]]
Output: "aaaa"
Explanation: lcp corresponds to any 4 letter string with a single distinct letter. The lexicographically smallest of them is "aaaa".
```

**Example 3:**
```
Input: lcp = [[4,3,2,1],[3,3,2,1],[2,2,2,1],[1,1,1,3]]
Output: ""
Explanation: lcp[3][3] cannot be equal to 3 since word[3,...,3] consists of only a single letter; Thus, no answer exists.
```

---

## 3. Approach: Greedy Construction + Validation — O(n²) ✅

```text
FUNCTION findTheString(lcp):
    n ← LENGTH(lcp)
    s ← ['\0'] * n; c ← 'a'

    FOR i ← 0 TO n - 1 DO
        IF s[i] != '\0' THEN CONTINUE
        IF c > 'z' THEN RETURN ""
        FOR j ← i TO n - 1 DO
            IF lcp[i][j] > 0 THEN s[j] ← c
        c ← NEXT_CHAR(c)

    // Validate: rebuild LCP and compare
    FOR i ← n-1 DOWNTO 0 DO
        FOR j ← n-1 DOWNTO 0 DO
            IF s[i] == s[j] THEN
                expected ← 1 + (lcp[i+1][j+1] IF i+1<n AND j+1<n ELSE 0)
            ELSE expected ← 0
            IF expected != lcp[i][j] THEN RETURN ""

    RETURN JOIN(s)
```

---

## 4. Walkthrough

Consider `n = 3` with the first example matrix.
1. Start with `i = 0`, assign `'a'` to positions where `lcp[0][j] > 0` → `s = [a, a, \0]`.
2. Move to `i = 1`, `'b'` is the next unused character, assign to `j = 1,2` where `lcp[1][j] > 0` → `s = [a, b, b]`.
3. Validation recomputes LCP from `s = "abb"` and matches the original matrix, confirming correctness.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) – greedy assignment + validation |
| **Space** | O(n) – result string and temporary variables |

---

## 6. Follow-Up Questions

- How would you adapt the algorithm if the alphabet size were larger than 26?
- Can the validation step be optimized to O(n) using prefix hashes?
- What changes are needed if the LCP matrix is not guaranteed to be symmetric?

---

## 7. Key Takeaway

> **Greedy character assignment** using the LCP matrix constraints, followed by O(n²) validation. The key is that `lcp[i][j] > 0` implies `s[i] == s[j]`.
