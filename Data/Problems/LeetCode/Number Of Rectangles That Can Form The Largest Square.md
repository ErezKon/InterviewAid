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

You are given an array `rectangles` where `rectangles[i] = [l_i, w_i]` represents the `i^th` rectangle of length `l_i` and width `w_i`.

You can cut the `i^th` rectangle to form a square with a side length of `k` if both `k <= l_i` and `k <= w_i`. For example, if you have a rectangle `[4,6]`, you can cut it to get a square with a side length of at most `4`.

Let `maxLen` be the side length of the **largest** square you can obtain from any of the given rectangles.

Return *the **number** of rectangles that can make a square with a side length of* `maxLen`.

**Constraints:**

- `1 <= rectangles.length <= 1000`
- `rectangles[i].length == 2`
- `1 <= l_i, w_i <= 10^9`
- `l_i != w_i`

---

## 2. Examples

```
Example 1:
  Input: rectangles = [[5,8],[3,9],[5,12],[16,5]]
  Output: 3
  Explanation: The largest squares you can get from each rectangle are of lengths [5,3,5,5].
  The largest possible square is of length 5, and you can get it out of 3 rectangles.
```

```
Example 2:
  Input: rectangles = [[2,3],[3,7],[4,3],[3,7]]
  Output: 3
```

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
