# 2345. Finding the Number of Visible Mountains

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/finding-the-number-of-visible-mountains](https://leetcode.com/problems/finding-the-number-of-visible-mountains)
**Companies:** Google, Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort + Stack — O(n log n) ✅](#4-approach-sort--stack)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given a **0-indexed** 2D integer array `peaks` where `peaks[i] = [x_i, y_i]` states that mountain `i` has a peak at coordinates `(x_i, y_i)`. A mountain can be described as a right-angled isosceles triangle, with its base along the `x`-axis and a right angle at its peak. More formally, the **gradients** of ascending and descending the mountain are `1` and `-1` respectively.

A mountain is considered **visible** if its peak does not lie within another mountain (including the border of other mountains).

Return *the number of visible mountains*.

**Constraints:**
- `1 <= peaks.length <= 10^5`
- `peaks[i].length == 2`
- `1 <= x_i, y_i <= 10^5`

---

## 2. Examples

**Example 1:**
```
Input: peaks = [[2,2],[6,3],[5,4]]
Output: 2
Explanation: The diagram above shows the mountains.
- Mountain 0 is visible since its peak does not lie within another mountain or its sides.
- Mountain 1 is not visible since its peak lies within the side of mountain 2.
- Mountain 2 is visible since its peak does not lie within another mountain or its sides.
There are 2 mountains that are visible.
```

**Example 2:**
```
Input: peaks = [[1,3],[1,3]]
Output: 0
Explanation: The diagram above shows the mountains (they completely overlap).
Both mountains are not visible since their peaks lie within each other.
```

---

## 3. Key Insight

> Convert each mountain to an interval `[peak_x - height, peak_x + height]`. A mountain is hidden if its interval is a subset of another's. Sort by left endpoint ascending, then right endpoint descending. Use a stack to track nested intervals.

---

## 4. Approach: Sort + Stack — O(n log n) ✅

```text
FUNCTION visibleMountains(peaks):
    // Convert to intervals [x - h, x + h]
    intervals ← [(x - h, x + h) for (x, h) in peaks]
    SORT intervals BY left ASC, right DESC

    SET count ← 0
    SET maxRight ← -∞
    FOR (l, r) IN intervals DO
        IF r > maxRight THEN
            count ← count + 1
            maxRight ← r
        // else r <= maxRight → this mountain is hidden
    RETURN count
```

---

## 5. Walkthrough

Consider `peaks = [[1,2],[2,1],[3,2]]`:
1. Convert to intervals: `[( -1,3 ), (1,3), (1,5 )]`.
2. Sort → `[( -1,3 ), (1,5 ), (1,3 )]` (left asc, right desc).
3. Iterate:
   - First interval `(-1,3)`: `maxRight = -∞`, so count=1, `maxRight=3`.
   - Second interval `(1,5)`: `r=5 > maxRight=3`, count=2, `maxRight=5`.
   - Third interval `(1,3)`: `r=3 <= maxRight=5`, hidden.
Result = 2 visible mountains.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — sorting dominates |
| **Space** | O(n) for interval list |

---

## 7. Follow-Up Questions

- How would you modify the algorithm if mountains could have the same interval? How would you count duplicates?
- Can you solve the problem in O(n) time using a single pass after sorting by a different key?
- How would the solution change if mountains were defined by arbitrary polygons instead of triangles?

---

## 8. Key Takeaway

> Convert mountains to intervals, sort, and greedily track the maximum right endpoint. An interval contained within a wider one is not visible. Handle duplicate intervals carefully.
