# 3423. Maximum Difference Between Adjacent Elements in a Circular Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-difference-between-adjacent-elements-in-a-circular-array](https://leetcode.com/problems/maximum-difference-between-adjacent-elements-in-a-circular-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a **circular** array `nums`, find the **maximum** absolute difference between adjacent elements.

**Note**: In a circular array, the first and last elements are adjacent.

**Constraints:**
- `2 <= nums.length <= 100`
- `-100 <= nums[i] <= 100`

---

## Examples

**Example 1:**
```
Input: nums = [1,2,4]
Output: 3
Explanation: Because nums is circular, nums[0] and nums[2] are adjacent. They have the maximum absolute difference of |4 - 1| = 3.
```

**Example 2:**
```
Input: nums = [-5,-10,-5]
Output: 5
Explanation: The adjacent elements nums[0] and nums[1] have the maximum absolute difference of |-5 - (-10)| = 5.
```

---

## Approach

**Linear Scan** – Iterate once over the array, compute `abs(nums[i] - nums[(i+1) % n])` for each index, and keep the maximum.

```text
FUNCTION maxAdjacentDifference(nums):
    n ← LENGTH(nums)
    maxDiff ← 0
    FOR i ← 0 TO n-1:
        diff ← ABS(nums[i] - nums[(i+1) % n])
        maxDiff ← MAX(maxDiff, diff)
    RETURN maxDiff
```

---

## Walkthrough

Consider `nums = [2,5,1,4]`:

| i | nums[i] | nums[(i+1)%n] | diff | maxDiff |
|---|---------|---------------|------|----------|
|0|2|5|3|3|
|1|5|1|4|4|
|2|1|4|3|4|
|3|4|2|2|4|

The final `maxDiff` is `4`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Linear scan | **O(n)** | O(1) |

---

## Follow-Up Questions

- How would you modify the solution to return the pair of indices achieving the maximum difference?
- What if the array is not circular? How does the algorithm change?
- Can you solve it in a single pass without using the modulo operator?

---

## Key Takeaway

> **Circular adjacency: use `(i+1) % n` to handle wrap-around.** One-pass max of absolute differences.
