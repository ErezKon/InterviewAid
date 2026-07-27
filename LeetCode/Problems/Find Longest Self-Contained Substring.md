# 3104. Find Longest Self-Contained Substring

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-longest-self-contained-substring](https://leetcode.com/problems/find-longest-self-contained-substring)
**Companies:** Amazon

---

## Problem Description

Find the longest substring where every character in it appears **only** within this substring (self-contained). Must be a proper substring (not the entire string).

---

## Key Insight

> A substring `s[l..r]` is self-contained if for every character `c` in it, `first[c] >= l` and `last[c] <= r`. Track first/last occurrence of each character and expand/validate windows.

---

## Approach: Character Range Validation — O(26·n) ✅

```
FUNCTION longestSelfContained(s):
    first = {c: first index}; last = {c: last index}
    result = -1
    FOR each possible left boundary l:
        r = l
        FOR each char c in s[l..r]:
            r = MAX(r, last[c])
            IF first[c] < l: BREAK  // c appears before l, invalid
        IF valid AND r < len(s) - 1:
            result = MAX(result, r - l + 1)
    RETURN result
```

---

## Key Takeaway

> **Self-contained = all character occurrences are within the window. Track first/last positions per character to validate and expand windows.**
