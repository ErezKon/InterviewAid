# 2653. Sliding Subarray Beauty

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sliding-subarray-beauty](https://leetcode.com/problems/sliding-subarray-beauty)
**Companies:** Amazon

---

## Problem Description

Given an integer array `nums` of size `n`, a sliding window of size `k`, and an integer `x`, for each window find the `x`-th smallest **negative** number. If fewer than `x` negatives exist in the window, the beauty is `0`.

Return an array of beauties for each window position.

### Examples

**Example 1:**
- **Input:** `nums = [1,-1,-3,-2,3]`, `k = 3`, `x = 2`
- **Output:** `[-1,-2,-2]`
- **Explanation:** Window `[1,-1,-3]`: negatives sorted = `[-3,-1]`, 2nd smallest = `-1`. Window `[-1,-3,-2]`: `[-3,-2,-1]`, 2nd = `-2`. Window `[-3,-2,3]`: `[-3,-2]`, 2nd = `-2`.

**Example 2:**
- **Input:** `nums = [-1,-2,-3,-4,-5]`, `k = 2`, `x = 2`
- **Output:** `[-1,-2,-3,-4]`

### Constraints

- `n == nums.length`
- `1 <= n <= 10⁵`
- `1 <= x <= k <= n`
- `-50 <= nums[i] <= 50`

---

## Approach: Counting Sort with Sliding Window — O(n · 101) ✅

Since values range `[-50, 50]`, maintain a frequency count array. For each window, walk the count array from the smallest value to find the x-th smallest negative.

```
FUNCTION getSubarrayBeauty(nums, k, x):
    count = [0] * 101    // offset: index 0 = value -50
    result = []

    FOR i ← 0 TO n-1:
        count[nums[i] + 50] += 1
        IF i >= k:
            count[nums[i - k] + 50] -= 1

        IF i >= k - 1:
            cnt = 0
            FOR val ← -50 TO -1:
                cnt += count[val + 50]
                IF cnt >= x:
                    result.ADD(val)
                    BREAK
            ELSE:
                result.ADD(0)    // fewer than x negatives

    RETURN result
```

| Time | Space |
|------|-------|
| O(n · 50) | O(101) ≈ O(1) |
