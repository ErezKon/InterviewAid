# 2251. Number of Flowers in Full Bloom

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-flowers-in-full-bloom](https://leetcode.com/problems/number-of-flowers-in-full-bloom)
**Companies:** Capital One, Cohesity, Databricks, Google, Oracle, Phonepe, Roblox, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Binary Search on Sorted Start/End — O((n+m) log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given flower bloom intervals `[start, end]` and arrival times `people`, for each person determine how many flowers are in bloom when they arrive.

---

## 2. Key Insight

> Active flowers at time `t` = (flowers that started ≤ t) - (flowers that ended < t). Sort starts and ends separately, use binary search for each query.

---

## 3. Approach: Binary Search on Sorted Start/End — O((n+m) log n) ✅

```
FUNCTION fullBloomFlowers(flowers, people):
    starts = SORT([s for s, e in flowers])
    ends = SORT([e for s, e in flowers])

    result = []
    FOR time IN people:
        bloomed = bisect_right(starts, time)
        wilted = bisect_left(ends, time)
        result.ADD(bloomed - wilted)

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O((n + m) log n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Separate start/end arrays + binary search.** Active count = bloomed - wilted. `bisect_right(starts, t)` counts starts ≤ t, `bisect_left(ends, t)` counts ends < t.
