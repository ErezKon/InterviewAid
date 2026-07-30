# 1287. Element Appearing More Than 25% In Sorted Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/element-appearing-more-than-25-in-sorted-array](https://leetcode.com/problems/element-appearing-more-than-25-in-sorted-array)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Check Quarter-Spaced Elements](#approach-check-quarter-spaced-elements--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a **sorted** integer array, find the element that occurs more than **25%** of the time.

**Constraints:**
- `1 <= arr.length <= 10^4`
- Exactly one such element is guaranteed to exist

---

## Examples

```
Input: arr = [1,2,2,6,6,6,6,7,10]
Output: 6
Explanation: 6 appears 4 times out of 9 elements (44% > 25%).
```

---

## Key Insight

> In a sorted array, if an element appears more than `n/4` times, it must span a contiguous block of length > `n/4`. So `arr[i] == arr[i + n/4]` for some `i`. Just check every element against the one `n/4` positions ahead.

---

## Approach: Check Quarter-Spaced Elements — O(n) ✅

```
FUNCTION findSpecialInteger(arr):
    quarter = len(arr) / 4
    FOR i ← 0 TO len(arr) - quarter - 1:
        IF arr[i] == arr[i + len(arr)//4]: RETURN arr[i]
```

---

## Walkthrough

```
arr = [1, 2, 2, 6, 6, 6, 6, 7, 10], n=9, quarter=2

i=0: arr[0]=1 vs arr[2]=2 → ✗
i=1: arr[1]=2 vs arr[3]=6 → ✗
i=2: arr[2]=2 vs arr[4]=6 → ✗
i=3: arr[3]=6 vs arr[5]=6 → ✅ RETURN 6
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **In a sorted array, a frequent element spans a long contiguous block. Comparing `arr[i]` with `arr[i + n/4]` instantly detects a >25% element.**
