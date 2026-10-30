# 2255. Count Prefixes of a Given String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-prefixes-of-a-given-string](https://leetcode.com/problems/count-prefixes-of-a-given-string)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a string array `words` and a string `s`, where `words[i]` and `s` comprise only of **lowercase English letters**.

Return *the **number of strings** in* `words` *that are a **prefix** of* `s`.

A **prefix** of a string is a substring that occurs at the beginning of the string. A **substring** is a contiguous sequence of characters within a string.

**Constraints:**
- `1 <= words.length <= 1000`
- `1 <= words[i].length, s.length <= 10`
- `words[i]` and `s` consist of lowercase English letters **only**.

---

## Examples

**Example 1:**
```
Input: words = ["a","b","c","ab","bc","abc"], s = "abc"
Output: 3
Explanation: The strings in words which are a prefix of s = "abc" are:
"a", "ab", and "abc".
Thus the number of strings in words which are a prefix of s is 3.
```

**Example 2:**
```
Input: words = ["a","a"], s = "aa"
Output: 2
Explanation: Both of the strings are a prefix of s.
Note that the same string can occur multiple times in words, and it should be counted each time.
```

---

## Approach

```
FUNCTION countPrefixes(words, s):
    count = 0
    FOR w IN words DO
        IF s.startswith(w): count += 1
    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × L) where L = length of s |
| **Space** | O(1) |

---

## Key Takeaway

> **Simple prefix checking with `startswith` — a direct application of string matching. For large-scale queries, a trie on `s` would allow O(|w|) per query.**
