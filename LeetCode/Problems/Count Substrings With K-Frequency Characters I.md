# 3325. Count Substrings With K-Frequency Characters I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-substrings-with-k-frequency-characters-i](https://leetcode.com/problems/count-substrings-with-k-frequency-characters-i)
**Companies:** Google

---

## Problem Description

Given a string `s` and integer `k`, count substrings that contain at least one character with frequency ≥ `k`.

---

## Approach

```
FUNCTION countSubstrings(s, k):
    n = LENGTH(s)
    result = 0; left = 0
    freq = [0] * 26

    FOR right ← 0 TO n - 1 DO
        freq[s[right] - 'a'] += 1
        WHILE ANY freq[c] >= k:
            result += n - right   // all extensions also valid
            freq[s[left] - 'a'] -= 1
            left += 1

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(26 × n) = O(n) |
| **Space** | O(26) = O(1) |

---

## Key Takeaway

> **"At least one character with frequency ≥ k": sliding window, shrink from left once condition is met, count all right-extensions each time.**
