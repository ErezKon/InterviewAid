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

Return the complement of a positive integer (flip all bits in its binary representation, without leading zeros).

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

| Input | Binary | Mask | Output |
|-------|--------|------|--------|
| `5`   | `101`  | `111` (7) | `2` (`010`)
| `1`   | `1`    | `1` (1)   | `0` (`0`)
| `10`  | `1010` | `1111` (15) | `5` (`0101`)

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
