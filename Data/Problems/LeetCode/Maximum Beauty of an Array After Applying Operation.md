# 2779. Maximum Beauty of an Array After Applying Operation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-beauty-of-an-array-after-applying-operation](https://leetcode.com/problems/maximum-beauty-of-an-array-after-applying-operation)
**Companies:** Amazon, Google

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

You are given a **0-indexed** array `nums` and a **non-negative** integer `k`.

In one operation, you can do the following:

- Choose an index `i` that **hasn't been chosen before** from the range `[0, nums.length - 1]`.
- Replace `nums[i]` with any integer from the range `[nums[i] - k, nums[i] + k]`.

The **beauty** of the array is the length of the longest subsequence consisting of equal elements.

Return *the **maximum** possible beauty of the array *`nums`* after applying the operation any number of times.*

**Note** that you can apply the operation to each index **only once**.

A **subsequence** of an array is a new array generated from the original array by deleting some elements (possibly none) without changing the order of the remaining elements.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i], k <= 10^5`

---

## Examples

**Example 1:**
```
Input: nums = [4,6,1,2], k = 2
Output: 3
Explanation: In this example, we apply the following operations:
- Choose index 1, replace it with 4 (from range [4,8]), nums = [4,4,1,2].
- Choose index 3, replace it with 4 (from range [0,4]), nums = [4,4,1,4].
After the applied operations, the beauty of the array nums is 3 (subsequence consisting of indices 0, 1, and 3).
It can be proven that 3 is the maximum possible length we can achieve.
```

**Example 2:**
```
Input: nums = [1,1,1,1], k = 10
Output: 4
Explanation: In this example we don't have to apply any operations.
The beauty of the array nums is 4 (whole array).
```

---

## Approach

> **Sliding Window after Sorting** – Two elements can be made equal if their original values differ by at most `2k`. Sort the array and maintain a window where `nums[right] - nums[left] ≤ 2k`. The window size is the achievable beauty.

```text
FUNCTION maximumBeauty(nums, k):
    SORT nums
    left ← 0
    result ← 0
    FOR right ← 0 TO LENGTH(nums) - 1:
        WHILE nums[right] - nums[left] > 2 * k:
            left ← left + 1
        result ← MAX(result, right - left + 1)
    RETURN result
```

---

## Walkthrough

Consider `nums = [4,6,5,3,3]`, `k = 1`.
| Step | Sorted nums | left | right | nums[right] - nums[left] | window size |
|------|-------------|------|-------|------------------------|-------------|
| 1 | `[3,3,4,5,6]` | 0 | 0 | 0 ≤ 2 | 1 |
| 2 | 0 | 0 | 1 | 0 ≤ 2 | 2 |
| 3 | 0 | 0 | 2 | 1 ≤ 2 | 3 |
| 4 | 0 | 0 | 3 | 2 ≤ 2 | 4 |
| 5 | 0 | 1 | 4 | 3 > 2 → left=1 → diff=3 >2 → left=2 → diff=2 ≤2 | 3 |
Maximum window size observed = 4.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + Sliding Window | **O(n log n)** (sorting) | O(1) additional |

---

## Follow-Up Questions

- How would you modify the algorithm if each element could be changed by a different limit `k_i`?
- Can you compute the beauty in O(n) time without sorting, perhaps using a counting sort for bounded values?
- What if you need to return the actual value that the subsequence can be transformed into?

---

## Key Takeaway

> **Elements are interchangeable when their value ranges overlap.** Sorting and a sliding window efficiently find the largest group whose ranges intersect, giving the maximum beauty.
