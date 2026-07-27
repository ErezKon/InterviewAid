# 2345. Finding the Number of Visible Mountains

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/finding-the-number-of-visible-mountains](https://leetcode.com/problems/finding-the-number-of-visible-mountains)
**Companies:** Google, Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Stack — O(n log n) ✅](#3-approach-sort--stack--on-log-n-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Mountains are triangles with given peak coordinates. A mountain is **visible** if it is not completely contained within another mountain. Count visible mountains.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> Convert each mountain to an interval `[peak_x - height, peak_x + height]`. A mountain is hidden if its interval is a subset of another's. Sort by left endpoint ascending, then right endpoint descending. Use a stack to track nested intervals.

---

## 3. Approach: Sort + Stack — O(n log n) ✅

```
FUNCTION visibleMountains(peaks):
    // Convert to intervals [x - h, x + h]
    intervals ← [(x - h, x + h) for (x, h) in peaks]
    SORT intervals by left asc, right desc

    // Count non-contained intervals
    count ← 0; maxRight ← -∞
    FOR (l, r) IN intervals DO
        IF r > maxRight THEN
            // Check for duplicates
            count += 1
            maxRight ← r
        // If r <= maxRight, this mountain is contained

    // Handle duplicate intervals (both are hidden)
    RETURN count adjusted for duplicates
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> Convert mountains to intervals, sort, and greedily track the maximum right endpoint. An interval contained within a wider one is not visible. Handle duplicate intervals carefully.
