# 3741. Minimum Distance Between Three Equal Elements II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-distance-between-three-equal-elements-ii](https://leetcode.com/problems/minimum-distance-between-three-equal-elements-ii)
**Companies:** Amazon, Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Group + Sliding Window — O(n)](#approach-group--sliding-window--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: the Approach below returns the span `idx[t] − idx[t−2]`, but the official distance `|i−j| + |j−k| + |k−i|` equals **twice** the span for sorted indices. Return `2 · min span` (or -1).*

You are given an integer array `nums`.

A tuple `(i, j, k)` of 3 **distinct** indices is **good** if `nums[i] == nums[j] == nums[k]`.

The **distance** of a **good** tuple is `abs(i - j) + abs(j - k) + abs(k - i)`, where `abs(x)` denotes the **absolute value** of `x`.

Return an integer denoting the **minimum** possible **distance** of a **good** tuple. If no **good** tuples exist, return `-1`.

**Constraints:**
- `1 <= n == nums.length <= 10^5`
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

> Group indices by value. For each group with ≥ 3 indices, the distance of triple `(i,j,k)` is `k-i` (the span from first to last, since `i<j<k`). To minimize `k-i`, check all **consecutive triplets** in the group — sliding window of size 3.

---

## Approach: Group + Sliding Window — O(n) ✅

```
FUNCTION minDistance(nums):
    groups ← map from value to list of indices
    FOR i, num IN enumerate(nums):
        groups[num].APPEND(i)

    result ← infinity
    FOR indices IN groups.values():
        IF len(indices) < 3: CONTINUE
        FOR t ← 2 TO len(indices)-1:
            span ← indices[t] - indices[t-2]
            result ← MIN(result, span)

    RETURN result IF result < infinity ELSE -1
```

---

## Walkthrough

```
nums = [1,2,1,3,1,2]
groups: 1→[0,2,4], 2→[1,5], 3→[3]
```

Group 1 (indices [0,2,4]): window (0,2,4) → span = 4-0 = **4**
Groups 2, 3: fewer than 3 → skip.

**Result:** **4** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass to group + linear scan of groups |
| **Space** | O(n) — index lists |

---

## Follow-Up Questions

1. **Why consecutive triplets only?** Non-consecutive triples always have a larger span since the indices are sorted.
2. **Difference from Part I?** Part I may have different distance definition or constraints; the core grouping approach is the same.
3. **What if we needed the minimum for k elements instead of 3?** Same sliding window approach with window size k.

---

## Key Takeaway

> For minimum-span-of-k-equal-elements problems, **group indices by value** and slide a window of size k over each group — the span of consecutive grouped indices is always minimal.
