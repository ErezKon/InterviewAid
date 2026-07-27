# 186. Reverse Words in a String II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reverse-words-in-a-string-ii](https://leetcode.com/problems/reverse-words-in-a-string-ii)
**Companies:** Amazon, Microsoft, Servicenow, Uber

---

## Problem Description

Given a character array `s`, reverse the order of **words** in-place using O(1) extra space. Words are separated by single spaces; no leading/trailing spaces.

- **Example:** `['t','h','e',' ','s','k','y']` → `['s','k','y',' ','t','h','e']`

---

## Key Insight

> Reverse the entire array, then reverse each word individually — the classic **two-pass reversal** technique for in-place word reordering.

---

## Approach

```
FUNCTION reverseWords(s):
    // Reverse entire string, then reverse each word
    REVERSE(s, 0, len(s) - 1)
    start = 0
    FOR i ← 0 TO len(s):
        IF i == len(s) OR s[i] == ' ':
            REVERSE(s, start, i - 1)
            start = i + 1
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> The "reverse all then reverse parts" technique is the fundamental approach for in-place word/block reordering — also used in array rotation (LeetCode #189).
