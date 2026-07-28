# 1979. Find Greatest Common Divisor of Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-greatest-common-divisor-of-array](https://leetcode.com/problems/find-greatest-common-divisor-of-array)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Tiaa

---

## Problem Description
Given an integer array `nums`, return the greatest common divisor (GCD) of all the elements in the array. The GCD of a set of numbers is the largest positive integer that divides each of the numbers without leaving a remainder.

## Examples
**Example 1**
```
Input: nums = [2,4,6,8,10]
Output: 2
Explanation: The GCD of all numbers is 2.
```
**Example 2**
```
Input: nums = [3,9,27]
Output: 3
Explanation: 3 divides all numbers and is the largest such integer.
```

## Approach
The GCD of the entire array can be obtained by repeatedly applying the Euclidean algorithm between the current GCD and the next element. Starting with the minimum element (or the first element) as the initial GCD, iterate through the array and update the GCD using `GCD(currentGCD, nums[i])`.

## Walkthrough
| Step | Current GCD | Next Element | Updated GCD |
|------|-------------|--------------|-------------|
| Init | nums[0] = 2 | – | 2 |
| 1    | 2           | 4            | GCD(2,4)=2 |
| 2    | 2           | 6            | GCD(2,6)=2 |
| 3    | 2           | 8            | GCD(2,8)=2 |
| 4    | 2           | 10           | GCD(2,10)=2 |

## Complexity Analysis
- **Time:** O(n · log M) where *n* is the array length and *M* is the maximum element (cost of Euclidean GCD).
- **Space:** O(1) extra space.

## Follow-Up Questions
1. How would you handle the case where the array contains zeros?
2. Can you compute the GCD of a subarray efficiently using a segment tree?
3. What if the numbers are very large (up to 10^18) and you need a faster GCD algorithm?

## Key Takeaway
The GCD of an entire array can be found by iteratively applying the Euclidean algorithm, reducing the problem to a series of pairwise GCD computations.