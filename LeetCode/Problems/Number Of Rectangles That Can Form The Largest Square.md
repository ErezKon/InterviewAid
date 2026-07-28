# 1725. Number Of Rectangles That Can Form The Largest Square

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-rectangles-that-can-form-the-largest-square](https://leetcode.com/problems/number-of-rectangles-that-can-form-the-largest-square)
**Companies:** Allincall

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Single Pass — O(n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given a list of rectangles represented as `[length, width]`, the side length of the largest square that can be formed from a rectangle `i` is `min(length_i, width_i)`. Return the count of rectangles that can form a square of the maximum possible side length among all rectangles.

---

## 2. Examples

| rectangles | output |
|------------|--------|
| `[[4,3],[2,5],[3,3]]` | 2 |
| `[[1,2],[2,1],[2,2]]` | 1 |

*Explanation*: In the first example, the maximum square side is `3` (from rectangles `[4,3]` and `[3,3]`), and two rectangles achieve it. In the second example, the maximum side is `2` from rectangle `[2,2]` only.

---

## 3. Approach: Single Pass — O(n) ✅

```text
FUNCTION countGoodRectangles(rectangles):
    maxSide ← 0
    count ← 0
    FOR EACH [l, w] IN rectangles:
        side ← MIN(l, w)
        IF side > maxSide:
            maxSide ← side
            count ← 1
        ELSE IF side == maxSide:
            count ← count + 1
    RETURN count
```

---

## 4. Walkthrough

Consider `rectangles = [[4,3],[2,5],[3,3]]`.

1. Initialize `maxSide = 0`, `count = 0`.
2. Rectangle `[4,3]`: `side = 3`. `3 > 0` → `maxSide = 3`, `count = 1`.
3. Rectangle `[2,5]`: `side = 2`. `2 < 3` → no change.
4. Rectangle `[3,3]`: `side = 3`. `3 == maxSide` → `count = 2`.
5. End of loop, return `2`.

The algorithm correctly counts the two rectangles that can form the largest square of side `3`.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Key Takeaway

> **Track the maximum square side and its frequency in one pass.** Each rectangle contributes `min(length, width)` as its best square side, and we simply count how many achieve the global maximum.
