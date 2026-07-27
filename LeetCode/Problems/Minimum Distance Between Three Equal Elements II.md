# 3741. Minimum Distance Between Three Equal Elements II

**Difficulty:** 🟡 Medium
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

Given an integer array `nums`, find the **minimum** value of `max(|i-j|, |j-k|, |i-k|)` among all triples `(i, j, k)` where `nums[i] == nums[j] == nums[k]` and `i < j < k`. Return `-1` if no such triple exists.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `1 ≤ nums[i] ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input: nums = [1,2,1,3,1,2]
Output: 4
Explanation: Triple (0,2,4) for value 1. max(|0-2|,|2-4|,|0-4|) = max(2,2,4) = 4.
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
