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

Given a positive integer `n`, return the number of the integers in the range `[0, n]` whose binary representations **do not** contain consecutive ones.

**Constraints:**

- `1 <= n <= 10⁹`

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

```
Example 1:
  Input: n = 5
  Output: 5
  Explanation:
  Here are the non-negative integers <= 5 with their corresponding binary representations:
  0 : 0
  1 : 1
  2 : 10
  3 : 11
  4 : 100
  5 : 101
  Among them, only integer 3 disobeys the rule (two consecutive ones) and the other 5 satisfy the rule.
```

```
Example 2:
  Input: n = 1
  Output: 2
```

```
Example 3:
  Input: n = 2
  Output: 3
```

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
