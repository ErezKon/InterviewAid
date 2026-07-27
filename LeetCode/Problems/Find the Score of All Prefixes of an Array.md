# 2640. Find the Score of All Prefixes of an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-score-of-all-prefixes-of-an-array](https://leetcode.com/problems/find-the-score-of-all-prefixes-of-an-array)
**Companies:** Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Running Max + Prefix Sum — O(n) ✅](#2-approach-running-max--prefix-sum--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

The **score** of a prefix of length `i` is `nums[i] + max(nums[0..i])`. Return the array of all prefix scores.

---

## 2. Approach: Running Max + Prefix Sum — O(n) ✅

```
FUNCTION findPrefixScore(nums):
    result ← []; maxSoFar ← 0; runningSum ← 0
    FOR num IN nums DO
        maxSoFar ← MAX(maxSoFar, num)
        runningSum += num + maxSoFar
        result.ADD(runningSum)
    RETURN result
```

---

## 3. Key Takeaway

> Track running maximum and accumulate `nums[i] + maxSoFar` into a prefix sum. Single pass O(n).
