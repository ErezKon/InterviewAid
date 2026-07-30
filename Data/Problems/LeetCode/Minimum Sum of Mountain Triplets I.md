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

Given an array `nums`, find indices `i < j < k` where `nums[i] < nums[j]` and `nums[k] < nums[j]` (mountain triplet). Return the **minimum** `nums[i] + nums[j] + nums[k]`, or `-1` if none.

**Constraints:**
- `3 <= nums.length <= 50`
- `1 <= nums[i] <= 50`

---

## 2. Examples

```
Example 1:
  Input: nums = [8, 6, 1, 5, 3]
  Output: 9
  Explanation: Triplet (2,3,4): 1+5+3 = 9. 1<5 and 3<5 ✅

Example 2:
  Input: nums = [5, 4, 8, 7, 10, 2]
  Output: 13
  Explanation: Triplet (0,2,3): 5+8+7=20 or (1,2,5): 4+8+2=14... (0,2,5): 5+8+2=15.
    Better: (1,3,5): 4+7+2=13 ✅
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
