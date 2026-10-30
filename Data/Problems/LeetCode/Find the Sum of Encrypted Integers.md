# 3079. Find the Sum of Encrypted Integers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-sum-of-encrypted-integers](https://leetcode.com/problems/find-the-sum-of-encrypted-integers)
**Companies:** Larsen Toubro

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Digit Replacement — O(n·d) ✅](#2-approach-digit-replacement--on--d-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

You are given an integer array `nums` containing **positive** integers. We define a function `encrypt` such that `encrypt(x)` replaces **every** digit in `x` with the **largest** digit in `x`. For example, `encrypt(523) = 555` and `encrypt(213) = 333`.

Return *the **sum **of encrypted elements*.

**Constraints:**
- `1 <= nums.length <= 50`
- `1 <= nums[i] <= 1000`

---

## 2. Approach: Digit Replacement — O(n·d) ✅

```text
FUNCTION sumOfEncryptedInt(nums):
    total ← 0
    FOR num IN nums DO
        s ← STRING(num)
        maxDigit ← MAX(s)               // highest character digit
        encryptedStr ← REPEAT(maxDigit, LENGTH(s))
        encrypted ← INTEGER(encryptedStr)
        total ← total + encrypted
    RETURN total
```

---

## 3. Examples

**Example 1:**
```
Input: nums = [1,2,3]
Output: 6
Explanation: The encrypted elements are [1,2,3]. The sum of encrypted elements is 1 + 2 + 3 == 6.
```

**Example 2:**
```
Input: nums = [10,21,31]
Output: 66
Explanation: The encrypted elements are [11,22,33]. The sum of encrypted elements is 11 + 22 + 33 == 66.
```

---

## 4. Walkthrough

| Step | Number | Digits | Max Digit | Encrypted | Running Total |
|------|--------|--------|-----------|-----------|---------------|
| 1 | 12 | 1,2 | 2 | 22 | 22 |
| 2 | 23 | 2,3 | 3 | 33 | 55 |

The algorithm converts each integer to a string, finds the maximum character, repeats it to the original length, converts back to integer, and accumulates.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n·d) where *d* is max number of digits (≤4) |
| **Space** | O(1) auxiliary |

---

## 6. Key Takeaway

> Replace every digit with the maximum digit of the number; the encrypted value is simply a repunit of that max digit.
