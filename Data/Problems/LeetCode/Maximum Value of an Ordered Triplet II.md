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

You are given a **0-indexed** integer array `nums`.

Return ***the maximum value over all triplets of indices*** `(i, j, k)` *such that* `i < j < k`*. *If all such triplets have a negative value, return `0`.

The **value of a triplet of indices** `(i, j, k)` is equal to `(nums[i] - nums[j]) * nums[k]`.

**Constraints:**
- `3 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^6`

---

## Examples

**Example 1:**
```
Input: nums = [12,6,1,2,7]
Output: 77
Explanation: The value of the triplet (0, 2, 4) is (nums[0] - nums[2]) * nums[4] = 77.
It can be shown that there are no ordered triplets of indices with a value greater than 77.
```

**Example 2:**
```
Input: nums = [1,10,3,4,19]
Output: 133
Explanation: The value of the triplet (1, 2, 4) is (nums[1] - nums[2]) * nums[4] = 133.
It can be shown that there are no ordered triplets of indices with a value greater than 133.
```

**Example 3:**
```
Input: nums = [1,2,3]
Output: 0
Explanation: The only ordered triplet of indices (0, 1, 2) has a negative value of (nums[0] - nums[1]) * nums[2] = -3. Hence, the answer would be 0.
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
