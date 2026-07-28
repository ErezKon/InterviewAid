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

The **score** of a prefix of length `i` is `nums[i] + max(nums[0..i])`. Return the array of all prefix scores.

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
- Prefix 0: max=2, score=2+2=4
- Prefix 1: max=3, score=3+3 + previous = 10
- Prefix 2: max=7, score=7+7 + previous = 24
- Prefix 3: max=7, score=5+7 + previous = 36
- Prefix 4: max=10, score=10+10 + previous = 56
```

**Example 2:**
```
Input: nums = [1,1,1]
Output: [2,5,9]
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
