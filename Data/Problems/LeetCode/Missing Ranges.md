# 163. Missing Ranges

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/missing-ranges](https://leetcode.com/problems/missing-ranges)
**Companies:** Apple, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Linear Scan — O(n)](#4-approach-linear-scan--on)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given a sorted unique array `nums` and bounds `[lower, upper]`, return a list of ranges `[a, b]` covering all missing numbers.

**Constraints:**
- `0 <= nums.length <= 100`

---

## 2. Examples

```
Example 1:
  Input: nums = [0, 1, 3, 50, 75], lower = 0, upper = 99
  Output: [[2,2],[4,49],[51,74],[76,99]]
```

---

## 3. Key Insight

> Track `prev` (previous boundary). For each number and the boundaries, if there's a gap ≥ 2 between prev and current, add the range `[prev+1, curr-1]`.

---

## 4. Approach: Linear Scan — O(n) ✅

```
FUNCTION findMissingRanges(nums, lower, upper):
    result = []
    prev = lower - 1
    FOR i ← 0 TO len(nums):
        curr = nums[i] IF i < len(nums) ELSE upper + 1
        IF curr - prev >= 2:
            result.ADD([prev + 1, curr - 1])
        prev = curr
    RETURN result
```

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) extra |

---

## 6. Key Takeaway

> **Gap detection with boundary sentinels.** Use `lower-1` and `upper+1` as virtual boundaries. Any gap ≥ 2 between consecutive values forms a missing range.
