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

You are given a **positive** integer `num` consisting of exactly four digits. Split `num` into two new integers `new1` and `new2` by using the **digits** found in `num`. **Leading zeros** are allowed in `new1` and `new2`, and **all** the digits found in `num` must be used.

- For example, given `num = 2932`, you have the following digits: two `2`'s, one `9` and one `3`. Some of the possible pairs `[new1, new2]` are `[22, 93]`, `[23, 92]`, `[223, 9]` and `[2, 329]`.

Return *the **minimum** possible sum of *`new1`* and *`new2`.

**Constraints:**
- `1000 <= num <= 9999`

---

## 2. Examples

**Example 1:**
```
Input: num = 2932
Output: 52
Explanation: Some possible pairs [new1, new2] are [29, 23], [223, 9], etc.
The minimum sum can be obtained by the pair [29, 23]: 29 + 23 = 52.
```

**Example 2:**
```
Input: num = 4009
Output: 13
Explanation: Some possible pairs [new1, new2] are [0, 49], [490, 0], etc.
The minimum sum can be obtained by the pair [4, 9]: 4 + 9 = 13.
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
