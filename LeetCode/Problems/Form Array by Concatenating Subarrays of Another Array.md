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

Given `groups` (list of arrays) and `nums`, check if you can find non-overlapping subarrays in `nums` matching each group in order.

**Constraints:**
- `1 <= groups.length, nums.length <= 1000`

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

| groups | nums | Output |
|--------|------|--------|
| [[1,2],[3,4]] | [1,2,3,4,5] | true |
| [[1,2],[3,4]] | [1,2,4,3,5] | false |

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
