# 28. Find the Index of the First Occurrence in a String

**Difficulty:** 🟢 Easy
**Acceptance:** 43.0%
**LeetCode:** [https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string)
**Companies:** Amazon, Apple, Bloomberg, Capgemini, Expedia, Google, Infosys, Lg Electronics, Linkedin, Meta, Microsoft, Pocket Gems, Qualcomm, Tcs, Zoho

---

## 1. Problem Description

Given two strings `haystack` and `needle`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if not found.

---

## 2. Examples

```
Example 1:
  Input:  haystack = "sadbutsad", needle = "sad"
  Output: 0

Example 2:
  Input:  haystack = "leetcode", needle = "leeto"
  Output: -1
```

---

## 3. Approach 1: Brute Force — O(n·m)

```
FUNCTION strStr(haystack, needle):
    FOR i ← 0 TO len(haystack) - len(needle):
        IF haystack[i..i+len(needle)-1] == needle:
            RETURN i
    RETURN -1
```

---

## 4. Approach 2: KMP — O(n+m) ✅

Build a failure function (prefix table) for the needle, then scan the haystack without backtracking.

```
FUNCTION strStr(haystack, needle):
    // Build prefix table
    lps = array of len(needle) zeros
    len = 0, i = 1
    WHILE i < len(needle):
        IF needle[i] == needle[len]:
            len += 1
            lps[i] = len
            i += 1
        ELSE IF len > 0:
            len = lps[len - 1]
        ELSE:
            lps[i] = 0
            i += 1

    // Search
    i = 0, j = 0
    WHILE i < len(haystack):
        IF haystack[i] == needle[j]:
            i += 1; j += 1
            IF j == len(needle):
                RETURN i - j
        ELSE IF j > 0:
            j = lps[j - 1]
        ELSE:
            i += 1

    RETURN -1
```

---

## 5. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute Force | O(n·m) | O(1) |
| **KMP** | **O(n+m)** | **O(m)** |

---

## 6. Follow-Up Questions

### 6.1 Other string matching algorithms?

- **Rabin-Karp**: Rolling hash, O(n+m) average. Good for multi-pattern search.
- **Boyer-Moore**: Skip characters based on mismatch. Often sublinear in practice.
- **Z-Algorithm**: Builds Z-array for combined pattern+text string.

---

## Key Takeaway

> KMP's prefix function eliminates redundant comparisons. For interviews, brute force is usually acceptable, but mentioning KMP shows depth. Rabin-Karp is useful when searching for multiple patterns.
