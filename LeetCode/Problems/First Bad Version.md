# 278. First Bad Version

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/first-bad-version](https://leetcode.com/problems/first-bad-version)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Whatnot

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Binary Search — O(log n) ✅](#3-approach-binary-search--olog-n-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

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

```text
FUNCTION firstBadVersion(n):
    lo ← 1
    hi ← n
    WHILE lo < hi DO
        mid ← lo + (hi - lo) / 2
        IF isBadVersion(mid) THEN
            hi ← mid
        ELSE
            lo ← mid + 1
    RETURN lo
```

---

## 4. Examples

**Example 1:**
```
n = 5, bad version = 4
```
Calling `isBadVersion` on versions 3 (false) and 4 (true) leads to answer `4`.

**Example 2:**
```
n = 1, bad version = 1
```
Only one version, which is bad, so answer `1`.

---

## 5. Walkthrough

| Step | lo | hi | mid | isBadVersion(mid) | Action |
|------|----|----|-----|-------------------|--------|
| 1 | 1 | 5 | 3 | false | lo ← mid + 1 → 4 |
| 2 | 4 | 5 | 4 | true | hi ← mid → 4 |
| 3 | 4 | 4 | - | - | loop ends, return lo = 4 |

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(log n) |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

- How would you adapt the algorithm if `isBadVersion` were expensive and you wanted to minimize calls further?
- Can you solve the problem when versions are stored in a distributed system with network latency?

---

## 8. Key Takeaway

> **Binary search for leftmost true** — the foundational binary search template. Use `lo + (hi - lo) / 2` to avoid overflow.
