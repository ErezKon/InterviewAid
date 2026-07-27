# 476. Number Complement

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-complement](https://leetcode.com/problems/number-complement)
**Companies:** Amazon, Cloudera, Google, Jpmorgan, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask XOR — O(1)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Return the complement of a positive integer (flip all bits in its binary representation, without leading zeros).

---

## 2. Key Insight

> Create a mask of all 1s with the same bit length as `num`. XOR with the mask flips every bit.

---

## 3. Approach: Bitmask XOR — O(1) ✅

```
FUNCTION findComplement(num):
    mask = (1 << num.bit_length()) - 1
    RETURN num ^ mask
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **XOR with all-ones mask flips bits.** `(1 << bitLength) - 1` creates the right-sized mask. Fundamental bit manipulation pattern.
