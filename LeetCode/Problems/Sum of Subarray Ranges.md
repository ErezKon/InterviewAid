# 2104. Sum of Subarray Ranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-subarray-ranges](https://leetcode.com/problems/sum-of-subarray-ranges)
**Companies:** Amazon, Apple, Bloomberg, Chubb, De Shaw, Google, Meta, Microsoft, Phonepe, Tiktok

---

## Problem Description
Given an integer array `nums`, the **range** of a subarray is the difference between its maximum and minimum elements. Return the sum of ranges of **all** subarrays of `nums`. A subarray is a contiguous part of the array.

## Examples
**Example 1:**
```
Input: nums = [1,2,3]
Output: 4
Explanation: Subarrays = [1], [2], [3], [1,2], [2,3], [1,2,3]
Ranges = 0, 0, 0, (2-1)=1, (3-2)=1, (3-1)=2 → sum = 4
```

**Example 2:**
```
Input: nums = [1,3,3]
Output: 4
Explanation: Ranges = 0,0,0, (3-1)=2, (3-3)=0, (3-1)=2 → sum = 4
```

## Approach
The sum of subarray ranges can be expressed as:
```
Sum of all subarray maximums – Sum of all subarray minimums
```
Both sums can be computed in O(n) using a **monotonic stack** that finds, for each element, the number of subarrays where it is the maximum (or minimum). The contribution of an element `x` is `x * left * right`, where `left` and `right` are distances to the previous greater (or smaller) element and the next greater (or smaller) element respectively.

```text
FUNCTION sumSubarrayMaxs(nums):
    SET stack ← empty
    SET total ← 0
    FOR i ← 0 TO LENGTH(nums):
        WHILE stack NOT EMPTY AND (i == LENGTH(nums) OR nums[stack.TOP] <= nums[i]):
            SET idx ← POP(stack)
            SET left ← idx - (stack.TOP IF stack NOT EMPTY ELSE -1)
            SET right ← i - idx
            SET total ← total + nums[idx] * left * right
        PUSH(i, stack)
    RETURN total

FUNCTION sumSubarrayMins(nums):
    SET stack ← empty
    SET total ← 0
    FOR i ← 0 TO LENGTH(nums):
        WHILE stack NOT EMPTY AND (i == LENGTH(nums) OR nums[stack.TOP] >= nums[i]):
            SET idx ← POP(stack)
            SET left ← idx - (stack.TOP IF stack NOT EMPTY ELSE -1)
            SET right ← i - idx
            SET total ← total + nums[idx] * left * right
        PUSH(i, stack)
    RETURN total

FUNCTION subArrayRanges(nums):
    RETURN sumSubarrayMaxs(nums) - sumSubarrayMins(nums)
```

## Walkthrough
Consider `nums = [1,2,3]` for the maximum contribution:
| Index | Value | Left Distance | Right Distance | Contribution |
|-------|-------|---------------|----------------|--------------|
| 0 | 1 | 1 (to -1) | 1 (to 1) | 1*1*1 = 1 |
| 1 | 2 | 2 (to -1) | 1 (to 2) | 2*2*1 = 4 |
| 2 | 3 | 3 (to -1) | 1 (to end) | 3*3*1 = 9 |
Sum of maxes = 14. Similar calculation for mins gives 10. Difference = 4, matching the expected answer.

## Complexity Analysis
- **Time:** O(n) – each element is pushed and popped at most once in each stack pass.
- **Space:** O(n) for the stacks (worst‑case when the array is monotonic).

## Follow-Up Questions
1. How would you adapt the algorithm to compute the sum of subarray **products**?
2. Can the technique be extended to handle circular arrays?
3. What changes are needed if the array contains duplicate values and you must count each subarray only once?

## Key Takeaway
Using a monotonic stack to count contributions of each element as a maximum or minimum enables O(n) computation of the sum of subarray ranges.
