# 2274. Maximum Consecutive Floors Without Special Floors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-consecutive-floors-without-special-floors](https://leetcode.com/problems/maximum-consecutive-floors-without-special-floors)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sort + Max Gap — O(n log n)](#approach-sort--max-gap--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `bottom`, `top`, and an array `special` of special floor numbers, find the maximum number of **consecutive** non-special floors between `bottom` and `top`.

---

## Key Insight

> Sort the special floors, add `bottom-1` and `top+1` as sentinels. The answer is the maximum gap between consecutive special floors minus 1.

---

## Approach: Sort + Max Gap — O(n log n) ✅

```
FUNCTION maxConsecutive(bottom, top, special):
    SORT special
    special = [bottom - 1] + special + [top + 1]
    result = 0
    FOR i ← 1 TO len(special) - 1:
        result = MAX(result, special[i] - special[i-1] - 1)
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + gap | **O(n log n)** | O(n) |

---

## Key Takeaway

> **Maximum gap between sorted blockers = max consecutive free slots.** Add boundary sentinels and find the largest gap.
