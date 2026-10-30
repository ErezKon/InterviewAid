# 910. Smallest Range II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-range-ii](https://leetcode.com/problems/smallest-range-ii)
**Companies:** Adobe, Amazon, Meta

---

## Problem Description

You are given an integer array `nums` and an integer `k`.

For each index `i` where `0 <= i < nums.length`, change `nums[i]` to be either `nums[i] + k` or `nums[i] - k`.

The **score** of `nums` is the difference between the maximum and minimum elements in `nums`.

Return *the minimum **score** of* `nums` *after changing the values at each index*.

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
  Output: 3
  Explanation: Change nums to be [4, 6, 3]. The score is max(nums) - min(nums) = 6 - 3 = 3.
```

## Approach: Sorting and Partitioning [Time: O(N log N), Space: O(1)]

The key insight comes from sorting the array first. After sorting, for any index `i`, all elements up to `i` will be increased by `k`, and all elements from `i+1` onwards will be decreased by `k`. This partitioning strategy helps contain the new min and max values.

1.  **Sort:** Sort the `nums` array.
2.  **Initialize:** The initial result is the range of the original array, `nums[n-1] - nums[0]`.
3.  **Iterate and Partition:** Iterate from `i = 0` to `n-2`. At each `i`, consider a split where `nums[0...i]` are all increased by `k` and `nums[i+1...n-1]` are all decreased by `k`.
    - The new maximum will be either `nums[i] + k` or `nums[n-1] - k`.
    - The new minimum will be either `nums[0] + k` or `nums[i+1] - k`.
4.  **Update Result:** Calculate the difference `new_max - new_min` for each partition and update the overall minimum result.

```
FUNCTION smallestRangeII(nums, k):
    SORT(nums)
    n = len(nums)
    result = nums[n-1] - nums[0]

    // Partition the array at each index i
    FOR i FROM 0 TO n - 2:
        // Max after partition: max of (largest element in left part) and (largest in right part)
        new_max = MAX(nums[i] + k, nums[n-1] - k)
        
        // Min after partition: min of (smallest element in left part) and (smallest in right part)
        new_min = MIN(nums[0] + k, nums[i+1] - k)
        
        result = MIN(result, new_max - new_min)
        
    RETURN result
```

## Walkthrough

Let `nums = [1, 3, 6]`, `k = 3`.
1.  Sorted `nums` is `[1, 3, 6]`. `n=3`. `result = 6 - 1 = 5`.
2.  `i = 0`: `new_max = max(1+3, 6-3) = max(4, 3) = 4`. `new_min = min(1+3, 3-3) = min(4, 0) = 0`. Range = 4. `result = min(5, 4) = 4`.
3.  `i = 1`: `new_max = max(3+3, 6-3) = max(6, 3) = 6`. `new_min = min(1+3, 6-3) = min(4, 3) = 3`. Range = 3. `result = min(4, 3) = 3`.
4.  Loop ends. Return `3`.

## Complexity

| | Time | Space |
| :-- | :--- | :--- |
| **Overall** | O(N log N) | O(1) or O(N) for sort |
