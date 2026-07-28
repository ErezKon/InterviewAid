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

```text
FUNCTION maxConsecutive(bottom, top, special):
    // sort special floors
    SORT special
    // add sentinels at boundaries
    special = [bottom - 1] + special + [top + 1]
    result ← 0
    FOR i ← 1 TO len(special) - 1:
        gap ← special[i] - special[i-1] - 1
        result ← MAX(result, gap)
    RETURN result
```

---

## Examples

**Example 1:**
```
Input: bottom = 2, top = 9, special = [4,6]
Output: 3
Explanation: The non‑special floors are [2,3], [5], [7,8,9]. The longest consecutive stretch is length 3 (floors 7‑9).
```

**Example 2:**
```
Input: bottom = 1, top = 5, special = []
Output: 5
Explanation: No special floors, so all floors from 1 to 5 are consecutive.
```

---

## Walkthrough

| Step | bottom | top | special (sorted) | Sentinels added | Gaps computed | Max gap |
|------|--------|-----|------------------|-----------------|--------------|---------|
| 1 | 2 | 9 | [4,6] | [1,4,6,10] | 4-1-1=2, 6-4-1=1, 10-6-1=3 | **3** |

The maximum gap of 3 corresponds to floors 7‑9.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + gap | **O(n log n)** | O(n) |

---

## Follow-Up Questions

1. How would you modify the solution if the list of special floors is streamed in real time?
2. Can you solve the problem in O(n) time without sorting?

---

## Key Takeaway

> **Maximum gap between sorted blockers = max consecutive free slots.** Add boundary sentinels and find the largest gap.
