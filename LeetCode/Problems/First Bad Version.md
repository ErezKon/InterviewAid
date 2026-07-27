# 278. First Bad Version

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/first-bad-version](https://leetcode.com/problems/first-bad-version)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Whatnot

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Binary Search — O(log n) ✅](#3-approach-binary-search--olog-n-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Versions 1 to n are in sequence. One version is bad and all subsequent versions are bad. Given an API `isBadVersion(v)`, find the first bad version with minimum API calls.

**Constraints:**
- `1 <= n <= 2³¹ - 1`

---

## 2. Key Insight

> Classic binary search for the leftmost `true` in a boolean array `[false, ..., false, true, ..., true]`.

---

## 3. Approach: Binary Search — O(log n) ✅

```
FUNCTION firstBadVersion(n):
    lo, hi = 1, n
    WHILE lo < hi:
        mid = lo + (hi - lo) / 2
        IF isBadVersion(mid):
            hi = mid
        ELSE:
            lo = mid + 1
    RETURN lo
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(log n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Binary search for leftmost true** — the foundational binary search template. Use `lo + (hi - lo) / 2` to avoid overflow.
