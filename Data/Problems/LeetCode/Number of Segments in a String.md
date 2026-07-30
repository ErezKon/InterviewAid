# 434. Number of Segments in a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-segments-in-a-string](https://leetcode.com/problems/number-of-segments-in-a-string)
**Companies:** Amazon, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Walkthrough](#3-walkthrough)
4. [Approach: Split — O(n)](#4-approach)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Count the number of non-empty segments (contiguous non-space characters) in a string.

---

## Examples

**Example 1:**
```
Input: s = "Hello, my name is John"
Output: 5
Explanation: The segments are ["Hello,", "my", "name", "is", "John"].
```

**Example 2:**
```
Input: s = "   "
Output: 0
Explanation: No non‑empty segments exist.
```
---

## Walkthrough

For Example 1, splitting the string on whitespace yields the list `["Hello,", "my", "name", "is", "John"]`. Its length is 5, which is the answer. For Example 2, splitting results in an empty list, so the answer is 0.
---

## Approach: Split — O(n) ✅

```text
FUNCTION countSegments(s):
    // split on any whitespace, discarding empty tokens
    RETURN LENGTH(s.split())
```
---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) for split result |
---

## Key Takeaway

> **`split()` with no args handles multiple spaces.** Alternatively, count transitions from space to non-space for O(1) space.
