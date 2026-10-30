# 2595. Number of Even and Odd Bits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-even-and-odd-bits](https://leetcode.com/problems/number-of-even-and-odd-bits)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Bit Iteration — O(log n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a **positive** integer `n`.

Let `even` denote the number of even indices in the binary representation of `n` with value 1.

Let `odd` denote the number of odd indices in the binary representation of `n` with value 1.

Note that bits are indexed from **right to left** in the binary representation of a number.

Return *the array* `[even, odd]`.

**Constraints:**

- `1 <= n <= 1000`

---

## 2. Examples

```
Example 1:
  Input: n = 50
  Output: [1,2]
  Explanation: The binary representation of 50 is 110010.
  It contains 1 on indices 1, 4, and 5.
```

```
Example 2:
  Input: n = 2
  Output: [0,1]
  Explanation: The binary representation of 2 is 10.
  It contains 1 only on index 1.
```

---

## 3. Approach: Bit Iteration — O(log n) ✅

```text
FUNCTION evenOddBit(n):
    SET even ← 0
    SET odd ← 0
    SET i ← 0
    WHILE n > 0:
        IF n & 1 == 1:
            IF i % 2 == 0:
                SET even ← even + 1
            ELSE:
                SET odd ← odd + 1
        SET n ← n >> 1
        SET i ← i + 1
    RETURN [even, odd]
```

---

## 4. Walkthrough

Consider `n = 13` (binary `1101`).

| Step | n (binary) | i (position) | Bit (n & 1) | even | odd |
|------|------------|--------------|------------|------|-----|
| 1 | 1101 | 0 | 1 | 1 | 0 |
| 2 | 110 | 1 | 0 | 1 | 0 |
| 3 | 11 | 2 | 1 | 2 | 0 |
| 4 | 1 | 3 | 1 | 2 | 1 |
| End | 0 | 4 | - | 2 | 1 |

Result `[2,1]` matches the expected output.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to count bits in groups of three (ternary positions)?
2. Can you compute the result for a range of numbers `[L, R]` efficiently?
3. How would you adapt the solution for a 64‑bit integer representation?

---

## 7. Key Takeaway

> **Iterate bits, track position parity.** Simple bit extraction with position tracking.
