# 3034. Number of Subarrays That Match a Pattern I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-i](https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-i)
**Companies:** Amazon, Autodesk, Capital One, Uber, Visa

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Brute Force — O(n · m)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Count subarrays of `nums` of length `m+1` that match a given pattern of increases (1), decreases (-1), and equals (0).

---

## 2. Examples

| nums | pattern | Output |
|------|---------|--------|
| [1,2,3,2,1] | [1,1,-1,-1] | 1 |
| [5,4,3,2,1] | [-1,-1,-1,-1] | 1 |

*Explanation*: In the first example, only subarray `[1,2,3,2]` matches the pattern of up, up, down.

---

## 3. Approach: Brute Force — O(n · m) ✅

```text
FUNCTION countMatchingSubarrays(nums, pattern):
    count ← 0
    n ← LENGTH(nums)
    m ← LENGTH(pattern)
    FOR i ← 0 TO n - m - 1:
        match ← true
        FOR j ← 0 TO m - 1:
            diff ← nums[i + j + 1] - nums[i + j]
            IF (pattern[j] = 1 AND diff ≤ 0) OR
               (pattern[j] = -1 AND diff ≥ 0) OR
               (pattern[j] = 0 AND diff ≠ 0):
                match ← false
                BREAK
        IF match:
            count ← count + 1
    RETURN count
```

---

## 4. Walkthrough

Take `nums = [1,2,3,2,1]`, `pattern = [1,1,-1,-1]`.

1. `i = 0`: compare differences `[+1, +1, -1, -1]` → matches → count = 1.
2. `i = 1`: differences `[+1, -1, -1]` (insufficient length) → stop.

Result: 1 matching subarray.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · m) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How can you improve the solution to O(n + m) using KMP or Z‑algorithm?
2. What changes are needed if the pattern includes "any" (wildcard) symbols?

---

## 7. Key Takeaway

> **Convert consecutive differences to a pattern signature, then match.** For Part II, use KMP/Z‑algorithm on the difference array for linear time.
