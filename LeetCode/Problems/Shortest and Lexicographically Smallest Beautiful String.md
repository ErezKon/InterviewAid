# 2904. Shortest and Lexicographically Smallest Beautiful String

**Difficulty:** 🟡 Medium

**Companies:** Ibm, Wells Fargo, Yelp
---

## Problem Description

Given a binary string `s` and integer `k`, find the shortest substring with exactly `k` ones. If tied, return the lexicographically smallest.

---

## Approach

```
FUNCTION shortestBeautifulSubstring(s, k):
    best = ''; minLen = infinity
    left = 0; ones = 0
    FOR right ← 0 TO len(s) - 1:
        ones += (s[right] == '1')
        WHILE ones > k OR (left <= right AND s[left] == '0'):
            ones -= (s[left] == '1'); left += 1
        IF ones == k:
            sub = s[left:right+1]
            IF len(sub) < minLen OR (len(sub) == minLen AND sub < best):
                minLen = len(sub); best = sub
```
