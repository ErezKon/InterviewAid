# 2981. Find Longest Special Substring That Occurs Thrice I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-longest-special-substring-that-occurs-thrice-i](https://leetcode.com/problems/find-longest-special-substring-that-occurs-thrice-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

A **special** substring contains only one distinct character. Find the longest special substring that occurs at least 3 times. Return -1 if none exists.

---

## Approach: Binary Search on Length — O(n log n) ✅

```
FUNCTION maximumLength(s):
    lo, hi = 1, len(s) - 2
    result = -1

    WHILE lo <= hi:
        mid = (lo + hi) / 2
        count = Counter()
        FOR i ← 0 TO len(s) - mid:
            sub = s[i:i+mid]
            IF len(SET(sub)) == 1: count[sub] += 1
        IF any(v >= 3 for v in count.values()):
            result = mid; lo = mid + 1
        ELSE:
            hi = mid - 1

    RETURN result
```

---

## Key Takeaway

> **Binary search on answer length. For each candidate length, check if any single-character substring of that length appears ≥ 3 times.**
