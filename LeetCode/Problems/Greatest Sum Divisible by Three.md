# 1262. Greatest Sum Divisible by Three

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/greatest-sum-divisible-by-three](https://leetcode.com/problems/greatest-sum-divisible-by-three)
**Companies:** Amazon, Bloomberg, De Shaw, Goldman Sachs, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP on Remainders — O(n) ✅](#3-approach-dp-on-remainders--on-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an integer array `nums`, find the maximum possible sum of a subset of its elements such that the sum is divisible by three.

---

## 2. Key Insight

> Track the best achievable sum for each remainder modulo 3 (`dp[0]`, `dp[1]`, `dp[2]`). For each number, update all three remainder states based on the previous best values.

---

## 3. Approach: DP on Remainders — O(n) ✅

```text
FUNCTION maxSumDivisibleByThree(nums):
    SET dp[0] ← 0
    SET dp[1] ← -∞
    SET dp[2] ← -∞

    FOR each num IN nums:
        SET temp ← dp COPY
        FOR i ← 0 TO 2:
            SET newRem ← (i + num) MOD 3
            SET temp[newRem] ← MAX(temp[newRem], dp[i] + num)
        SET dp ← temp

    RETURN dp[0]
```

---

## 4. Examples

| nums | Output |
|------|--------|
| [3,6,5,1,8] | 18 |
| [4] | 0 |
| [1,2,3,4,4] | 12 |

---

## 5. Walkthrough

1. Initialise `dp` with `dp[0]=0` and the other remainders as negative infinity.
2. Process each element, creating a temporary copy of `dp`.
3. For each remainder `i`, compute the new remainder after adding `num` and update the temporary array with the larger sum.
4. Replace `dp` with the temporary array after handling the current number.
5. After all numbers are processed, `dp[0]` holds the largest sum divisible by three.

---

## 6. Complexity Analysis

- **Time:** O(n) where n is the length of `nums` (single pass with constant‑size DP).
- **Space:** O(1) extra space for the three‑element DP array.

---

## 7. Key Takeaway

> Using a tiny DP table for each possible remainder modulo k efficiently solves “maximum sum divisible by k” problems.
