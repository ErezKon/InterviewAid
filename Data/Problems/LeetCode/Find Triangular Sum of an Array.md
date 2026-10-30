# 2221. Find Triangular Sum of an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-triangular-sum-of-an-array](https://leetcode.com/problems/find-triangular-sum-of-an-array)
**Companies:** Amazon, De Shaw, Google, Microsoft, Zoho

---

## Problem Description

You are given a **0-indexed** integer array `nums`, where `nums[i]` is a digit between `0` and `9` (**inclusive**).

The **triangular sum** of `nums` is the value of the only element present in `nums` after the following process terminates:

- Let `nums` comprise of `n` elements. If `n == 1`, **end** the process. Otherwise, **create** a new **0-indexed** integer array `newNums` of length `n - 1`.
- For each index `i`, where `0 <= i < n - 1`, **assign** the value of `newNums[i]` as `(nums[i] + nums[i+1]) % 10`, where `%` denotes modulo operator.
- **Replace** the array `nums` with `newNums`.
- **Repeat** the entire process starting from step 1.

Return *the triangular sum of* `nums`.

**Constraints:**
- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 9`

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4,5]
Output: 8
Explanation: The above diagram depicts the process from which we obtain the triangular sum of the array.
```

**Example 2:**
```
Input: nums = [5]
Output: 5
Explanation: Since there is only one element in nums, the triangular sum is the value of that element itself.
```

## Approach
**Algorithm**: Iterative reduction using a sliding window.
1. While the length of `nums` is greater than 1:
   - Create a new list `next`.
   - For each index `i` from `0` to `len(nums)-2`:
     - Compute `val ← (nums[i] + nums[i+1]) % 10`.
     - Append `val` to `next`.
   - Replace `nums` with `next`.
2. Return `nums[0]`.

```text
FUNCTION TriangularSum(nums):
    WHILE LENGTH(nums) > 1:
        SET next ← EMPTY LIST
        FOR i ← 0 TO LENGTH(nums) - 2:
            SET val ← (nums[i] + nums[i+1]) % 10
            APPEND val TO next
        SET nums ← next
    RETURN nums[0]
```

## Walkthrough
For `nums = [1,2,3,4,5]`:
| Iteration | nums before | nums after |
|-----------|-------------|------------|
| 1 | [1,2,3,4,5] | [3,5,7,9] |
| 2 | [3,5,7,9]   | [8,2,6] |
| 3 | [8,2,6]     | [0,8] |
| 4 | [0,8]       | [8] |
Result = 8.

## Complexity Analysis
- **Time**: O(N²) in the worst case because each iteration processes a decreasing array of size N, N‑1, …, 1.
- **Space**: O(N) for the temporary `next` array.

## Follow-Up Questions
1. Can the process be optimized to O(N) using combinatorial properties?
2. How would you compute the triangular sum modulo a different base?
3. What if the reduction rule changed to multiplication modulo 10?

## Key Takeaway
Repeated pairwise reduction with modulo arithmetic gradually collapses the array to a single value, representing the triangular sum.
