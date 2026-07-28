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

"Encrypt" each number by replacing every digit with the maximum digit in that number. Return the sum of all encrypted numbers.

**Constraints:**
- `1 <= nums.length <= 100`
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
Input: nums = [12, 23]
Output: 55
Explanation:
- 12 → max digit 2 → "22" = 22
- 23 → max digit 3 → "33" = 33
Sum = 22 + 33 = 55
```

**Example 2:**
```
Input: nums = [5, 999]
Output: 1004
Explanation:
- 5 → "5" = 5
- 999 → max digit 9 → "999" = 999
Sum = 5 + 999 = 1004
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
