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

Given an integer array `nums` **(0-indexed)** and two integers `target` and `start`, find an index `i` such that `nums[i] == target` and `abs(i - start)` is **minimized**. Note that `abs(x)` is the absolute value of `x`.

Return `abs(i - start)`.

It is **guaranteed** that `target` exists in `nums`.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 10^4`
- `0 <= start < nums.length`
- `target` is in `nums`.

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4,5], target = 5, start = 3
Output: 1
Explanation: nums[4] = 5 is the only value equal to target, so the answer is abs(4 - 3) = 1.
```

**Example 2:**
```
Input: nums = [1], target = 1, start = 0
Output: 0
Explanation: nums[0] = 1 is the only value equal to target, so the answer is abs(0 - 0) = 0.
```

**Example 3:**
```
Input: nums = [1,1,1,1,1,1,1,1,1,1], target = 1, start = 0
Output: 0
Explanation: Every value of nums is 1, but nums[0] minimizes abs(i - start), which is abs(0 - 0) = 0.
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
