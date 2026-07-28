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

Given an array `rectangles` where each element is `[width, height]`, count the number of pairs of indices `(i, j)` with `i < j` such that the two rectangles have the same aspect ratio `width / height`.

---

## 2. Key Insight

> Reduce each rectangle’s width and height to their lowest terms using the greatest common divisor (GCD). The canonical pair `(w/g, h/g)` uniquely identifies the aspect ratio without floating‑point errors. Group rectangles by this canonical ratio and count pairs within each group.

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

| # | Input `rectangles` | Output |
|---|--------------------|--------|
| 1 | `[[4,8],[3,6],[10,20],[15,30]]` | `6` |
| 2 | `[[1,2],[2,3],[3,4]]` | `0` |

*Example 1*: All rectangles reduce to the ratio `(1,2)`. With 4 rectangles, the number of pairs is `C(4,2) = 6`.
*Example 2*: No two rectangles share the same reduced ratio, so the answer is `0`.

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
| **Time** | O(n * log max(w,h)) — GCD per rectangle |
| **Space** | O(n) — hashmap of ratios |

---

## 7. Follow-Up Questions

1. How would you handle rectangles with very large dimensions where GCD computation becomes costly?
2. Can you extend the solution to count triples of rectangles sharing the same aspect ratio?
3. What if the problem asked for the most frequent aspect ratio instead of the total pair count?

---

## 8. Key Takeaway

> **Canonical ratio via GCD** enables O(n) counting of interchangeable rectangles using a hashmap.
