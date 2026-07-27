# 434. Number of Segments in a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-segments-in-a-string](https://leetcode.com/problems/number-of-segments-in-a-string)
**Companies:** Amazon, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Split — O(n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Count the number of non-empty segments (contiguous non-space characters) in a string.

---

## 2. Approach: Split — O(n) ✅

```
FUNCTION countSegments(s):
    RETURN len(s.split())
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) for split result |

---

## 4. Key Takeaway

> **`split()` with no args handles multiple spaces.** Alternatively, count transitions from space to non-space for O(1) space.
