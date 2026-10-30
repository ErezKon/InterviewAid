# 1764. Form Array by Concatenating Subarrays of Another Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/form-array-by-concatenating-subarrays-of-another-array](https://leetcode.com/problems/form-array-by-concatenating-subarrays-of-another-array)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Greedy Matching — O(n · m) ✅](#2-approach-greedy-matching--on--m-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a 2D integer array `groups` of length `n`. You are also given an integer array `nums`.

You are asked if you can choose `n` **disjoint **subarrays from the array `nums` such that the `i^th` subarray is equal to `groups[i]` (**0-indexed**), and if `i > 0`, the `(i-1)^th` subarray appears **before** the `i^th` subarray in `nums` (i.e. the subarrays must be in the same order as `groups`).

Return `true` *if you can do this task, and* `false` *otherwise*.

Note that the subarrays are **disjoint** if and only if there is no index `k` such that `nums[k]` belongs to more than one subarray. A subarray is a contiguous sequence of elements within an array.

**Constraints:**
- `groups.length == n`
- `1 <= n <= 10^3`
- `1 <= groups[i].length, sum(groups[i].length) <= 10^3`
- `1 <= nums.length <= 10^3`
- `-10^7 <= groups[i][j], nums[k] <= 10^7`

---

## 2. Approach: Greedy Matching — O(n · m) ✅

```text
FUNCTION canChoose(groups, nums):
    i ← 0    // pointer in nums
    FOR group IN groups DO
        found ← false
        WHILE i + LENGTH(group) <= LENGTH(nums) DO
            IF nums[i:i+LENGTH(group)] == group THEN
                i += LENGTH(group)
                found ← true
                BREAK
            i += 1
        IF NOT found THEN RETURN false
    RETURN true
```

---

## 3. Examples

**Example 1:**
```
Input: groups = [[1,-1,-1],[3,-2,0]], nums = [1,-1,0,1,-1,-1,3,-2,0]
Output: true
Explanation: You can choose the 0^th subarray as [1,-1,0,1,-1,-1,3,-2,0] and the 1^st one as [1,-1,0,1,-1,-1,3,-2,0].
These subarrays are disjoint as they share no common nums[k] element.
```

**Example 2:**
```
Input: groups = [[10,-2],[1,2,3,4]], nums = [1,2,3,4,10,-2]
Output: false
Explanation: Note that choosing the subarrays [1,2,3,4,10,-2] and [1,2,3,4,10,-2] is incorrect because they are not in the same order as in groups.
[10,-2] must come before [1,2,3,4].
```

**Example 3:**
```
Input: groups = [[1,2,3],[3,4]], nums = [7,7,1,2,3,4,7,7]
Output: false
Explanation: Note that choosing the subarrays [7,7,1,2,3,4,7,7] and [7,7,1,2,3,4,7,7] is invalid because they are not disjoint.
They share a common elements nums[4] (0-indexed).
```

---

## 4. Walkthrough

Consider `groups = [[1,2],[3,4]]` and `nums = [1,2,3,4,5]`.

1. Start with `i = 0`. The first group `[1,2]` matches `nums[0:2]`. Advance `i` to `2`.
2. Next group `[3,4]` matches `nums[2:4]`. Advance `i` to `4`.
3. All groups matched → return `true`.

If `nums` were `[1,2,4,3,5]`, the second group would never align, leading to `false`.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · m) – each element of `nums` may be scanned for each group |
| **Space** | O(1) – only pointers and flags used |

---

## 6. Follow-Up Questions

1. How would you handle overlapping groups?
2. Can the solution be optimized using KMP or rolling hash for faster subarray matching?
3. What if groups are very large compared to `nums`?

---

## 7. Key Takeaway

> **Greedy left-to-right matching** — find each group as early as possible in `nums`, then advance past it. O(n · m) worst case.
