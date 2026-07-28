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

Find the maximum sum of a contiguous subarray with **all unique** elements.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[5,2,1,2,5,2,1,2,5]` | `8` | The subarray `[5,2,1]` has sum `8` and all elements are unique. |
| `[1,2,3,4,5]` | `15` | The whole array is unique, sum is `15`. |

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
