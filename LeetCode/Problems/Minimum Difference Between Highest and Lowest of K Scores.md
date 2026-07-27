# 1984. Minimum Difference Between Highest and Lowest of K Scores

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores](https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores)
**Companies:** Amazon, Google, Meta, Microsoft, Tinkoff

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sort + Sliding Window — O(n log n)](#approach-sort--sliding-window--on-log-n)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` of scores and an integer `k`, pick `k` scores. The **difference** is `max(picked) - min(picked)`. Return the **minimum** possible difference.

**Constraints:**
- `1 ≤ k ≤ nums.length ≤ 1000`
- `0 ≤ nums[i] ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input: nums = [90], k = 1
Output: 0
Explanation: Only one score, difference = 0.
```

**Example 2:**
```
Input: nums = [9, 4, 1, 7], k = 2
Output: 2
Explanation: Pick {7, 9}. Difference = 9-7 = 2.
```

---

## Key Insight

> After sorting, the optimal `k` elements must be **consecutive** — any gap would increase the max-min difference. Slide a window of size `k` and check each window's difference.

---

## Approach: Sort + Sliding Window — O(n log n) ✅

```
FUNCTION minimumDifference(nums, k):
    SORT nums
    RETURN MIN(nums[i+k-1] - nums[i] for i in range(len(nums) - k + 1))
```

---

## Walkthrough

```
nums = [9, 4, 1, 7], k = 2
Sorted: [1, 4, 7, 9]
```

| Window | Elements | Difference |
|--------|----------|------------|
| [0,1] | 1, 4 | 3 |
| [1,2] | 4, 7 | 3 |
| [2,3] | 7, 9 | **2** |

**Result:** min(3, 3, 2) = **2** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — dominated by sorting |
| **Space** | O(1) — in-place sort |

---

## Follow-Up Questions

1. **Why must optimal elements be consecutive after sorting?** If you skip an element in a sorted window, the range only stays the same or increases — never decreases.
2. **What if k = n?** Answer is `max(nums) - min(nums)`.
3. **Can we do better than O(n log n)?** Not in general, since we need to identify the k closest elements.

---

## Key Takeaway

> For minimum range over k picks, **sort and slide a window** — consecutive elements in sorted order always minimize the max-min difference.
