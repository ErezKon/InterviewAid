# 600. Non-negative Integers without Consecutive Ones

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/non-negative-integers-without-consecutive-ones](https://leetcode.com/problems/non-negative-integers-without-consecutive-ones)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Pocket Gems

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Digit DP / Fibonacci — O(log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count non-negative integers ≤ `n` whose binary representation has **no consecutive ones**.

**Constraints:**
- `0 <= n <= 10⁹`

---

## 2. Key Insight

> The count of k-bit numbers without consecutive 1s follows the Fibonacci sequence. Process bits from MSB to LSB: when a `1` bit is encountered, add `fib[position]` (count of valid numbers with a `0` in that position). If two consecutive `1`s appear, stop early.

---

## 3. Approach: Digit DP / Fibonacci — O(log n) ✅

```
FUNCTION findIntegers(n):
    // Numbers without consecutive 1s in binary follow Fibonacci pattern
    bits = binary representation of n
    fib = [0] * 32
    fib[0] = 1; fib[1] = 2
    FOR i ← 2 TO 31: fib[i] = fib[i-1] + fib[i-2]

    count = 0; prevBit = 0
    FOR i ← len(bits) - 1 DOWN TO 0:
        IF bits[i] == '1':
            count += fib[i]
            IF prevBit == 1: RETURN count    // consecutive 1s
            prevBit = 1
        ELSE:
            prevBit = 0

    RETURN count + 1    // include n itself
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log n) — process each bit |
| **Space** | O(log n) — Fibonacci array |

---

## 5. Key Takeaway

> **Fibonacci + digit DP.** Valid binary strings without consecutive 1s are counted by Fibonacci numbers. Process bits greedily from MSB, accumulating counts when choosing 0 over 1.
