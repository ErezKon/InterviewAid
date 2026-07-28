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

Given an integer array `nums` and an integer `k`, you may change each element by at most `k` (increase or decrease). The **beauty** of the array is the length of the longest subsequence where all elements become equal after the allowed changes. Return the maximum possible beauty.

---

## Examples

**Example 1:**
```
nums = [4,6,5,3,3]
k = 1
```
**Output:** `4`
**Explanation:** Adjust to `[4,5,5,4,4]`; the subsequence `[4,5,5,4]` can be made all `4` or all `5`. The longest equal subsequence has length 4.

**Example 2:**
```
nums = [1,10,100]
k = 0
```
**Output:** `1`
**Explanation:** No changes allowed; the longest equal subsequence is any single element.

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
