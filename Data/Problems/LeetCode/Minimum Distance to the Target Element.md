# 1848. Minimum Distance to the Target Element

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-distance-to-the-target-element](https://leetcode.com/problems/minimum-distance-to-the-target-element)
**Companies:** Amazon, Bloomberg, Google, Honeywell

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Linear Scan — O(n)](#approach-linear-scan--on)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given array `nums`, a `target` value, and a `start` index, return the **minimum** `|i - start|` where `nums[i] == target`.

**Constraints:**
- `1 ≤ nums.length ≤ 1000`
- `1 ≤ nums[i] ≤ 10⁴`
- `target` is guaranteed to exist in `nums`

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4,5], target = 5, start = 3
Output: 1
Explanation: nums[4] = 5, |4-3| = 1.
```

---

## Key Insight

> Simple scan: check every index where `nums[i] == target`, track the minimum distance to `start`.

---

## Approach: Linear Scan — O(n) ✅

```
FUNCTION getMinDistance(nums, target, start):
    RETURN MIN(ABS(i - start) for i, num in enumerate(nums) if num == target)
```

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> Straightforward scan problem — find all matching indices and minimize the absolute distance.
