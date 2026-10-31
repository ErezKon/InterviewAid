# 2001. Number of Pairs of Interchangeable Rectangles

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-pairs-of-interchangeable-rectangles](https://leetcode.com/problems/number-of-pairs-of-interchangeable-rectangles)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Reduce Ratio + Count — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given `n` rectangles represented by a **0-indexed** 2D integer array `rectangles`, where `rectangles[i] = [width_i, height_i]` denotes the width and height of the `i^th` rectangle.

Two rectangles `i` and `j` (`i < j`) are considered **interchangeable** if they have the **same** width-to-height ratio. More formally, two rectangles are **interchangeable** if `width_i/height_i == width_j/height_j` (using decimal division, not integer division).

Return *the **number** of pairs of **interchangeable** rectangles in *`rectangles`.

**Constraints:**
- `n == rectangles.length`
- `1 <= n <= 10^5`
- `rectangles[i].length == 2`
- `1 <= width_i, height_i <= 10^5`

---

## 2. Key Insight

> Reduce each rectangle’s width and height to their lowest terms using the greatest common divisor (GCD). The canonical pair `(w/g, h/g)` uniquely identifies the aspect ratio without floating-point errors. Group rectangles by this canonical ratio and count pairs within each group.

---

## 3. Approach: Reduce Ratio + Count — O(n) ✅

```text
FUNCTION interchangeableRectangles(rectangles):
    ratioCount ← MAP()
    FOR [w, h] IN rectangles:
        g ← GCD(w, h)
        key ← (w / g, h / g)    // canonical ratio as tuple
        ratioCount[key] ← ratioCount.get(key, 0) + 1

    totalPairs ← 0
    FOR count IN ratioCount.values():
        totalPairs ← totalPairs + count * (count - 1) / 2
    RETURN totalPairs
```

---

## 4. Examples

**Example 1:**
```
Input: rectangles = [[4,8],[3,6],[10,20],[15,30]]
Output: 6
Explanation: The following are the interchangeable pairs of rectangles by index (0-indexed):
- Rectangle 0 with rectangle 1: 4/8 == 3/6.
- Rectangle 0 with rectangle 2: 4/8 == 10/20.
- Rectangle 0 with rectangle 3: 4/8 == 15/30.
- Rectangle 1 with rectangle 2: 3/6 == 10/20.
- Rectangle 1 with rectangle 3: 3/6 == 15/30.
- Rectangle 2 with rectangle 3: 10/20 == 15/30.
```

**Example 2:**
```
Input: rectangles = [[4,5],[7,8]]
Output: 0
Explanation: There are no interchangeable pairs of rectangles.
```

---

## 5. Walkthrough

**Example 1** (`rectangles = [[4,8],[3,6],[10,20],[15,30]]`)

1. Rectangle `[4,8]`: `g = 4`, canonical `(1,2)` → count = 1.
2. Rectangle `[3,6]`: `g = 3`, canonical `(1,2)` → count = 2.
3. Rectangle `[10,20]`: `g = 10`, canonical `(1,2)` → count = 3.
4. Rectangle `[15,30]`: `g = 15`, canonical `(1,2)` → count = 4.
5. After processing all, `ratioCount[(1,2)] = 4`.
6. Pairs = `4 * 3 / 2 = 6`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n * log max(w,h)) — GCD per rectangle |
| **Space** | O(n) — hashmap of ratios |

---

## 7. Follow-Up Questions

1. How would you handle rectangles with very large dimensions where GCD computation becomes costly?
2. Can you extend the solution to count triples of rectangles sharing the same aspect ratio?
3. What if the problem asked for the most frequent aspect ratio instead of the total pair count?

---

## 8. Key Takeaway

> **Canonical ratio via GCD** enables O(n) counting of interchangeable rectangles using a hashmap.
