# 3099. Harshad Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/harshad-number](https://leetcode.com/problems/harshad-number)
**Companies:** Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Digit Sum Check — O(log x) ✅](#2-approach-digit-sum-check---olog-x-)
3. [Key Takeaway](#3-key-takeaway)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

An integer divisible by the **sum** of its digits is said to be a **Harshad** number. You are given an integer `x`. Return *the sum of the digits of* `x` *if* `x` *is a **Harshad** number, otherwise, return* `-1`*.*

**Constraints:**
- `1 <= x <= 100`

---

## 2. Approach: Digit Sum Check — O(log x) ✅

```text
FUNCTION sumOfTheDigitsOfHarshadNumber(x):
    digitSum ← 0
    temp ← x
    WHILE temp > 0:
        digitSum += temp % 10
        temp //= 10
    IF x % digitSum == 0:
        RETURN digitSum
    ELSE:
        RETURN -1
```

---

## 3. Key Takeaway

> Compute digit sum, check divisibility. O(log x) for digit extraction.

---

## 4. Examples

```
Example 1:
  Input: x = 18
  Output: 9
  Explanation: The sum of digits of x is 9. 18 is divisible by 9. So 18 is a Harshad number and the answer is 9.
```
```
Example 2:
  Input: x = 23
  Output: -1
  Explanation: The sum of digits of x is 5. 23 is not divisible by 5. So 23 is not a Harshad number and the answer is -1.
```

---

## 5. Walkthrough

For `x = 18`:
1. Extract digits: `1` and `8` → sum = `9`.
2. `18 % 9 == 0` → Harshad, return `9`.

For `x = 19`:
1. Digits sum = `1 + 9 = 10`.
2. `19 % 10 != 0` → not Harshad, return `-1`.

---

## 6. Complexity Analysis

- **Time:** `O(log x)` – number of digits.
- **Space:** `O(1)` – constant extra variables.

---

## 7. Follow-Up Questions

- How would you modify the algorithm to handle very large numbers given as strings?
- Can you find the next Harshad number greater than a given `x` efficiently?
- What if the definition changes to “divisible by the product of its digits”?