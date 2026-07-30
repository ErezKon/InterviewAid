# 2592. Maximize Greatness of an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-greatness-of-an-array](https://leetcode.com/problems/maximize-greatness-of-an-array)
**Companies:** Amazon, Microsoft, Nvidia, Oracle, Twilio, Ukg, Weride

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sort + Two Pointers — O(n log n)](#approach-sort--two-pointers--on-log-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, you can rearrange it into a permutation `perm`. The **greatness** is the number of indices where `perm[i] > nums[i]`. Maximize the greatness.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `0 ≤ nums[i] ≤ 10⁹`

---

## Examples

**Example 1:**
```
Input:  nums = [1,3,5,2,1,3,1]
Output: 4
Explanation: Sort: [1,1,1,2,3,3,5]. Match each element with the next larger one.
```

---

## Key Insight

> This is the **"advantage shuffle"** pattern (LC 870). Sort the array and use two pointers: try to match each element (pointer `j`) with the smallest element strictly greater than it (pointer `i`). The count of successful matches is the answer — equivalent to `n - maxFrequency`, since the most frequent element can never be "beaten" by itself.

---

## Approach: Sort + Two Pointers — O(n log n) ✅

```
FUNCTION maximizeGreatness(nums):
    SORT nums
    j = 0
    FOR i ← 0 TO n - 1:
        IF nums[i] > nums[j]:
            j += 1
    RETURN j
```

`j` counts how many elements from the front of the sorted array have been "beaten" by a larger element scanning from left to right.

---

## Walkthrough

```
nums = [1, 3, 5, 2, 1, 3, 1] → sorted: [1, 1, 1, 2, 3, 3, 5]
```

| i | nums[i] | j | nums[j] | nums[i] > nums[j]? | j after |
|---|---------|---|---------|---------------------|---------|
| 0 | 1       | 0 | 1       | No                  | 0       |
| 1 | 1       | 0 | 1       | No                  | 0       |
| 2 | 1       | 0 | 1       | No                  | 0       |
| 3 | 2       | 0 | 1       | Yes → j++           | 1       |
| 4 | 3       | 1 | 1       | Yes → j++           | 2       |
| 5 | 3       | 2 | 1       | Yes → j++           | 3       |
| 6 | 5       | 3 | 2       | Yes → j++           | 4       |

**Result:** 4 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + Two Pointers | **O(n log n)** | O(1) |

---

## Follow-Up Questions

**Q1: Why is this equivalent to `n - maxFrequency`?**
The maximum frequency element can never beat itself. Every other element can be beaten by something larger. So greatness = n - (count of most frequent element).

**Q2: How does this relate to "Advantage Shuffle" (LC 870)?**
LC 870 asks you to construct the permutation, not just count. Use the same greedy with a sorted multiset to find specific assignments.

---

## Key Takeaway

> **Maximizing greatness (how many positions beat the original) reduces to sort + two pointers.** The greedy insight: match each element with the smallest available element that beats it, wasting nothing.
