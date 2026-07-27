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

Given an array of strings `words` and a string `s`, return the number of strings in `words` that are a **prefix** of `s`.

**Constraints:**
- `1 <= words.length <= 1000`
- `1 <= words[i].length, s.length <= 1000`

---

## Examples

**Example 1:**
- **Input:** `words = ["a","b","c","ab","bc","abc"], s = "abc"`
- **Output:** `3`
- **Explanation:** "a", "ab", and "abc" are prefixes of "abc".

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
