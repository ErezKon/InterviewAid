# 1764. Form Array by Concatenating Subarrays of Another Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/form-array-by-concatenating-subarrays-of-another-array](https://leetcode.com/problems/form-array-by-concatenating-subarrays-of-another-array)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Greedy Matching — O(n · m) ✅](#2-approach-greedy-matching--on--m-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given `groups` (list of arrays) and `nums`, check if you can find non-overlapping subarrays in `nums` matching each group in order.

**Constraints:**
- `1 <= groups.length, nums.length <= 1000`

---

## 2. Approach: Greedy Matching — O(n · m) ✅

```
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

## 3. Key Takeaway

> **Greedy left-to-right matching** — find each group as early as possible in `nums`, then advance past it. O(n · m) worst case.
