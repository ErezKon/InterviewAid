# 3728. Stable Subarrays With Equal Boundary and Interior Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/stable-subarrays-with-equal-boundary-and-interior-sum](https://leetcode.com/problems/stable-subarrays-with-equal-boundary-and-interior-sum)
**Companies:** Amazon, Microsoft

---

## Problem Description

You are given an integer array `capacity`.

A subarray `capacity[l..r]` is considered **stable** if:

- Its length is **at least** 3.
- The **first** and **last** elements are each equal to the **sum** of all elements **strictly between** them (i.e., `capacity[l] = capacity[r] = capacity[l + 1] + capacity[l + 2] + ... + capacity[r - 1]`).

Return an integer denoting the number of **stable subarrays**.

**Constraints:**
- `3 <= capacity.length <= 10^5`
- `-10^9 <= capacity[i] <= 10^9`

## Examples

**Example 1:**
```
Input: capacity = [9,3,3,3,9]
Output: 2
Explanation: - [9,3,3,3,9] is stable because the first and last elements are both 9, and the sum of the elements strictly between them is 3 + 3 + 3 = 9.
- [3,3,3] is stable because the first and last elements are both 3, and the sum of the elements strictly between them is 3.
```

**Example 2:**
```
Input: capacity = [1,2,3,4,5]
Output: 0
Explanation: No subarray of length at least 3 has equal first and last elements, so the answer is 0.
```

**Example 3:**
```
Input: capacity = [-4,4,0,0,-8,-4]
Output: 1
Explanation: [-4,4,0,0,-8,-4] is stable because the first and last elements are both -4, and the sum of the elements strictly between them is 4 + 0 + 0 + (-8) = -4
```

## Approach
Use prefix sums to compute interior sums quickly. For each possible right boundary `j`, we need count of left indices `i < j` where `prefix[j] - prefix[i+1] = nums[i] + nums[j]`. Rearranged: `prefix[i+1] + nums[i] = prefix[j] - nums[j]`. Store frequencies of the left-side expression in a hashmap while iterating `j`.

## Walkthrough
Consider `nums = [1,2,3,4,5]`.
1. Compute prefix sums: `[0,1,3,6,10,15]`.
2. Iterate `j` from 1 to n-1, updating hashmap with values for `i = j-1` before counting.
3. At `j=2`, left expression for `i=0` is `prefix[1] + nums[0] = 1 + 1 = 2`. Right target is `prefix[2] - nums[2] = 3 - 3 = 0`. No match.
4. Continue; matches occur at `j=2` and `j=3`, yielding 2 stable subarrays.

## Complexity Analysis
- Time: `O(n)` – single pass with hashmap look-ups.
- Space: `O(n)` in the worst case for the hashmap.

## Follow-Up Questions
1. How would the solution change if negative numbers were disallowed?
2. Can you extend the problem to count stable subarrays of length at least `k`?
3. What if the boundary condition required `nums[i] * nums[j]` instead of sum?

## Key Takeaway
Transform the stability condition into a prefix-sum equation and use a hashmap to count matching left-side values in linear time.
