# 349. Intersection of Two Arrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/intersection-of-two-arrays](https://leetcode.com/problems/intersection-of-two-arrays)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Capgemini, Criteo, Google, Infosys, Jpmorgan, Meta, Microsoft, Mongodb, Nvidia, Tcs, Two Sigma, Wix, Yandex, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Set Intersection — O(m+n) ✅](#4-approach-set-intersection--omn-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given two integer arrays `nums1` and `nums2`, return an array of their **unique** intersection (each element appears at most once in the result).

**Constraints:**
- `1 <= nums1.length, nums2.length <= 1000`
- `0 <= nums1[i], nums2[i] <= 1000`

---

## 2. Examples

```
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
```

---

## 3. Key Insight

Convert both arrays to sets and take their intersection. This eliminates duplicates and gives O(1) lookup per element.

---

## 4. Approach: Set Intersection — O(m+n) ✅

```
FUNCTION intersection(nums1, nums2):
    RETURN SET(nums1) ∩ SET(nums2)
```

For sorted arrays, use two pointers: O(m+n) time, O(1) extra space.

---

## 5. Walkthrough

```
nums1 = [4,9,5], nums2 = [9,4,9,8,4]
set1 = {4, 5, 9}
set2 = {4, 8, 9}
set1 ∩ set2 = {4, 9}
```

**Result:** `[4, 9]` ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(m + n) | Build two sets + intersect |
| Space | O(m + n) | Two sets |

---

## 7. Follow-Up Questions

### 7.1 Intersection II (#350)?

Count duplicates too. Use hash map of frequencies, or two pointers on sorted arrays.

### 7.2 What if arrays are sorted?

Use two pointers: advance the smaller, collect on equality (skip duplicates). O(m+n) time, O(1) space.

### 7.3 What if one array is much smaller?

Use the smaller array as a set, iterate the larger — reduces space to O(min(m,n)).

---

## 8. Key Takeaway

> Set intersection is the simplest approach for unique element intersection. For sorted inputs, the two-pointer technique avoids extra space. Know both approaches — the interviewer may restrict which you can use.
