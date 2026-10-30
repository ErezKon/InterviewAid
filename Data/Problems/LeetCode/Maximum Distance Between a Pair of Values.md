# 1855. Maximum Distance Between a Pair of Values

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-distance-between-a-pair-of-values](https://leetcode.com/problems/maximum-distance-between-a-pair-of-values)
**Companies:** Google, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Two Pointers — O(n + m)](#approach-two-pointers--on--m-)
- [Complexity Analysis](#complexity-analysis)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given two **non-increasing 0-indexed **integer arrays `nums1` and `nums2`.

A pair of indices `(i, j)`, where `0 <= i < nums1.length` and `0 <= j < nums2.length`, is **valid** if both `i <= j` and `nums1[i] <= nums2[j]`. The **distance** of the pair is `j - i`.

Return *the **maximum distance** of any **valid** pair *`(i, j)`*. If there are no valid pairs, return *`0`.

An array `arr` is **non-increasing** if `arr[i-1] >= arr[i]` for every `1 <= i < arr.length`.

**Constraints:**
- `1 <= nums1.length, nums2.length <= 10^5`
- `1 <= nums1[i], nums2[j] <= 10^5`
- Both `nums1` and `nums2` are **non-increasing**.

---

## Key Insight

> Both arrays are sorted in non-increasing order. Use two pointers: advance j as far as possible while `nums1[i] ≤ nums2[j]`, then advance i. Track max `j - i`.

---

## Approach: Two Pointers — O(n + m) ✅

```text
FUNCTION maxDistance(nums1, nums2):
    i ← 0
    j ← 0
    result ← 0
    WHILE i < LEN(nums1) AND j < LEN(nums2):
        IF nums1[i] > nums2[j]:
            i ← i + 1
        ELSE:
            result ← MAX(result, j - i)
            j ← j + 1
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two Pointers | **O(n + m)** | O(1) |

---

## Examples

**Example 1:**
```
Input: nums1 = [55,30,5,4,2], nums2 = [100,20,10,10,5]
Output: 2
Explanation: The valid pairs are (0,0), (2,2), (2,3), (2,4), (3,3), (3,4), and (4,4).
The maximum distance is 2 with pair (2,4).
```

**Example 2:**
```
Input: nums1 = [2,2,2], nums2 = [10,10,1]
Output: 1
Explanation: The valid pairs are (0,0), (0,1), and (1,1).
The maximum distance is 1 with pair (0,1).
```

**Example 3:**
```
Input: nums1 = [30,29,19,5], nums2 = [25,25,25,25,25]
Output: 2
Explanation: The valid pairs are (2,2), (2,3), (2,4), (3,3), and (3,4).
The maximum distance is 2 with pair (2,4).
```

---

## Walkthrough

Consider `nums1 = [5,4,3]` and `nums2 = [6,5,4,3,2]`.

| Step | i | j | nums1[i] | nums2[j] | result |
|------|---|---|----------|----------|--------|
| Init | 0 | 0 | 5 | 6 | 0 |
| 1 | 0 | 0 | 5 ≤ 6 → result=0, j++ | 0 | 1 |
| 2 | 0 | 1 | 5 ≤ 5 → result=1, j++ | 0 | 2 |
| 3 | 0 | 2 | 5 > 4 → i++ | 1 | 2 |
| 4 | 1 | 2 | 4 ≤ 4 → result=2, j++ | 1 | 3 |
| 5 | 1 | 3 | 4 > 3 → i++ | 2 | 3 |
| 6 | 2 | 3 | 3 ≤ 3 → result=3, j++ | 2 | 4 |
| End | - | - | - | - | max distance = 4 |

---

## Follow-Up Questions

- How would the solution change if the arrays were sorted in non‑decreasing order?
- Can you adapt the algorithm to return the actual pair of indices instead of just the distance?
- What if the arrays contain duplicate values and you need the lexicographically smallest pair?

---

## Key Takeaway

> **Non-increasing arrays + pair distance = two pointers.** Advance j to maximize distance while maintaining the constraint.
