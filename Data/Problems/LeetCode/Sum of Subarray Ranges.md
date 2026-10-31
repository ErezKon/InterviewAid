# 2104. Sum of Subarray Ranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-subarray-ranges](https://leetcode.com/problems/sum-of-subarray-ranges)
**Companies:** Amazon, Apple, Bloomberg, Chubb, De Shaw, Google, Meta, Microsoft, Phonepe, Tiktok

---

## Problem Description

You are given an integer array `nums`. The **range** of a subarray of `nums` is the difference between the largest and smallest element in the subarray.

Return *the **sum of all** subarray ranges of* `nums`*.*

A subarray is a contiguous **non-empty** sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 1000`
- `-10^9 <= nums[i] <= 10^9`

**Follow-up:** Could you find a solution with `O(n)` time complexity?

## Examples

**Example 1:**
```
Input: nums = [1,2,3]
Output: 4
Explanation: The 6 subarrays of nums are the following:
[1], range = largest - smallest = 1 - 1 = 0
[2], range = 2 - 2 = 0
[3], range = 3 - 3 = 0
[1,2], range = 2 - 1 = 1
[2,3], range = 3 - 2 = 1
[1,2,3], range = 3 - 1 = 2
So the sum of all ranges is 0 + 0 + 0 + 1 + 1 + 2 = 4.
```

**Example 2:**
```
Input: nums = [1,3,3]
Output: 4
Explanation: The 6 subarrays of nums are the following:
[1], range = largest - smallest = 1 - 1 = 0
[3], range = 3 - 3 = 0
[3], range = 3 - 3 = 0
[1,3], range = 3 - 1 = 2
[3,3], range = 3 - 3 = 0
[1,3,3], range = 3 - 1 = 2
So the sum of all ranges is 0 + 0 + 0 + 2 + 0 + 2 = 4.
```

**Example 3:**
```
Input: nums = [4,-2,-3,4,1]
Output: 59
Explanation: The sum of all subarray ranges of nums is 59.
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
- **Space:** O(n) for the stacks (worst-case when the array is monotonic).

## Follow-Up Questions
1. How would you adapt the algorithm to compute the sum of subarray **products**?
2. Can the technique be extended to handle circular arrays?
3. What changes are needed if the array contains duplicate values and you must count each subarray only once?

## Key Takeaway
Using a monotonic stack to count contributions of each element as a maximum or minimum enables O(n) computation of the sum of subarray ranges.
