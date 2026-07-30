# 2160. Minimum Sum of Four Digit Number After Splitting Digits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-sum-of-four-digit-number-after-splitting-digits](https://leetcode.com/problems/minimum-sum-of-four-digit-number-after-splitting-digits)
**Companies:** Amazon, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort Digits — O(1)](#4-approach-sort-digits--o1)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given a 4-digit positive integer `num`, split its digits into two numbers and return their **minimum** possible sum.

**Constraints:**
- `1000 <= num <= 9999`

---

## 2. Examples

```
Example 1:
  Input: num = 2932
  Output: 52
  Explanation: Digits [2,9,3,2] → form 23 + 29 = 52.

Example 2:
  Input: num = 4009
  Output: 13
  Explanation: Digits [4,0,0,9] → form 04 + 09 = 13.
```

---

## 3. Key Insight

> Sort the 4 digits. To minimize the sum of two 2-digit numbers, put the two smallest digits in the tens places: `d[0]*10 + d[2] + d[1]*10 + d[3]`.

---

## 4. Approach: Sort Digits — O(1) ✅

```
FUNCTION minimumSum(num):
    digits = SORT(digits of num)
    RETURN digits[0]*10 + digits[2] + digits[1]*10 + digits[3]
```

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) — only 4 digits |
| **Space** | O(1) |

---

## 6. Key Takeaway

> **Greedy digit placement** — smallest digits go to highest place values. Sort and interleave.
