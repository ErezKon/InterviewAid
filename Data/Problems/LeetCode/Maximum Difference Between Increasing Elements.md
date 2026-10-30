# 2016. Maximum Difference Between Increasing Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-difference-between-increasing-elements](https://leetcode.com/problems/maximum-difference-between-increasing-elements)
**Companies:** Amazon, Bloomberg, Cisco, Google, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Track Min — O(n)](#approach-track-min--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a **0-indexed** integer array `nums` of size `n`, find the **maximum difference** between `nums[i]` and `nums[j]` (i.e., `nums[j] - nums[i]`), such that `0 <= i < j < n` and `nums[i] < nums[j]`.

Return *the **maximum difference**. *If no such `i` and `j` exists, return `-1`.

**Constraints:**
- `n == nums.length`
- `2 <= n <= 1000`
- `1 <= nums[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [7,1,5,4]
Output: 4
Explanation: The maximum difference occurs with i = 1 and j = 2, nums[j] - nums[i] = 5 - 1 = 4.
Note that with i = 1 and j = 0, the difference nums[j] - nums[i] = 7 - 1 = 6, but i > j, so it is not valid.
```

**Example 2:**
```
Input: nums = [9,4,3,2]
Output: -1
Explanation: There is no i and j such that i < j and nums[i] < nums[j].
```

**Example 3:**
```
Input: nums = [1,5,2,10]
Output: 9
Explanation: The maximum difference occurs with i = 0 and j = 3, nums[j] - nums[i] = 10 - 1 = 9.
```

---

## Approach: Track Min — O(n) ✅

```text
FUNCTION maximumDifference(nums):
    minVal ← nums[0]
    maxDiff ← -1
    FOR i ← 1 TO n - 1:
        IF nums[i] > minVal:
            maxDiff ← MAX(maxDiff, nums[i] - minVal)
        minVal ← MIN(minVal, nums[i])
    RETURN maxDiff
```

---

## Walkthrough

Consider `nums = [7,1,5,4,6,2]`.

| i | nums[i] | minVal (so far) | maxDiff (so far) |
|---|---------|----------------|------------------|
|0|7|7|-1|
|1|1|1|-1| (minVal updated)
|2|5|1|4| (5-1=4)
|3|4|1|4| (4-1=3 < 4)
|4|6|1|5| (6-1=5 updates maxDiff)
|5|2|1|5| (2-1=1 < 5)

Result is 5.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Track min | **O(n)** | O(1) |

---

## Follow-Up Questions

1. How would you modify the algorithm to return the indices `i` and `j` of the optimal pair?
2. What if you need the maximum difference with at most `k` deletions allowed in the array?
3. Can this be extended to find the maximum product of an increasing pair?

---

## Key Takeaway

> **Same as "Best Time to Buy and Sell Stock" — track running min, compute max difference.** Return -1 if no strictly increasing pair.
