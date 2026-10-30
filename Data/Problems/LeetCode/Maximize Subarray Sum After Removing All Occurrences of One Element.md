# 3410. Maximize Subarray Sum After Removing All Occurrences of One Element

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-subarray-sum-after-removing-all-occurrences-of-one-element](https://leetcode.com/problems/maximize-subarray-sum-after-removing-all-occurrences-of-one-element)
**Companies:** Google, Rubrik

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Track Negative Contributions Per Value — O(n)](#approach-track-negative-contributions-per-value--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums`.

You can do the following operation on the array **at most** once:

- Choose **any** integer `x` such that `nums` remains **non-empty** on removing all occurrences of `x`.
- Remove **all** occurrences of `x` from the array.

Return the **maximum** subarray sum across **all** possible resulting arrays.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^6 <= nums[i] <= 10^6`

---

## Examples

**Example 1:**
```
Input: nums = [-3,2,-2,-1,3,-2,3]
Output: 7
Explanation: We can have the following arrays after at most one operation:
- The original array is nums = [-3, 2, -2, -1, 3, -2, 3]. The maximum subarray sum is 3 + (-2) + 3 = 4.
- Deleting all occurences of x = -3 results in nums = [2, -2, -1, 3, -2, 3]. The maximum subarray sum is 3 + (-2) + 3 = 4.
- Deleting all occurences of x = -2 results in nums = [-3, 2, -1, 3, 3]. The maximum subarray sum is 2 + (-1) + 3 + 3 = 7.
- Deleting all occurences of x = -1 results in nums = [-3, 2, -2, 3, -2, 3]. The maximum subarray sum is 3 + (-2) + 3 = 4.
- Deleting all occurences of x = 3 results in nums = [-3, 2, -2, -1, -2]. The maximum subarray sum is 2.
The output is max(4, 4, 7, 4, 2) = 7.
```

**Example 2:**
```
Input: nums = [1,2,3,4]
Output: 10
Explanation: It is optimal to not perform any operations.
```

---

## Approach: Track Negative Contributions Per Value — O(n) ✅

```
FUNCTION maxSubarraySum(nums):
    // Baseline using standard Kadane's algorithm
    result = Kadane(nums)
    
    // Map each negative value to cumulative gain if removed
    negGain = {}    // value → total |value| seen so far
    
    currSum = 0
    FOR num IN nums:
        currSum += num
        IF num < 0:
            negGain[num] = negGain.get(num, 0) + ABS(num)
            // If we removed this value, its contribution becomes positive
            result = MAX(result, currSum + negGain[num])
        // Reset when current sum becomes detrimental even after best removal
        IF currSum < 0 AND currSum + MAX(negGain.values() OR 0) < 0:
            currSum = 0
            negGain.clear()
    RETURN result
```

---

## Walkthrough

| Index | num | `currSum` | `negGain` (value → gain) | `result` |
|-------|-----|-----------|--------------------------|----------|
| 0 | 1   | 1         | {}                       | 1 |
| 1 | -2  | -1        | {-2 → 2}                 | 1 (max of 1, -1+2) = 1 |
| 2 | 3   | 2         | {-2 → 2}                 | 3 (subarray `[3]`) |
| 3 | -2  | 0         | {-2 → 4}                 | 4 (remove `-2` gives sum `1+3+5` later) |
| 4 | 5   | 5         | {-2 → 4}                 | 9 (currSum 5 + gain 4) |

The algorithm discovers that removing `-2` adds a gain of `4`, turning the best subarray sum to `9`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Modified Kadane's | **O(n)** | O(k) where k is number of distinct negative values |

---

## Key Takeaway

> **Extend Kadane's algorithm to track the cumulative gain from removing each negative value.** The optimal removal eliminates the most harmful negative value within the best subarray.
