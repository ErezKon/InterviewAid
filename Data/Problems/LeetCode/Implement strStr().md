# 28. Find the Index of the First Occurrence in a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string)
**Companies:** Amazon, Apple, Bloomberg, Capgemini, Expedia, Google, Infosys, Lg Electronics, Linkedin, Meta, Microsoft, Pocket Gems, Qualcomm, Tcs, Zoho

---

## 1. Problem Description

Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

**Constraints:**
- `1 <= haystack.length, needle.length <= 10^4`
- `haystack` and `needle` consist of only lowercase English characters.

## 2. Approach 1: Built-in — O(nm)

```
RETURN haystack.indexOf(needle)
```

## 3. Approach 2: KMP — O(n+m) ✅

```
FUNCTION strStr(haystack, needle):
    // Build failure function (LPS array)
    lps = [0] * len(needle)
    j = 0
    FOR i ← 1 TO len(needle) - 1:
        WHILE j > 0 AND needle[i] != needle[j]:
            j ← lps[j-1]
        IF needle[i] == needle[j]:
            j ← j + 1
        lps[i] ← j

    // Search using LPS
    j = 0
    FOR i ← 0 TO len(haystack) - 1:
        WHILE j > 0 AND haystack[i] != needle[j]:
            j ← lps[j-1]
        IF haystack[i] == needle[j]:
            j ← j + 1
        IF j == len(needle):
            RETURN i - j + 1

    RETURN -1
```

## Examples

**Example 1:**
```
Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.
```

**Example 2:**
```
Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.
```

## Walkthrough

| Step | i (haystack index) | j (needle index) | Action |
|------|--------------------|------------------|--------|
| 1 | 0 | 0 | characters match 's' == 's' → j=1 |
| 2 | 1 | 1 | match 'a' == 'a' → j=2 |
| 3 | 2 | 2 | match 'd' == 'd' → j=3 (needle length) → return 0 |

## Complexity Analysis

- **Time:** O(n + m) where n = |haystack|, m = |needle| (building LPS + single pass).
- **Space:** O(m) for the LPS array.

## Follow-Up Questions

- How would you adapt KMP to handle multiple pattern searches simultaneously?
- Can you implement a rolling hash (Rabin-Karp) solution for this problem?

## Key Takeaway

> KMP builds a failure function to avoid re-examining characters, achieving linear time string matching.
