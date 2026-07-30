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

Repeatedly remove the minimum and maximum elements from the array, compute their average, and collect these averages. Return the number of **distinct** averages obtained.

---

## 2. Examples

**Example 1:**
```
Input: nums = [3,1,2,5,4]
Output: 2
Explanation:
Sorted array: [1,2,3,4,5]
Pairs: (1,5) → average 3, (2,4) → average 3, leftover 3 ignored.
Only one distinct average (3), so answer is 1.
```

**Example 2:**
```
Input: nums = [1,100]
Output: 1
Explanation: Average is (1+100)/2 = 50.5, only one distinct average.
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
