# 908. Smallest Range I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/smallest-range-i](https://leetcode.com/problems/smallest-range-i)
**Companies:** Adobe, Glassdoor, Google

---

## Problem Description

You are given an integer array `nums` and an integer `k`.

In one operation, you can choose any index `i` where `0 <= i < nums.length` and change `nums[i]` to `nums[i] + x` where `x` is an integer from the range `[-k, k]`. You can apply this operation **at most once** for each index `i`.

The **score** of `nums` is the difference between the maximum and minimum elements in `nums`.

Return *the minimum **score** of* `nums` *after applying the mentioned operation at most once for each index in it*.

**Constraints:**
- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^4`
- `0 <= k <= 10^4`

## Examples

```
Example 1:
  Input: nums = [1], k = 0
  Output: 0
  Explanation: The score is max(nums) - min(nums) = 1 - 1 = 0.
```

```
Example 2:
  Input: nums = [0,10], k = 2
  Output: 6
  Explanation: Change nums to be [2, 8]. The score is max(nums) - min(nums) = 8 - 2 = 6.
```

```
Example 3:
  Input: nums = [1,3,6], k = 3
  Output: 0
  Explanation: Change nums to be [4, 4, 4]. The score is max(nums) - min(nums) = 4 - 4 = 0.
```

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
