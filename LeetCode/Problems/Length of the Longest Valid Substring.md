# 2781. Length of the Longest Valid Substring

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Google, Meta

---

## 1. Problem Description

Given a string and a list of forbidden substrings (each ≤ 10 chars), find the longest substring containing no forbidden word.

---

## 2. Approach: Reverse Sliding Window — O(n·10) ✅

Scan right to left. For each `left`, check substrings of length 1–10 starting at `left`. If forbidden, tighten `right`.

```
FUNCTION longestValidSubstring(word, forbidden):
    forbSet = SET(forbidden); maxLen = 0; right = len(word) - 1
    FOR left ← len(word) - 1 DOWN TO 0:
        FOR k ← left TO MIN(left + 9, right):
            IF word[left:k+1] IN forbSet: right = k - 1; BREAK
        maxLen = MAX(maxLen, right - left + 1)
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n · 10) = O(n) | O(F) for forbidden set |

---

## 3. Key Takeaway

> Exploit the constraint that forbidden words are ≤ 10 chars. For each position, only check 10 substrings. Tighten the right boundary when a forbidden word is found.
