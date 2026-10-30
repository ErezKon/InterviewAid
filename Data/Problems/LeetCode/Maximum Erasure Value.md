# 1695. Maximum Erasure Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-erasure-value](https://leetcode.com/problems/maximum-erasure-value)
**Companies:** Amazon, Att, Bloomberg, Cashfree, Google, Meta, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sliding Window — O(n)](#approach-sliding-window--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an array of positive integers `nums` and want to erase a subarray containing **unique elements**. The **score** you get by erasing the subarray is equal to the **sum** of its elements.

Return *the **maximum score** you can get by erasing **exactly one** subarray.*

An array `b` is called to be a subarray of `a` if it forms a contiguous subsequence of `a`, that is, if it is equal to `a[l],a[l+1],...,a[r]` for some `(l,r)`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^4`

---

## Examples

**Example 1:**
```
Input: nums = [4,2,4,5,6]
Output: 17
Explanation: The optimal subarray here is [2,4,5,6].
```

**Example 2:**
```
Input: nums = [5,2,1,2,5,2,1,2,5]
Output: 8
Explanation: The optimal subarray here is [5,2,1] or [1,2,5].
```

---

## Key Insight

> Sliding window with a hash set for uniqueness. Expand right, shrink left on duplicates. Track running sum.

---

## Approach: Sliding Window — O(n) ✅

```text
FUNCTION maximumUniqueSubarray(nums):
    seen = set()
    left = 0
    currSum = 0
    maxSum = 0
    FOR right ← 0 TO len(nums) - 1:
        WHILE nums[right] IN seen:
            seen.REMOVE(nums[left])
            currSum -= nums[left]
            left += 1
        seen.ADD(nums[right])
        currSum += nums[right]
        maxSum = MAX(maxSum, currSum)
    RETURN maxSum
```

---

## Walkthrough

Consider `[5,2,1,2,5]`.

| step | right | left | seen | currSum | maxSum |
|------|-------|------|------|---------|--------|
|0|0|0|{5}|5|5|
|1|1|0|{5,2}|7|7|
|2|2|0|{5,2,1}|8|8|
|3|3|0|duplicate 2 → shrink: remove 5,2,1 → left=3, seen={}, currSum=0| then add 2 → seen={2}, currSum=2| maxSum stays 8 |
|4|4|3|add 5 → seen={2,5}, currSum=7| maxSum stays 8 |

The maximum sum found is `8`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sliding Window | **O(n)** | O(n) |

---

## Follow-Up Questions

1. How would you modify the algorithm to return the subarray itself?
2. What if the array is extremely large and cannot fit in memory?
3. Can you adapt the solution for a circular array?

---

## Key Takeaway

> **Max sum subarray with unique elements = sliding window + hash set.** Like "Longest Substring Without Repeating Characters" but tracking sum instead of length.
