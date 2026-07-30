# 2215. Find the Difference of Two Arrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-difference-of-two-arrays](https://leetcode.com/problems/find-the-difference-of-two-arrays)
**Companies:** Accenture, Adobe, Amazon, Bloomberg, Google, Meta, Microsoft, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Set Difference — O(n + m) ✅](#4-approach-set-difference--on--m-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given two 0-indexed integer arrays `nums1` and `nums2`, return a list of two lists:
- Elements in `nums1` not in `nums2` (distinct values).
- Elements in `nums2` not in `nums1` (distinct values).

**Constraints:**
- `1 <= nums1.length, nums2.length <= 1000`
- `-1000 <= nums1[i], nums2[i] <= 1000`

---

## 2. Examples

```
Example 1:
  Input:  nums1 = [1,2,3], nums2 = [2,4,6]
  Output: [[1,3],[4,6]]

Example 2:
  Input:  nums1 = [1,2,3,3], nums2 = [1,1,2,2]
  Output: [[3],[]]
```

---

## 3. Key Insight

> Convert both arrays to sets. Set difference (`set1 - set2` and `set2 - set1`) gives exactly the elements unique to each.

---

## 4. Approach: Set Difference — O(n + m) ✅

```
FUNCTION findDifference(nums1, nums2):
    set1 = SET(nums1)
    set2 = SET(nums2)
    RETURN [list(set1 - set2), list(set2 - set1)]
```

---

## 5. Walkthrough

```
nums1 = [1,2,3], nums2 = [2,4,6]
set1 = {1,2,3}, set2 = {2,4,6}

set1 - set2 = {1,3}
set2 - set1 = {4,6}

Result: [[1,3], [4,6]] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n + m) — set construction + difference |
| **Space** | O(n + m) — two sets |

---

## 7. Key Takeaway

> **Set difference** is the idiomatic O(n) approach for finding elements unique to each of two collections. Most languages provide built-in set subtraction.
