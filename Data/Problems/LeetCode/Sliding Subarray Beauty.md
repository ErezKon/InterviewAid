# 2653. Sliding Subarray Beauty

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sliding-subarray-beauty](https://leetcode.com/problems/sliding-subarray-beauty)
**Companies:** Amazon

---

## Problem Description

Given an integer array `nums` containing `n` integers, find the **beauty** of each subarray of size `k`.

The **beauty** of a subarray is the `x^th`** smallest integer **in the subarray if it is **negative**, or `0` if there are fewer than `x` negative integers.

Return *an integer array containing *`n - k + 1` *integers, which denote the ***beauty*** of the subarrays **in order** from the first index in the array.*

- A subarray is a contiguous **non-empty** sequence of elements within an array.

**Constraints:**
- `n == nums.length `
- `1 <= n <= 10^5`
- `1 <= k <= n`
- `1 <= x <= k `
- `-50 <= nums[i] <= 50 `

**Examples:**

**Example 1:**
```
Input: nums = [1,-1,-3,-2,3], k = 3, x = 2
Output: [-1,-2,-2]
Explanation: There are 3 subarrays with size k = 3.
The first subarray is [1, -1, -3] and the 2^nd smallest negative integer is -1.
The second subarray is [-1, -3, -2] and the 2^nd smallest negative integer is -2.
The third subarray is [-3, -2, 3] and the 2^nd smallest negative integer is -2.
```

**Example 2:**
```
Input: nums = [-1,-2,-3,-4,-5], k = 2, x = 2
Output: [-1,-2,-3,-4]
Explanation: There are 4 subarrays with size k = 2.
For [-1, -2], the 2^nd smallest negative integer is -1.
For [-2, -3], the 2^nd smallest negative integer is -2.
For [-3, -4], the 2^nd smallest negative integer is -3.
For [-4, -5], the 2^nd smallest negative integer is -4.
```

**Example 3:**
```
Input: nums = [-3,1,2,-3,0,-3], k = 2, x = 1
Output: [-3,0,-3,-3,-3]
Explanation: There are 5 subarrays with size k = 2.
For [-3, 1], the 1^st smallest negative integer is -3.
For [1, 2], there is no negative integer so the beauty is 0.
For [2, -3], the 1^st smallest negative integer is -3.
For [-3, 0], the 1^st smallest negative integer is -3.
For [0, -3], the 1^st smallest negative integer is -3.
```

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
