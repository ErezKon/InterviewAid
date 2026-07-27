# 1725. Number Of Rectangles That Can Form The Largest Square

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-rectangles-that-can-form-the-largest-square](https://leetcode.com/problems/number-of-rectangles-that-can-form-the-largest-square)
**Companies:** Allincall

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Single Pass — O(n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Given rectangles `[l, w]`, the max square side from rectangle `i` is `min(l, w)`. Return how many rectangles achieve the overall maximum square side.

---

## 2. Approach: Single Pass — O(n) ✅

```
FUNCTION countGoodRectangles(rectangles):
    maxLen = 0; count = 0
    FOR [l, w] IN rectangles:
        side = MIN(l, w)
        IF side > maxLen:
            maxLen = side; count = 1
        ELIF side == maxLen:
            count += 1
    RETURN count
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Track max and count in one pass.** Each rectangle's best square = `min(l, w)`. Count how many achieve the global max.
