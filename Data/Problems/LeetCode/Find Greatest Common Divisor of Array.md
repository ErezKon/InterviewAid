# 1979. Find Greatest Common Divisor of Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-greatest-common-divisor-of-array](https://leetcode.com/problems/find-greatest-common-divisor-of-array)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Tiaa

---

## Problem Description
Given an integer array `nums`, return ***the greatest common divisor** of the smallest number and largest number in* `nums`.

The **greatest common divisor** of two numbers is the largest positive integer that evenly divides both numbers.

**Constraints:**

- `2 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`

## Examples

```
Example 1:
  Input: nums = [2,5,6,9,10]
  Output: 2
  Explanation:
  The smallest number in nums is 2.
  The largest number in nums is 10.
  The greatest common divisor of 2 and 10 is 2.
```

```
Example 2:
  Input: nums = [7,5,6,8,3]
  Output: 1
  Explanation:
  The smallest number in nums is 3.
  The largest number in nums is 8.
  The greatest common divisor of 3 and 8 is 1.
```

```
Example 3:
  Input: nums = [3,3]
  Output: 3
  Explanation:
  The smallest number in nums is 3.
  The largest number in nums is 3.
  The greatest common divisor of 3 and 3 is 3.
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
- **Time:** O(n · log M) where *n* is the array length and *M* is the maximum element (cost of Euclidean GCD).
- **Space:** O(1) extra space.

## Follow-Up Questions
1. How would you handle the case where the array contains zeros?
2. Can you compute the GCD of a subarray efficiently using a segment tree?
3. What if the numbers are very large (up to 10^18) and you need a faster GCD algorithm?

## Key Takeaway
The GCD of an entire array can be found by iteratively applying the Euclidean algorithm, reducing the problem to a series of pairwise GCD computations.