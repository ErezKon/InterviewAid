# 268. Missing Number

**Difficulty:** 🟢 Easy
**Acceptance:** 67.0%
**LeetCode:** [https://leetcode.com/problems/missing-number](https://leetcode.com/problems/missing-number)
**Companies:** Adobe, Amazon, Apple, Aqr Capital Management, Arista Networks, Blackrock, Bloomberg, Goldman Sachs, Google, Hcl, Ibm, Meta, Microsoft, Nvidia, Oracle, Revolut, Salesforce, Tcs, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: XOR — O(n), O(1)](#3-approach-1-xor)
4. [Approach 2: Sum Formula — O(n), O(1)](#4-approach-2-sum-formula)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array `nums` containing `n` distinct numbers in `[0, n]`, return the one number that is missing.

---

## 2. Examples

| nums | Output |
|------|--------|
| [3,0,1] | 2 |
| [0,1] | 2 |
| [9,6,4,2,3,5,7,0,1] | 8 |

---

## 3. Approach 1: XOR — O(n), O(1) ✅

```text
FUNCTION missingNumber(nums):
    result ← LENGTH(nums)
    FOR i ← 0 TO LENGTH(nums) - 1:
        result ← result XOR i XOR nums[i]
    RETURN result
```

---

## 4. Approach 2: Sum Formula — O(n), O(1) ✅

```text
FUNCTION missingNumber(nums):
    n ← LENGTH(nums)
    expected ← n * (n + 1) / 2
    actual ← SUM(nums)
    RETURN expected - actual
```

---

## 5. Walkthrough

Consider `nums = [3,0,1]` (n = 3).
1. **XOR method:** `result = 3`. Loop i=0..2:
   - i=0: result = 3 XOR 0 XOR 3 = 0
   - i=1: result = 0 XOR 1 XOR 0 = 1
   - i=2: result = 1 XOR 2 XOR 1 = 2 → missing number.
2. **Sum method:** `expected = 3*4/2 = 6`. `actual = 3+0+1 = 4`. `missing = 6-4 = 2`.
Both yield 2.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

1. How would you solve this if the numbers could appear multiple times?
2. Can you find the missing number in a read‑only array with O(1) extra space?
3. How would you extend the solution to find two missing numbers?

---

## 8. Key Takeaway

> XOR with all indices and values — the missing number won't cancel out. Sum formula is simpler but watch for overflow.
