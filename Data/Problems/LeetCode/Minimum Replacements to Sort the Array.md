# 2366. Minimum Replacements to Sort the Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-replacements-to-sort-the-array](https://leetcode.com/problems/minimum-replacements-to-sort-the-array)
**Companies:** Expedia, Google, Moveworks, Paypal, Zscaler

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy (Right to Left) — O(n)](#4-approach-greedy-right-to-left--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given a **0-indexed** integer array `nums`. In one operation you can replace any element of the array with **any two** elements that **sum** to it.

- For example, consider `nums = [5,6,7]`. In one operation, we can replace `nums[1]` with `2` and `4` and convert `nums` to `[5,2,4,7]`.

Return *the minimum number of operations to make an array that is sorted in **non-decreasing** order*.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

---

## 2. Examples

**Example 1:**
```
Input: nums = [3,9,3]
Output: 2
Explanation: Here are the steps to sort the array in non-decreasing order:
- From [3,9,3], replace the 9 with 3 and 6 so the array becomes [3,3,6,3]
- From [3,3,6,3], replace the 6 with 3 and 3 so the array becomes [3,3,3,3,3]
There are 2 steps to sort the array in non-decreasing order. Therefore, we return 2.
```

**Example 2:**
```
Input: nums = [1,2,3,4,5]
Output: 0
Explanation: The array is already in non-decreasing order. Therefore, we return 0.
```

---

## 3. Key Insight

> Process right-to-left. The last element is fixed. For each element going left, if it's larger than `prev`, split it into the minimum number of parts all ≤ `prev`. The split count = `⌈nums[i]/prev⌉`, costing `k - 1` operations. Update `prev` to `⌊nums[i]/k⌋` (the largest minimum part).

---

## 4. Approach: Greedy (Right to Left) — O(n) ✅

```
FUNCTION minimumReplacement(nums):
    ops = 0
    prev = nums[-1]

    FOR i ← n - 2 DOWN TO 0:
        IF nums[i] <= prev:
            prev = nums[i]
            CONTINUE
        // Split nums[i] into k parts, each ≤ prev
        k = ceil(nums[i] / prev)
        ops += k - 1
        prev = nums[i] / k    // largest possible minimum part

    RETURN ops
```

---

## 5. Walkthrough

```
nums = [3, 9, 3]
prev = 3

i=1: nums[1]=9 > prev=3
  k = ceil(9/3) = 3  →  split into 3 parts: [3, 3, 3]
  ops += 3-1 = 2
  prev = floor(9/3) = 3

i=0: nums[0]=3 <= prev=3 → prev=3

Total ops = 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass right to left |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

**Q1: Why process right to left?**
The last element can never be split (splitting only helps if the element is too large relative to what comes after). So we fix the end and work backward.

**Q2: Why use `floor(nums[i]/k)` for the new prev?**
We want the parts to be as large as possible (to not overly constrain the element to the left), but all ≤ `prev`. Dividing evenly gives the optimal split.

**Q3: What if we could split into more than 2 parts at once?**
That's what this solution handles — splitting into `k` parts is `k-1` operations (each operation splits one element into two).

---

## 8. Key Takeaway

> **Greedy from right to left with optimal splitting** — the key formula is `k = ⌈nums[i]/prev⌉` for the number of parts and `prev = ⌊nums[i]/k⌋` for the constraint on the next element. O(n) and O(1) space.
