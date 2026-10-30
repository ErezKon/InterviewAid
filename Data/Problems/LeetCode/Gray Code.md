# 89. Gray Code

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/gray-code](https://leetcode.com/problems/gray-code)
**Companies:** Amazon, Bloomberg, Google, Ibm, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bit Formula — O(2ⁿ) ✅](#3-approach-bit-formula--o2n-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

An **n-bit gray code sequence** is a sequence of `2^n` integers where:

- Every integer is in the **inclusive** range `[0, 2^n - 1]`,
- The first integer is `0`,
- An integer appears **no more than once** in the sequence,
- The binary representation of every pair of **adjacent** integers differs by **exactly one bit**, and
- The binary representation of the **first** and **last** integers differs by **exactly one bit**.

Given an integer `n`, return *any valid **n-bit gray code sequence***.

**Constraints:**
- `1 <= n <= 16`

---

## 2. Key Insight

> The i-th Gray code = `i XOR (i >> 1)`. This directly generates the sequence without backtracking.

---

## 3. Approach: Bit Formula — O(2ⁿ) ✅

```text
FUNCTION grayCode(n):
    result ← []
    FOR i ← 0 TO (2^n) - 1:
        APPEND result WITH (i XOR (i RIGHT_SHIFT 1))
    RETURN result
```

---

## 4. Examples

```
Example 1:
  Input: n = 2
  Output: [0,1,3,2]
  Explanation:
  The binary representation of [0,1,3,2] is [00,01,11,10].
  - 00 and 01 differ by one bit
  - 01 and 11 differ by one bit
  - 11 and 10 differ by one bit
  - 10 and 00 differ by one bit
  [0,2,3,1] is also a valid gray code sequence, whose binary representation is [00,10,11,01].
  - 00 and 10 differ by one bit
  - 10 and 11 differ by one bit
  - 11 and 01 differ by one bit
  - 01 and 00 differ by one bit
```
```
Example 2:
  Input: n = 1
  Output: [0,1]
```

---

## 5. Walkthrough

For `n = 2`:

1. `i = 0`: `0 XOR (0>>1) = 0` → `0`
2. `i = 1`: `1 XOR (1>>1) = 1 XOR 0 = 1` → `1`
3. `i = 2`: `2 XOR (2>>1) = 2 XOR 1 = 3` → `3`
4. `i = 3`: `3 XOR (3>>1) = 3 XOR 1 = 2` → `2`

Resulting sequence: `[0,1,3,2]`. Each adjacent pair differs by one bit.

---

## 6. Complexity Analysis

- **Time:** `O(2ⁿ)` – we generate all `2ⁿ` codes.
- **Space:** `O(2ⁿ)` – to store the resulting list.

---

## Key Takeaway

> **G(i) = i ⊕ (i >> 1)** — the reflected binary code formula. O(2ⁿ) to generate all values.
