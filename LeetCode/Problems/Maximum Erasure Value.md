# 1695. Maximum Erasure Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-erasure-value](https://leetcode.com/problems/maximum-erasure-value)
**Companies:** Amazon, Att, Bloomberg, Cashfree, Google, Meta, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sliding Window — O(n)](#approach-sliding-window--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Find the maximum sum of a contiguous subarray with **all unique** elements.

---

## Key Insight

> Sliding window with a hash set for uniqueness. Expand right, shrink left on duplicates. Track running sum.

---

## Approach: Sliding Window — O(n) ✅

```
FUNCTION maximumUniqueSubarray(nums):
    seen = set()
    left = 0; maxSum = 0; currSum = 0
    FOR right ← 0 TO n - 1:
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

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sliding Window | **O(n)** | O(n) |

---

## Key Takeaway

> **Max sum subarray with unique elements = sliding window + hash set.** Like "Longest Substring Without Repeating Characters" but tracking sum instead of length.
