# 28. Find the Index of the First Occurrence in a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string)
**Companies:** Amazon, Apple, Bloomberg, Capgemini, Expedia, Google, Infosys, Lg Electronics, Linkedin, Meta, Microsoft, Pocket Gems, Qualcomm, Tcs, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach 1: Built-in — O(nm)](#2-approach-1-built-in--onm)
3. [Approach 2: KMP — O(n+m) ✅](#3-approach-2-kmp--onm-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Return the index of the first occurrence of `needle` in `haystack`, or -1 if not found.

---

## 2. Approach 1: Built-in — O(nm)

```
RETURN haystack.indexOf(needle)
```

---

## 3. Approach 2: KMP — O(n+m) ✅

```
FUNCTION strStr(haystack, needle):
    // Build failure function
    lps = [0] * len(needle)
    j = 0
    FOR i ← 1 TO len(needle) - 1:
        WHILE j > 0 AND needle[i] != needle[j]: j = lps[j-1]
        IF needle[i] == needle[j]: j += 1
        lps[i] = j

    // Search
    j = 0
    FOR i ← 0 TO len(haystack) - 1:
        WHILE j > 0 AND haystack[i] != needle[j]: j = lps[j-1]
        IF haystack[i] == needle[j]: j += 1
        IF j == len(needle): RETURN i - j + 1

    RETURN -1
```

---

## 4. Key Takeaway

> **KMP** builds a failure function (longest proper prefix-suffix) to avoid backtracking. O(n+m) string matching.
