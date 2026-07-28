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

```text
FUNCTION findIntegers(n):
    // Numbers without consecutive 1s in binary follow Fibonacci pattern
    bits ← binary representation of n (most‑significant to least)
    fib[0] ← 1; fib[1] ← 2
    FOR i ← 2 TO LENGTH(bits) - 1:
        fib[i] ← fib[i-1] + fib[i-2]

    count ← 0
    prevBit ← 0
    FOR i ← LENGTH(bits) - 1 DOWNTO 0:
        IF bits[i] == '1':
            count ← count + fib[i]
            IF prevBit == 1:
                RETURN count    // two consecutive 1s -> stop
            prevBit ← 1
        ELSE:
            prevBit ← 0

    RETURN count + 1    // include n itself if valid
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log n) — process each bit |
| **Space** | O(log n) — Fibonacci array |

---

## 5. Examples

| Input | Output |
|-------|--------|
| `5`   | `5` (numbers: 0,1,2,4,5) |
| `1`   | `2` (0 and 1) |
| `10`  | `8` |

---

## 6. Walkthrough

**Example:** `n = 5` (binary `101`)
1. Pre‑compute `fib`: `[1,2,3,5,...]`.
2. Scan bits from MSB:
   - Bit2 (`1`): add `fib[2] = 3` → `count = 3` (all numbers with leading `0` in this position).
   - `prevBit = 1`.
   - Bit1 (`0`): no addition, `prevBit = 0`.
   - Bit0 (`1`): add `fib[0] = 1` → `count = 4`.
3. End of loop, add 1 for `n` itself (since no consecutive 1s) → `count = 5`.
4. Result matches enumeration `{0,1,2,4,5}`.

---

## 7. Follow-Up Questions

- How would you extend this to count numbers in a range `[L, R]`?
- Can you adapt the method to handle a different forbidden pattern, e.g., no `101` substring?

---

## 8. Key Takeaway

> **Fibonacci + digit DP.** Valid binary strings without consecutive 1s are counted by Fibonacci numbers. Process bits greedily from MSB, accumulating counts when choosing 0 over 1.
