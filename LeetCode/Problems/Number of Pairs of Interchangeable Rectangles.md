# 2001. Number of Pairs of Interchangeable Rectangles

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-pairs-of-interchangeable-rectangles](https://leetcode.com/problems/number-of-pairs-of-interchangeable-rectangles)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Reduce Ratio + Count — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count pairs of rectangles with the same aspect ratio (width/height).

---

## 2. Key Insight

> Reduce each rectangle's w/h to lowest terms using GCD. Group by canonical ratio. C(k, 2) pairs per group.

---

## 3. Approach: Reduce Ratio + Count — O(n) ✅

```
FUNCTION interchangeableRectangles(rectangles):
    ratioCount = {}
    FOR [w, h] IN rectangles:
        g = GCD(w, h)
        ratio = (w/g, h/g)
        ratioCount[ratio] = ratioCount.get(ratio, 0) + 1

    count = 0
    FOR c IN ratioCount.values():
        count += c * (c - 1) / 2

    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log(max)) — GCD per rectangle |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **GCD-reduced ratio avoids floating point.** Canonical form `(w/gcd, h/gcd)` as hash key. Count pairs with C(k, 2) per group.
