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

You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have `n` versions `[1, 2, ..., n]` and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API `bool isBadVersion(version)` which returns whether `version` is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

**Constraints:**
- `1 <= bad <= n <= 2^31 - 1`

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
Input: n = 5, bad = 4
Output: 4
Explanation: call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true
Then 4 is the first bad version.
```

**Example 2:**
```
Input: n = 1, bad = 1
Output: 1
```

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
