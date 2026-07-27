# 567. Permutation in String

**Difficulty:** 🟡 Medium
**Acceptance:** 43.0%
**LeetCode:** [https://leetcode.com/problems/permutation-in-string](https://leetcode.com/problems/permutation-in-string)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Cisco, Databricks, Goldman Sachs, Google, Meta, Microsoft, Oracle, Tcs, Tiktok, Vk, Walmart Labs, Yandex

---

## 1. Problem Description

Given strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`.

---

## 2. Approach: Sliding Window — O(n) ✅

Fixed window of size `len(s1)`. Compare frequency counts.

```
FUNCTION checkInclusion(s1, s2):
    IF len(s1) > len(s2): RETURN false

    s1Count = frequency of s1
    windowCount = frequency of s2[0..len(s1)-1]
    matches = count of chars where s1Count[c] == windowCount[c]

    IF matches == 26: RETURN true

    FOR i ← len(s1) TO len(s2) - 1:
        // Add right character
        c = s2[i]
        IF windowCount[c] == s1Count[c]: matches -= 1
        windowCount[c] += 1
        IF windowCount[c] == s1Count[c]: matches += 1

        // Remove left character
        c = s2[i - len(s1)]
        IF windowCount[c] == s1Count[c]: matches -= 1
        windowCount[c] -= 1
        IF windowCount[c] == s1Count[c]: matches += 1

        IF matches == 26: RETURN true

    RETURN false
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Fixed-size sliding window with a `matches` counter. Same pattern as Find All Anagrams (#438) but returns boolean instead of all positions.
