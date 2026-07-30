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

Given an integer array `nums`, you may choose **one** value and remove **all** its occurrences. After removal (remaining elements keep their relative order), find the maximum subarray sum. Return the maximum over all possible value removals (including removing nothing).

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `-10⁶ ≤ nums[i] ≤ 10⁶`

---

## Examples

**Example 1:**
```
nums = [1, -2, 3, -2, 5]
```
Removing `-2` (all occurrences) yields `[1,3,5]` whose maximum subarray sum is `9`. Keeping the array gives max subarray sum `7` (subarray `[3,-2,5]`). The answer is `9`.

**Example 2:**
```
nums = [-1, -2, -3]
```
Removing `-1` results in `[-2, -3]` with max subarray sum `-2`. Removing `-2` gives `[-1, -3]` with `-1`. Removing `-3` gives `[-1, -2]` with `-1`. Not removing anything yields `-1`. The best achievable sum is `-1`.

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
