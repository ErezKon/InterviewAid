# 2919. Minimum Increment Operations to Make Array Beautiful

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-increment-operations-to-make-array-beautiful](https://leetcode.com/problems/minimum-increment-operations-to-make-array-beautiful)
**Companies:** Google

---

## Problem Description

You are given a **0-indexed** integer array `nums` having length `n`, and an integer `k`.

You can perform the following **increment** operation **any** number of times (**including zero**):

- Choose an index `i` in the range `[0, n - 1]`, and increase `nums[i]` by 1.

An array is considered **beautiful** if, for **every** **subarray** with a size of 3 or **more**, its **maximum** element is **greater than or equal** to `k`.

Return an integer denoting the **minimum** number of increment operations needed to make `nums` **beautiful**.

A subarray is a contiguous **non-empty** sequence of elements within an array.

**Constraints:**
- `3 <= n == nums.length <= 10^5`
- `0 <= nums[i] <= 10^9`
- `0 <= k <= 10^9`

## Examples

**Example 1:**
```
Input: nums = [2,3,0,0,2], k = 4
Output: 3
Explanation: We can perform the following increment operations to make nums beautiful:
Choose index i = 1 and increase nums[1] by 1 -> [2,4,0,0,2].
Choose index i = 4 and increase nums[4] by 1 -> [2,4,0,0,3].
Choose index i = 4 and increase nums[4] by 1 -> [2,4,0,0,4].
The subarrays with a size of 3 or more are: [2,4,0], [4,0,0], [0,0,4], [2,4,0,0], [4,0,0,4], [2,4,0,0,4].
In all the subarrays, the maximum element is equal to k = 4, so nums is now beautiful.
It can be shown that nums cannot be made beautiful with fewer than 3 increment operations.
Hence, the answer is 3.
```

**Example 2:**
```
Input: nums = [0,1,3,3], k = 5
Output: 2
Explanation: We can perform the following increment operations to make nums beautiful:
Choose index i = 2 and increase nums[2] by 1 -> [0,1,4,3].
Choose index i = 2 and increase nums[2] by 1 -> [0,1,5,3].
The subarrays with a size of 3 or more are: [0,1,5], [1,5,3], [0,1,5,3].
In all the subarrays, the maximum element is equal to k = 5, so nums is now beautiful.
It can be shown that nums cannot be made beautiful with fewer than 2 increment operations.
Hence, the answer is 2.
```

**Example 3:**
```
Input: nums = [1,1,2], k = 1
Output: 0
Explanation: The only subarray with a size of 3 or more in this example is [1,1,2].
The maximum element, 2, is already greater than k = 1, so we don't need any increment operation.
Hence, the answer is 0.
```

## Approach

**Algorithm:** Dynamic Programming with a sliding window of size 3.

The key insight is that the distance between two elements that are incremented to reach `k` cannot exceed two positions; otherwise a window of three would lack a qualified element. We maintain `dp[i]` as the minimum cost to make the prefix up to index `i` beautiful when `nums[i]` is the last element raised to at least `k`. For each position we consider the three possible previous bump positions.

```text
FUNCTION minIncrementOperations(nums, k):
    n ← LENGTH(nums)
    dp ← ARRAY of size n
    FOR i ← 0 TO n-1:
        cost_i ← MAX(0, k - nums[i])
        IF i < 3:
            dp[i] ← cost_i
        ELSE:
            dp[i] ← cost_i + MIN(dp[i-1], dp[i-2], dp[i-3])
    RETURN MIN(dp[n-1], dp[n-2], dp[n-3])
```

## Walkthrough

Consider `nums = [0,0,0,0]` and `k = 5`.
| i | nums[i] | cost_i | dp[i] calculation | dp[i] |
|---|---------|--------|-------------------|-------|
|0|0|5|i<3 → dp[0]=5|5|
|1|0|5|i<3 → dp[1]=5|5|
|2|0|5|i<3 → dp[2]=5|5|
|3|0|5|dp[3]=5+MIN(dp[2],dp[1],dp[0])=5+5=10|10|
The answer is `MIN(dp[3],dp[2],dp[1]) = MIN(10,5,5) = 5`, meaning we only need to raise the first three elements to `5` (total 15 increments) and the last element can remain unchanged.

## Complexity Analysis

- **Time:** O(n) – each element is processed once.
- **Space:** O(n) for the `dp` array, which can be reduced to O(1) by keeping only the last three values.

## Follow-Up Questions

1. How would the solution change if the window size were `w` instead of `3`?
2. Can the problem be solved in-place without extra DP storage?
3. What if decrement operations were also allowed?

## Key Takeaway

"At least one in every window of three" translates to a DP where the gap between bumped elements is at most two, allowing a simple O(n) solution by tracking the minimum cost of the last three positions.