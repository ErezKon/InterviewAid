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

A Harshad number is divisible by the sum of its digits. Return the sum of digits if `x` is Harshad, else -1.

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

| x | Output |
|---|--------|
| `18` | `9` |
| `19` | `-1` |
| `21` | `3` |

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