# 3297. Count Substrings That Can Be Rearranged to Contain a String I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-substrings-that-can-be-rearranged-to-contain-a-string-i](https://leetcode.com/problems/count-substrings-that-can-be-rearranged-to-contain-a-string-i)
**Companies:** Amazon

---

## Problem Description

Given strings `word1` and `word2`, count substrings of `word1` that can be rearranged to **contain** `word2` as a substring (i.e., the substring has at least as many of each character as `word2`).

---

## Key Insight

This is equivalent to: count substrings of `word1` whose character frequency dominates `word2`'s frequency. Use a **sliding window** that shrinks from the left once the condition is met, then count all right-extensions.

---

## Approach

```
FUNCTION countSubstrings(word1, word2):
    need = Counter(word2)
    have = Counter()
    formed = 0; required = len(need)
    left = 0; result = 0

    FOR right ← 0 TO LENGTH(word1) - 1 DO
        c = word1[right]
        have[c] += 1
        IF have[c] == need[c]: formed += 1

        WHILE formed == required:
            result += LENGTH(word1) - right  // all extensions valid
            lc = word1[left]
            have[lc] -= 1
            IF have[lc] < need[lc]: formed -= 1
            left += 1

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n = length of word1 |
| **Space** | O(26) = O(1) |

---

## Key Takeaway

> **"Contains as anagram" substring counting = sliding window with character frequency tracking. Once all required frequencies are met, count all right-extensions and shrink from the left.**
