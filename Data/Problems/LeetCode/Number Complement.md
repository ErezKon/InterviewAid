# 476. Number Complement

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-complement](https://leetcode.com/problems/number-complement)
**Companies:** Amazon, Cloudera, Google, Jpmorgan, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask XOR — O(1)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

The **complement** of an integer is the integer you get when you flip all the `0`'s to `1`'s and all the `1`'s to `0`'s in its binary representation.

- For example, The integer `5` is `"101"` in binary and its **complement** is `"010"` which is the integer `2`.

Given an integer `num`, return *its complement*.

**Constraints:**

- `1 <= num < 2^31`

**Note:** This question is the same as 1009: https://leetcode.com/problems/complement-of-base-10-integer/

---

## 2. Key Insight

> Create a mask of all 1s with the same bit length as `num`. XOR with the mask flips every bit.

---

## 3. Approach: Bitmask XOR — O(1) ✅

```text
FUNCTION findComplement(num):
    // Determine number of bits needed for num
    SET bitLength ← FLOOR(LOG2(num)) + 1
    // Build mask with bitLength ones: e.g., for 5 bits -> 11111 (31)
    SET mask ← (1 << bitLength) - 1
    // XOR flips bits where mask has 1s
    RETURN num XOR mask
```

---

## 4. Examples

```
Example 1:
  Input: num = 5
  Output: 2
  Explanation: The binary representation of 5 is 101 (no leading zero bits), and its complement is 010. So you need to output 2.
```

```
Example 2:
  Input: num = 1
  Output: 0
  Explanation: The binary representation of 1 is 1 (no leading zero bits), and its complement is 0. So you need to output 0.
```

---

## 5. Walkthrough

Take `num = 10`:

1. `bitLength = FLOOR(LOG2(10)) + 1 = 4`.
2. `mask = (1 << 4) - 1 = 16 - 1 = 15` → binary `1111`.
3. `num XOR mask = 1010 XOR 1111 = 0101` → decimal `5`.
4. Return `5` as the complement.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) – constant arithmetic operations |
| **Space** | O(1) – only a few scalar variables |

---

## 7. Key Takeaway

> **XOR with an all‑ones mask flips bits.** `(1 << bitLength) - 1` creates the appropriate mask for any positive integer.
