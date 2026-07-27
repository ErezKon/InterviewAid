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

## Key Insight

> Removing a value `v` benefits us only if `v < 0`. For each negative value, compute how much the maximum subarray sum would increase if all its occurrences were removed. Use a modified Kadane's: for each candidate value to remove, track the prefix sum gain from removing all occurrences of that value within the current subarray.

---

## Approach: Track Negative Contributions Per Value — O(n) ✅

```
FUNCTION maxSubarraySum(nums):
    // Standard Kadane's for baseline
    result = Kadane(nums)
    
    // For each distinct negative value, compute gain from removal
    // Use modified prefix sums: for value v, 
    //   removing it effectively adds |v| at each occurrence
    negGain = {}    // value → cumulative gain from removing all of v so far
    
    currSum = 0
    FOR num IN nums:
        currSum += num
        IF num < 0:
            negGain[num] = negGain.get(num, 0) + abs(num)
            result = MAX(result, currSum + negGain[num])
        // Reset if going below what removal would give
        IF currSum < 0 AND currSum + max(negGain.values()) < 0:
            currSum = 0; negGain.clear()
    
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Modified Kadane's | **O(n)** | O(n) |

---

## Key Takeaway

> **Extend Kadane's algorithm to track the cumulative gain from removing each negative value.** The optimal removal eliminates the most harmful negative value within the best subarray.
