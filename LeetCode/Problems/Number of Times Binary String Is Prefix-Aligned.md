# 1375. Number of Times Binary String Is Prefix-Aligned

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-times-binary-string-is-prefix-aligned](https://leetcode.com/problems/number-of-times-binary-string-is-prefix-aligned)
**Companies:** Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Track Max — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Bits are flipped one at a time in a given order. Count the number of steps where the string is prefix-aligned (all set bits form a contiguous prefix).

---

## 2. Key Insight

> The string is prefix-aligned at step `i` iff the maximum flipped position so far equals `i`. All positions 1..i must have been flipped.

---

## 3. Approach: Track Max — O(n) ✅

```
FUNCTION numTimesAllBlue(flips):
    maxFlip = 0; count = 0
    FOR i ← 0 TO len(flips) - 1:
        maxFlip = MAX(maxFlip, flips[i])
        IF maxFlip == i + 1: count += 1
    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Prefix-aligned ↔ max flipped position == step number.** No need to track individual bits. Just compare running max to current step.
