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

```text
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

---

## 3. Examples

| s1 | s2 | Output |
|----|----|--------|
| "ab" | "eidbaooo" | true |
| "ab" | "eidboaoo" | false |
| "adc" | "dcda" | true |

---

## 4. Walkthrough

Consider `s1 = "ab"`, `s2 = "eidbaooo"`.

1. Window size = 2. Initial window "ei": counts differ → `matches` < 26.
2. Slide to "id": still mismatched.
3. Slide to "db": still mismatched.
4. Slide to "ba": counts match `a:1, b:1` → `matches` becomes 26 → return **true**.

The algorithm stops as soon as a matching window is found.

---

## 5. Complexity Analysis

- **Time:** O(n) where n = `len(s2)`, each character enters and leaves the window once.
- **Space:** O(1) – fixed size arrays of length 26 for character frequencies.

---

## Key Takeaway

> Fixed-size sliding window with a `matches` counter. Same pattern as Find All Anagrams (#438) but returns boolean instead of all positions.
