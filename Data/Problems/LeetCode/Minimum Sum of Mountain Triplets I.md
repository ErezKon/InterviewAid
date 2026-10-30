# 2908. Minimum Sum of Mountain Triplets I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-sum-of-mountain-triplets-i](https://leetcode.com/problems/minimum-sum-of-mountain-triplets-i)
**Companies:** Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Prefix/Suffix Min — O(n)](#4-approach-prefixsuffix-min--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a **0-indexed** array `nums` of integers.

A triplet of indices `(i, j, k)` is a **mountain** if:

- `i < j < k`
- `nums[i] < nums[j]` and `nums[k] < nums[j]`

Return *the **minimum possible sum** of a mountain triplet of* `nums`. *If no such triplet exists, return* `-1`.

**Constraints:**
- `3 <= nums.length <= 50`
- `1 <= nums[i] <= 50`

---

## 2. Examples

**Example 1:**
```
Input: nums = [8,6,1,5,3]
Output: 9
Explanation: Triplet (2, 3, 4) is a mountain triplet of sum 9 since:
- 2 < 3 < 4
- nums[2] < nums[3] and nums[4] < nums[3]
And the sum of this triplet is nums[2] + nums[3] + nums[4] = 9. It can be shown that there are no mountain triplets with a sum of less than 9.
```

**Example 2:**
```
Input: nums = [5,4,8,7,10,2]
Output: 13
Explanation: Triplet (1, 3, 5) is a mountain triplet of sum 13 since:
- 1 < 3 < 5
- nums[1] < nums[3] and nums[5] < nums[3]
And the sum of this triplet is nums[1] + nums[3] + nums[5] = 13. It can be shown that there are no mountain triplets with a sum of less than 13.
```

**Example 3:**
```
Input: nums = [6,5,4,3,4,5]
Output: -1
Explanation: It can be shown that there are no mountain triplets in nums.
```

---

## 3. Key Insight

> For each middle element `j`, the optimal sum uses the smallest element to its left and the smallest element to its right. Precompute **prefix min** and **suffix min**.

---

## 4. Approach: Prefix/Suffix Min — O(n) ✅

```
FUNCTION minimumSum(nums):
    n = len(nums)
    prefMin = [nums[0]] * n
    FOR i ← 1 TO n-1:
        prefMin[i] = MIN(prefMin[i-1], nums[i])

    suffMin = [nums[n-1]] * n
    FOR i ← n-2 DOWN TO 0:
        suffMin[i] = MIN(suffMin[i+1], nums[i])

    minSum = infinity
    FOR j ← 1 TO n-2:
        IF prefMin[j-1] < nums[j] AND suffMin[j+1] < nums[j]:
            minSum = MIN(minSum, prefMin[j-1] + nums[j] + suffMin[j+1])

    RETURN minSum IF minSum != infinity ELSE -1
```

---

## 5. Walkthrough

```
nums = [8, 6, 1, 5, 3]
prefMin = [8, 6, 1, 1, 1]
suffMin = [1, 1, 1, 3, 3]

j=1: prefMin[0]=8 < 6? NO
j=2: prefMin[1]=6 < 1? NO
j=3: prefMin[2]=1 < 5? YES, suffMin[4]=3 < 5? YES → 1+5+3=9
j (no more valid)

Answer = 9 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) — prefix and suffix arrays |

---

## 7. Key Takeaway

> **Prefix min + suffix min for mountain triplets** — for each peak `j`, the best flanks are the smallest values to its left and right. O(n) with precomputation.
