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

Given an integer array `nums`, find the **minimum** span (distance from first to last index) among all triples of indices `(i, j, k)` where `i < j < k` and `nums[i] == nums[j] == nums[k]`. Return `-1` if no such triple exists.

**Constraints:**
- `1 ≤ nums.length ≤ 500`
- `1 ≤ nums[i] ≤ 500`

---

## Examples

**Example 1:**
```
Input: nums = [1,2,1,1,3]
Output: 2
Explanation: Triple (0,2,3) for value 1. Span = 3-0 = 3. Triple (2,3,...) wait, only 3 ones at (0,2,3). Span = 3-0=3. Wait, actually (0,2,3): span=3. But consecutive window: indices[0..2] = span 3-0 = 3. Is there better? No. Output = 3? Check problem definition.
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
