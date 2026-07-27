# 1180. Count Substrings with Only One Distinct Letter

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-substrings-with-only-one-distinct-letter](https://leetcode.com/problems/count-substrings-with-only-one-distinct-letter)
**Companies:** Virtu

---

## Problem Description

Given a string `s`, return the number of substrings that consist of only one distinct letter.

---

## Key Insight

Group consecutive identical characters into runs. A run of length `L` contributes `L × (L + 1) / 2` substrings.

---

## Approach

```
FUNCTION countLetters(s):
    total = 0; run = 1
    FOR i ← 1 TO LENGTH(s) - 1 DO
        IF s[i] == s[i-1]: run += 1
        ELSE:
            total += run * (run + 1) / 2
            run = 1
    total += run * (run + 1) / 2
    RETURN total
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **Count single-character substrings by grouping runs. Each run of length L contributes L(L+1)/2 substrings — the triangular number formula.**
