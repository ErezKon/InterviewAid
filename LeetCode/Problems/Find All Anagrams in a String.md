# 438. Find All Anagrams in a String

**Difficulty:** 🟡 Medium
**Acceptance:** 52.0%
**LeetCode:** [https://leetcode.com/problems/find-all-anagrams-in-a-string](https://leetcode.com/problems/find-all-anagrams-in-a-string)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Bolt, Databricks, Google, Meta, Microsoft, Revolut, Snowflake, Splunk, Tiktok, Uber, Walmart Labs, Yandex

---

## 1. Problem Description

Given strings `s` and `p`, find all start indices of `p`'s anagrams in `s`. Return in any order.

---

## 2. Approach: Sliding Window — O(n) ✅

Maintain a frequency count window of size `len(p)`. Track how many characters have the correct count.

```
FUNCTION findAnagrams(s, p):
    IF len(s) < len(p): RETURN []

    pCount = frequency of p
    sCount = frequency of s[0..len(p)-1]
    result = []
    matches = 0

    // Count initial matches
    FOR c ← 'a' TO 'z':
        IF sCount[c] == pCount[c]: matches += 1

    // Slide window
    FOR i ← 0 TO len(s) - len(p):
        IF matches == 26: result.ADD(i)

        IF i + len(p) < len(s):
            // Add right character
            c = s[i + len(p)]
            IF sCount[c] == pCount[c]: matches -= 1
            sCount[c] += 1
            IF sCount[c] == pCount[c]: matches += 1

            // Remove left character
            c = s[i]
            IF sCount[c] == pCount[c]: matches -= 1
            sCount[c] -= 1
            IF sCount[c] == pCount[c]: matches += 1

    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(1) (26 chars) |

---

## Key Takeaway

> Fixed-size sliding window with frequency comparison. The `matches` counter avoids comparing all 26 characters at each step — O(1) per slide.
