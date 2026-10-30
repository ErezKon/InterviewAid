# 392. Is Subsequence

**Difficulty:** 🟢 Easy
**Acceptance:** 51.0%
**LeetCode:** [https://leetcode.com/problems/is-subsequence](https://leetcode.com/problems/is-subsequence)
**Companies:** Adobe, Amazon, Bloomberg, Fractal Analytics, Goldman Sachs, Google, Infosys, Meta, Microsoft, Pinterest, Qualcomm, Tinkoff, Wix, Yandex, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Two Pointers — O(n) ✅](#4-approach-two-pointers--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given two strings `s` and `t`, return `true`* if *`s`* is a **subsequence** of *`t`*, or *`false`* otherwise*.

A **subsequence** of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., `"ace"` is a subsequence of `"abcde"` while `"aec"` is not).

**Follow up:** Suppose there are lots of incoming `s`, say `s_1, s_2, ..., s_k` where `k >= 10^9`, and you want to check one by one to see if `t` has its subsequence. In this scenario, how would you change your code?

**Constraints:**
- `0 <= s.length <= 100`
- `0 <= t.length <= 10^4`
- `s` and `t` consist only of lowercase English letters.

---

## 2. Examples

**Example 1:**
```
Input: s = "abc", t = "ahbgdc"
Output: true
```

**Example 2:**
```
Input: s = "axc", t = "ahbgdc"
Output: false
```

---

## 3. Key Insight

Greedily match characters of `s` left-to-right in `t`. Each time a character in `t` matches the current character in `s`, advance the `s` pointer. If `s` is fully consumed, it's a subsequence.

---

## 4. Approach: Two Pointers — O(n) ✅

```
FUNCTION isSubsequence(s, t):
    i = 0    // pointer for s

    FOR char IN t:
        IF i < len(s) AND char == s[i]:
            i += 1

    RETURN i == len(s)
```

---

## 5. Walkthrough

```
s = "abc", t = "ahbgdc"
```

| t char | s[i] | Match? | i |
|--------|------|--------|---|
| a | a | ✅ | 1 |
| h | b | No | 1 |
| b | b | ✅ | 2 |
| g | c | No | 2 |
| d | c | No | 2 |
| c | c | ✅ | 3 |

`i == 3 == len(s)` → **true** ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | n = len(t), single pass |
| Space | O(1) | Just a pointer |

---

## 7. Follow-Up Questions

### 7.1 Many s queries against the same t?

Preprocess `t`: build a map of `char → sorted list of indices`. For each query, binary search for the next valid index for each character. O(|s| · log |t|) per query after O(|t|) preprocessing.

### 7.2 What if we need the number of distinct subsequences?

That's a different problem (**LeetCode #115**), solved with DP.

### 7.3 Can we check if s is a subsequence of t recursively?

Yes, but the iterative two-pointer approach is cleaner and uses O(1) space vs O(n) stack.

---

## 8. Key Takeaway

> Greedy scan through `t` with a pointer into `s`. Each match advances the `s` pointer. If all of `s` is consumed, it's a subsequence. The follow-up (many queries) upgrades to binary search on precomputed index lists.
