# 2640. Find the Score of All Prefixes of an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-score-of-all-prefixes-of-an-array](https://leetcode.com/problems/find-the-score-of-all-prefixes-of-an-array)
**Companies:** Tiktok
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Running Max + Prefix Sum — O(n) ✅](#2-approach-running-max--prefix-sum--on-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

We define the **conversion array** `conver` of an array `arr` as follows:

- `conver[i] = arr[i] + max(arr[0..i])` where `max(arr[0..i])` is the maximum value of `arr[j]` over `0 <= j <= i`.

We also define the **score** of an array `arr` as the sum of the values of the conversion array of `arr`.

Given a **0-indexed** integer array `nums` of length `n`, return *an array* `ans` *of length* `n` *where* `ans[i]` *is the score of the prefix* `nums[0..i]`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

---

## 2. Approach: Running Max + Prefix Sum — O(n) ✅

```text
FUNCTION findPrefixScore(nums):
    result ← []
    maxSoFar ← 0
    runningSum ← 0
    FOR num IN nums DO
        maxSoFar ← MAX(maxSoFar, num)
        runningSum ← runningSum + num + maxSoFar
        APPEND runningSum TO result
    RETURN result
```

---

## 3. Examples

**Example 1:**
```
Input: nums = [2,3,7,5,10]
Output: [4,10,24,36,56]
Explanation:
For the prefix [2], the conversion array is [4] hence the score is 4
For the prefix [2, 3], the conversion array is [4, 6] hence the score is 10
For the prefix [2, 3, 7], the conversion array is [4, 6, 14] hence the score is 24
For the prefix [2, 3, 7, 5], the conversion array is [4, 6, 14, 12] hence the score is 36
For the prefix [2, 3, 7, 5, 10], the conversion array is [4, 6, 14, 12, 20] hence the score is 56
```

**Example 2:**
```
Input: nums = [1,1,2,4,8,16]
Output: [2,4,8,16,32,64]
Explanation:
For the prefix [1], the conversion array is [2] hence the score is 2
For the prefix [1, 1], the conversion array is [2, 2] hence the score is 4
For the prefix [1, 1, 2], the conversion array is [2, 2, 4] hence the score is 8
For the prefix [1, 1, 2, 4], the conversion array is [2, 2, 4, 8] hence the score is 16
For the prefix [1, 1, 2, 4, 8], the conversion array is [2, 2, 4, 8, 16] hence the score is 32
For the prefix [1, 1, 2, 4, 8, 16], the conversion array is [2, 2, 4, 8, 16, 32] hence the score is 64
```

---

## 4. Walkthrough

Take `nums = [2,3,7,5,10]`.
| i | num | maxSoFar | runningSum (prev) | new score | runningSum (new) |
|---|-----|---------|-------------------|-----------|-------------------|
|0|2|2|0|2+2=4|4|
|1|3|3|4|3+3=6|10|
|2|7|7|10|7+7=14|24|
|3|5|7|24|5+7=12|36|
|4|10|10|36|10+10=20|56|
The result array is `[4,10,24,36,56]`.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass through the array |
| **Space** | O(n) — result array (output) |

---

## 6. Key Takeaway

> Track running maximum and accumulate `nums[i] + maxSoFar` into a prefix sum. Single pass O(n).
