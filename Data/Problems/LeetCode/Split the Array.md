# 3046. Split the Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/split-the-array](https://leetcode.com/problems/split-the-array)
**Companies:** Adobe, Google, Meta, Visa

---

## Problem Description

You are given an integer array `nums` of **even** length. You have to split the array into two parts `nums1` and `nums2` such that:

- `nums1.length == nums2.length == nums.length / 2`.
- `nums1` should contain **distinct** elements.
- `nums2` should also contain **distinct** elements.

Return `true` *if it is possible to split the array, and* `false` *otherwise*.

**Constraints:**
- `1 <= nums.length <= 100`
- `nums.length % 2 == 0`
- `1 <= nums[i] <= 100`

## Examples

**Example 1:**
```
Input: nums = [1,1,2,2,3,4]
Output: true
Explanation: One of the possible ways to split nums is nums1 = [1,2,3] and nums2 = [1,2,4].
```

**Example 2:**
```
Input: nums = [1,1,1,1]
Output: false
Explanation: The only possible way to split nums is nums1 = [1,1] and nums2 = [1,1]. Both nums1 and nums2 do not contain distinct elements. Therefore, we return false.
```

## Approach
The condition is satisfied iff the maximum frequency of any element does not exceed 2. This follows because we can always place each occurrence of a value into separate groups until the limit is reached.

```text
FUNCTION isPossibleToSplit(nums):
    SET freqMap ← EMPTY MAP
    FOR num IN nums:
        INCREMENT freqMap[num] BY 1
        IF freqMap[num] > 2:
            RETURN false
    RETURN true
```

## Walkthrough
| Step | num | freqMap after step | Decision |
|------|-----|-------------------|----------|
| 1 | 1 | {1:1} | continue |
| 2 | 1 | {1:2} | continue |
| 3 | 1 | {1:3} | exceeds 2 → return false |
The algorithm stops as soon as a frequency exceeds two.

## Complexity Analysis
- **Time:** O(n), where n is the length of `nums`.
- **Space:** O(k), where k is the number of distinct elements (at most n).

## Follow-Up Questions
1. How would the solution change if each group must have the same size?
2. Can you extend the approach to allow a maximum frequency of `m` instead of 2?
3. What if the array must be split into more than two groups while keeping the same frequency constraint?

## Key Takeaway
Checking the maximum element frequency against the allowed limit directly determines split feasibility.
