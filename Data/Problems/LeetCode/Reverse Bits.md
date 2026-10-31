# 190. Reverse Bits

**Difficulty:** 🟢 Easy
**Acceptance:** 56.0%
**LeetCode:** [https://leetcode.com/problems/reverse-bits](https://leetcode.com/problems/reverse-bits)
**Companies:** Accenture, Airbnb, Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Nvidia, Qualcomm

---

## Problem Description

Reverse bits of a given 32 bits signed integer.

**Follow up:** If this function is called many times, how would you optimize it?

**Constraints:**
- `0 <= n <= 2^31 - 2`
- `n` is even.

---

## Examples

**Example 1:**
```
Input: n = 43261596
Output: 964176192
Explanation:
  Integer
  Binary
  43261596
  00000010100101000001111010011100
  964176192
  00111001011110000010100101000000
```

**Example 2:**
```
Input: n = 2147483644
Output: 1073741822
Explanation:
  Integer
  Binary
  2147483644
  01111111111111111111111111111100
  1073741822
  00111111111111111111111111111110
```

---

## Approach

```text
FUNCTION reverseBits(n)
    result ← 0
    FOR i ← 0 TO 31 DO
        // Append least-significant bit of n to result
        result ← (result << 1) | (n & 1)
        // Shift n to process next bit
        n ← n >> 1
    END FOR
    RETURN result
END FUNCTION
```

---

## Walkthrough

Take `n = 13` (`00000000000000000000000000001101`).

| i | n (binary)          | result (binary) | Operation                               |
|---|---------------------|-----------------|------------------------------------------|
| 0 | `...1101`           | `0`             | `result = (0 << 1) | (1) = 1`            |
| 1 | `...0110`           | `1`             | `result = (1 << 1) | (0) = 10`           |
| 2 | `...0011`           | `10`            | `result = (10 << 1) | (1) = 101`          |
| 3 | `...0001`           | `101`           | `result = (101 << 1) | (1) = 1011`        |
| … | …                   | …               | Continue until 32 iterations            |

After 32 steps the bits are reversed, yielding `23068672`.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| Time   | O(1) — 32 constant iterations |
| Space  | O(1) — only a few integer variables |

---

## Follow-Up Questions

- How would you adapt the algorithm for a 64-bit integer?
- Can you reverse bits in-place without using a separate `result` variable?

---

## Key Takeaway

> Extract the least-significant bit with `n & 1`, shift the result left, and repeat 32 times; this constant-time loop efficiently reverses all bits of a 32-bit integer.
