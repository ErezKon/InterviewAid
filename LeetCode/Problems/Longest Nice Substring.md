# 1763. Longest Nice Substring

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-nice-substring](https://leetcode.com/problems/longest-nice-substring)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## 1. Problem Description

A "nice" string has every letter appearing in both upper and lower case. Find the longest nice substring.

---

## 2. Approach: Divide and Conquer — O(n · 26) ✅

```
FUNCTION longestNiceSubstring(s):
    IF len(s) < 2: RETURN ""
    chars = SET(s)
    FOR i, c IN enumerate(s):
        IF c.swapcase() NOT IN chars:
            left = longestNiceSubstring(s[:i])
            right = longestNiceSubstring(s[i+1:])
            RETURN left IF len(left) >= len(right) ELSE right
    RETURN s
```

| Time | Space |
|------|-------|
| O(n · 26) | O(n) recursion |

---

## 3. Key Takeaway

> Split at any character missing its case counterpart. Recursively check both halves. If no split needed, the entire string is nice.
