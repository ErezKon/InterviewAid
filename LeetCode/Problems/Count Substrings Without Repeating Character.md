# 2743. Count Substrings Without Repeating Character

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-substrings-without-repeating-character](https://leetcode.com/problems/count-substrings-without-repeating-character)
**Companies:** Yandex

---

## Problem Description

Given a string `s`, return the number of substrings that have **no repeating characters** (all characters are unique).

---

## Key Insight

Classic sliding window for "longest substring without repeating characters" — but instead of tracking the max length, **count** all valid substrings. For each `right`, the number of valid substrings ending at `right` is `right - left + 1`.

---

## Approach

```
FUNCTION countSubstrings(s):
    left = 0; result = 0
    seen = {}  // char → last index

    FOR right ← 0 TO LENGTH(s) - 1 DO
        IF s[right] IN seen AND seen[s[right]] >= left:
            left = seen[s[right]] + 1
        seen[s[right]] = right
        result += right - left + 1

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(26) = O(1) |

---

## Key Takeaway

> **Counting all-unique-character substrings = sliding window tracking last seen index. Each position contributes `window_length` valid substrings ending there.**
