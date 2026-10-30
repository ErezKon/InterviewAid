# 3740. Minimum Distance Between Three Equal Elements I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-distance-between-three-equal-elements-i](https://leetcode.com/problems/minimum-distance-between-three-equal-elements-i)
**Companies:** Amazon, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Group Indices — O(n)](#approach-group-indices--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums`.

A tuple `(i, j, k)` of 3 **distinct** indices is **good** if `nums[i] == nums[j] == nums[k]`.

The **distance** of a **good** tuple is `abs(i - j) + abs(j - k) + abs(k - i)`, where `abs(x)` denotes the **absolute value** of `x`.

Return an integer denoting the **minimum** possible **distance** of a **good** tuple. If no **good** tuples exist, return `-1`.

**Constraints:**
- `1 <= n == nums.length <= 100`
- `1 <= nums[i] <= n`

---

## Examples

**Example 1:**
```
Input: nums = [1,2,1,1,3]
Output: 6
Explanation: The minimum distance is achieved by the good tuple (0, 2, 3).
(0, 2, 3) is a good tuple because nums[0] == nums[2] == nums[3] == 1. Its distance is abs(0 - 2) + abs(2 - 3) + abs(3 - 0) = 2 + 1 + 3 = 6.
```

**Example 2:**
```
Input: nums = [1,1,2,3,2,1,2]
Output: 8
Explanation: The minimum distance is achieved by the good tuple (2, 4, 6).
(2, 4, 6) is a good tuple because nums[2] == nums[4] == nums[6] == 2. Its distance is abs(2 - 4) + abs(4 - 6) + abs(6 - 2) = 2 + 2 + 4 = 8.
```

**Example 3:**
```
Input: nums = [1]
Output: -1
Explanation: There are no good tuples. Therefore, the answer is -1.
```

---

## Key Insight

> Same as Part II but with smaller constraints. Group indices by value, slide a window of 3 over each group, minimize the span `indices[t] - indices[t-2]`.

---

## Approach: Group Indices — O(n) ✅

```
FUNCTION minDistance(nums):
    groups ← map from value to list of indices
    FOR i, num IN enumerate(nums):
        groups[num].APPEND(i)

    result ← infinity
    FOR indices IN groups.values():
        IF len(indices) < 3: CONTINUE
        FOR t ← 2 TO len(indices)-1:
            result ← MIN(result, indices[t] - indices[t-2])

    RETURN result IF result < infinity ELSE -1
```

---

## Walkthrough

```
nums = [1,2,1,1,3]
groups: 1→[0,2,3], 2→[1], 3→[4]
```

Group 1: window (0,2,3) → span = 3-0 = **3** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — group + scan |
| **Space** | O(n) — index lists |

---

## Key Takeaway

> Group indices by value, slide a window of size 3, minimize the span — identical pattern to Part II with different constraints.
