# 1638. Count Substrings That Differ by One Character

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-substrings-that-differ-by-one-character](https://leetcode.com/problems/count-substrings-that-differ-by-one-character)
**Companies:** Microsoft

---

## Problem Description

Given two strings `s` and `t`, count pairs of substrings `(s[i..i+len], t[j..j+len])` of the same length that differ in **exactly one** position.

---

## Key Insight

Fix the mismatch position. For each pair `(i, j)` where `s[i] ≠ t[j]`, count how far matching extends on both sides. If there are `left` matching characters before and `right` matching characters after, this mismatch contributes `(left + 1) × (right + 1)` pairs.

---

## Approach

```
FUNCTION countSubstrings(s, t):
    result = 0
    FOR i ← 0 TO LENGTH(s) - 1 DO
        FOR j ← 0 TO LENGTH(t) - 1 DO
            IF s[i] != t[j]:
                // Count matching chars before (i,j)
                left = 0
                WHILE i-left-1 >= 0 AND j-left-1 >= 0 AND s[i-left-1] == t[j-left-1]:
                    left += 1
                // Count matching chars after (i,j)
                right = 0
                WHILE i+right+1 < len(s) AND j+right+1 < len(t) AND s[i+right+1] == t[j+right+1]:
                    right += 1
                result += (left + 1) * (right + 1)

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n × min(m,n)) worst case, but typically much better |
| **Space** | O(1) |

---

## Key Takeaway

> **"Differ by exactly one character": fix the mismatch point, extend matching on both sides. The number of valid substring pairs for that mismatch is `(left+1) × (right+1)` — a clean counting identity.**
