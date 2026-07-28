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

Mountains are triangles with given peak coordinates. A mountain is **visible** if it is not completely contained within another mountain. Count visible mountains.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[[1,2],[2,1],[3,2]]` | `2` | The first mountain covers the second, so only the first and third are visible. |
| `[[0,1],[1,2],[2,1]]` | `3` | No mountain is fully contained within another. |

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
