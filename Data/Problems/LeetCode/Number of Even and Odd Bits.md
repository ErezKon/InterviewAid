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

Return `[even, odd]` where `even` = count of set bits at even indices and `odd` = count at odd indices (0-indexed from LSB).

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 7` (binary `111`) | `[2,1]` | Bits at positions 0 and 2 are set → even count = 2; position 1 is set → odd count = 1 |
| `n = 10` (binary `1010`) | `[1,1]` | Set bits at positions 1 and 3 (odd) and position 2 (even) → even = 1, odd = 1 |

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
