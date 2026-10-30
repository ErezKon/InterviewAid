# 2465. Number of Distinct Averages

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-distinct-averages](https://leetcode.com/problems/number-of-distinct-averages)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Sort + Two Pointers — O(n log n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a **0-indexed** integer array `nums` of **even** length.

As long as `nums` is **not** empty, you must repetitively:

- Find the minimum number in `nums` and remove it.
- Find the maximum number in `nums` and remove it.
- Calculate the average of the two removed numbers.

The **average** of two numbers `a` and `b` is `(a + b) / 2`.

- For example, the average of `2` and `3` is `(2 + 3) / 2 = 2.5`.

Return *the number of **distinct** averages calculated using the above process*.

**Note** that when there is a tie for a minimum or maximum number, any can be removed.

**Constraints:**

- `2 <= nums.length <= 100`
- `nums.length` is even.
- `0 <= nums[i] <= 100`

---

## 2. Examples

```
Example 1:
  Input: nums = [4,1,4,0,3,5]
  Output: 2
  Explanation:
  1. Remove 0 and 5, and the average is (0 + 5) / 2 = 2.5. Now, nums = [4,1,4,3].
  2. Remove 1 and 4. The average is (1 + 4) / 2 = 2.5, and nums = [4,3].
  3. Remove 3 and 4, and the average is (3 + 4) / 2 = 3.5.
  Since there are 2 distinct numbers among 2.5, 2.5, and 3.5, we return 2.
```

```
Example 2:
  Input: nums = [1,100]
  Output: 1
  Explanation: There is only one average to be calculated after removing 1 and 100, so we return 1.
```

---

## 3. Approach: Sort + Two Pointers — O(n log n) ✅

```text
FUNCTION distinctAverages(nums):
    // Sort the array to easily access min and max
    SORT(nums)
    SET averages ← empty set
    SET lo ← 0
    SET hi ← LENGTH(nums) - 1
    WHILE lo < hi:
        SET avg ← (nums[lo] + nums[hi]) / 2
        ADD avg TO averages
        SET lo ← lo + 1
        SET hi ← hi - 1
    RETURN SIZE(averages)
```

---

## 4. Walkthrough

Consider the array `[3,1,2,5,4]`.
| Step | Sorted Array | lo | hi | Pair | Average | Averages Set |
|------|--------------|----|----|------|---------|--------------|
| 1    | [1,2,3,4,5] | 0  | 4  | (1,5) | 3       | {3} |
| 2    | [1,2,3,4,5] | 1  | 3  | (2,4) | 3       | {3} |
| End  | lo >= hi     |    |    |      |         | {3} |
The set size is 1, so the answer is 1.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) – sorting dominates |
| **Space** | O(n) – set to store averages |

---

## 6. Follow-Up Questions

1. How would the solution change if we needed the **sum** of distinct averages instead of the count?
2. Can we solve the problem in O(n) time without sorting using a hash‑based approach?
3. How would you adapt the algorithm for a streaming input where numbers arrive one by one?

---

## 7. Key Takeaway

> **Sort then pair min/max with two pointers.** Collect averages in a set for uniqueness.
