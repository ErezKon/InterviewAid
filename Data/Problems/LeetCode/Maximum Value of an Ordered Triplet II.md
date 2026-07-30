# 2874. Maximum Value of an Ordered Triplet II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-value-of-an-ordered-triplet-ii](https://leetcode.com/problems/maximum-value-of-an-ordered-triplet-ii)
**Companies:** Amazon, Bloomberg, Google, Medianet, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a 0-indexed array `nums`, find the **maximum value** of `(nums[i] - nums[j]) * nums[k]` over all triplets `(i, j, k)` where `i < j < k`. If all such values are negative, return `0`.

**Constraints:**
- `3 ≤ nums.length ≤ 10⁵`
- `1 ≤ nums[i] ≤ 10⁶`

---

## Examples

**Example 1:**
```
Input:  nums = [12, 6, 1, 2, 7]
Output: 77
Explanation: (12 - 1) * 7 = 77.
```

**Example 2:**
```
Input:  nums = [1, 10, 3, 4, 19]
Output: 133
Explanation: (10 - 3) * 19 = 133.
```

---

## Key Insight

> Track `max(nums[i] - nums[j])` for all `i < j` seen so far, then multiply by the current element `nums[k]`. This collapses an O(n³) brute-force into a single O(n) pass by maintaining two running aggregates: the max element so far (`maxLeft`) and the max difference so far (`maxDiff`).

---

## Approach

```
FUNCTION maximumTripletValue(nums):
    maxDiff ← 0
    maxLeft ← 0
    result ← 0
    FOR num IN nums DO
        result ← MAX(result, maxDiff * num)      // num as nums[k]
        maxDiff ← MAX(maxDiff, maxLeft - num)     // num as nums[j]
        maxLeft ← MAX(maxLeft, num)               // num as nums[i]
    RETURN result
```

**Order of updates matters:** we first use `maxDiff` (which excludes current `num` as `j`), then update `maxDiff` (treating current as `j`), then update `maxLeft` (treating current as potential future `i`).

---

## Walkthrough

```
nums = [1, 10, 3, 4, 19]

num=1:  result=MAX(0, 0*1)=0,    maxDiff=MAX(0, 0-1)=0,   maxLeft=1
num=10: result=MAX(0, 0*10)=0,   maxDiff=MAX(0, 1-10)=0,  maxLeft=10
num=3:  result=MAX(0, 0*3)=0,    maxDiff=MAX(0, 10-3)=7,  maxLeft=10
num=4:  result=MAX(0, 7*4)=28,   maxDiff=MAX(7, 10-4)=7,  maxLeft=10
num=19: result=MAX(28, 7*19)=133, maxDiff=MAX(7, 10-19)=7, maxLeft=19

Return 133 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| One-pass tracking | **O(n)** | **O(1)** |
| Brute force (3 loops) | O(n³) | O(1) |

---

## Follow-Up Questions

1. **How is this different from Ordered Triplet I?** Identical algorithm — Part I has n ≤ 100 (brute force acceptable), Part II has n ≤ 10⁵ (requires O(n)).
2. **Can the result overflow?** With values up to 10⁶, max product is ~10⁶ × 10⁶ = 10¹² — use 64-bit integers.
3. **What if we wanted the minimum triplet value?** Track `minDiff` (most negative difference) and `minLeft` symmetrically.
4. **Why initialize maxDiff and result to 0?** The problem says return 0 if all triplet values are negative, so 0 serves as the floor.

---

## Key Takeaway

> **Running prefix aggregates** (`maxLeft`, `maxDiff`) transform an O(n³) ordered-triplet optimization into O(n). The key is the update order: use aggregate → update aggregate → advance the earliest index tracker.

---
