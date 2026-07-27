# 908. Smallest Range I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/smallest-range-i](https://leetcode.com/problems/smallest-range-i)
**Companies:** Adobe, Glassdoor, Google

---

## Problem Description

Given an array of integers `nums` and an integer `k`, you can modify each element `nums[i]` by adding an integer `x` to it, where `x` is in the range `[-k, k]`. After applying this operation to all elements, you get a new array `result`. Your task is to find the minimum possible difference between the maximum and minimum values in the `result` array.

## Examples

- **Input:** `nums = [1, 3, 6]`, `k = 3`
  - **Original min/max:** 1, 6. Range = 5.
  - **Goal:** Minimize `max(result) - min(result)`.
  - We can change `1` to `1+3=4` and `6` to `6-3=3`. The new array could be `[4, 3, 3]`. The range is `4-3=1`. We can make them all equal, e.g., `[4,4,4]`. Range is 0.
  - **Output:** `0`.

## Approach: Mathematical Insight [Time: O(N), Space: O(1)]

The core idea is to shrink the original range as much as possible. The maximum element can be decreased by at most `k`, and the minimum element can be increased by at most `k`.

1.  **Find Extremes:** Find the initial minimum (`min_val`) and maximum (`max_val`) of the `nums` array.
2.  **Potential New Extremes:**
    - The smallest possible maximum in the new array is `max_val - k`.
    - The largest possible minimum in the new array is `min_val + k`.
3.  **Calculate Difference:** The new range will be `(max_val - k) - (min_val + k)`, which simplifies to `max_val - min_val - 2k`.
4.  **Handle Overlap:** If this difference is negative, it means the potential new min and max have overlapped, and we can make all elements equal. In this case, the minimum possible range is 0.

```
FUNCTION smallestRangeI(nums, k):
    min_val = MIN(nums)
    max_val = MAX(nums)
    
    initial_range = max_val - min_val
    range_reduction = 2 * k
    
    // If the reduction is greater than or equal to the range,
    // we can make the range 0.
    IF initial_range <= range_reduction:
        RETURN 0
    ELSE:
        // Otherwise, the new range is the initial range minus the max reduction.
        RETURN initial_range - range_reduction

// Simplified One-Liner:
FUNCTION smallestRangeI_simplified(nums, k):
    RETURN MAX(0, MAX(nums) - MIN(nums) - 2 * k)
```

## Complexity

| | Time | Space |
| :-- | :--- | :--- |
| **Overall** | O(N) | O(1) |

Finding the min and max of the array takes a single pass, O(N) time. The rest is constant time arithmetic.
