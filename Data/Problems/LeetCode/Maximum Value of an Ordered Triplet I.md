# 2873. Maximum Value of an Ordered Triplet I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-value-of-an-ordered-triplet-i](https://leetcode.com/problems/maximum-value-of-an-ordered-triplet-i)
**Companies:** Amazon, Google, Medianet, Meta

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

Return ***the maximum value over all triplets of indices*** `(i, j, k)` *such that* `i < j < k`. If all such triplets have a negative value, return `0`.

The **value of a triplet of indices** `(i, j, k)` is equal to `(nums[i] - nums[j]) * nums[k]`.

**Constraints:**
- `3 <= nums.length <= 100`
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

> We want to maximize `(nums[i] - nums[j]) * nums[k]`. As we scan left to right treating each element as `nums[k]`, we need the maximum `(nums[i] - nums[j])` seen so far (for `i < j < k`). We can track this by maintaining `maxLeft` (max element seen) and `maxDiff` (max difference `maxLeft - nums[j]`).

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

---

## Walkthrough

```
nums = [12, 6, 1, 2, 7]

num=12: result=MAX(0, 0*12)=0,  maxDiff=MAX(0, 0-12)=0,  maxLeft=12
num=6:  result=MAX(0, 0*6)=0,   maxDiff=MAX(0, 12-6)=6,  maxLeft=12
num=1:  result=MAX(0, 6*1)=6,   maxDiff=MAX(6, 12-1)=11, maxLeft=12
num=2:  result=MAX(6, 11*2)=22, maxDiff=MAX(11, 12-2)=11, maxLeft=12
num=7:  result=MAX(22, 11*7)=77, maxDiff=MAX(11, 12-7)=11, maxLeft=12

Return 77 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| One-pass tracking | **O(n)** | **O(1)** |
| Brute force (3 loops) | O(n³) | O(1) |

---

## Follow-Up Questions

1. **Why process in the order result → maxDiff → maxLeft?** This ensures each variable only uses values from earlier indices, maintaining `i < j < k`.
2. **What if all values are negative?** The result starts at 0 and never goes below, matching the problem's requirement.
3. **How does this relate to Ordered Triplet II?** Same algorithm — Part II has larger constraints (n ≤ 10⁵) but this O(n) approach handles both.

---

## Key Takeaway

> **Track running prefix aggregates** (max so far, max difference so far) to reduce a triple nested loop to a single pass — a common pattern for ordered triplet optimization.

---
