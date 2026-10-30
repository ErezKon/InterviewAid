# 2429. Minimize XOR

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-xor](https://leetcode.com/problems/minimize-xor)
**Companies:** Adobe, Amazon, Bloomberg, Google, Ibm, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two positive integers `num1` and `num2`, find the positive integer `x` such that:

- `x` has the same number of set bits as `num2`, and
- The value `x XOR num1` is **minimal**.

Note that `XOR` is the bitwise XOR operation.

Return *the integer* `x`. The test cases are generated such that `x` is **uniquely determined**.

The number of **set bits** of an integer is the number of `1`'s in its binary representation.

**Constraints:**
- `1 ≤ num1, num2 ≤ 10⁹`

---

## Examples

```
Example 1:
  Input: num1 = 3, num2 = 5
  Output: 3
  Explanation:
  The binary representations of num1 and num2 are 0011 and 0101, respectively.
  The integer 3 has the same number of set bits as num2, and the value 3 XOR 3 = 0 is minimal.
```

```
Example 2:
  Input: num1 = 1, num2 = 12
  Output: 3
  Explanation:
  The binary representations of num1 and num2 are 0001 and 1100, respectively.
  The integer 3 has the same number of set bits as num2, and the value 3 XOR 1 = 2 is minimal.
```

---

## Key Insight

> To minimize XOR with `num1`, match as many set bits as possible. First, set bits where `num1` already has bits set (MSB first — cancels the highest XOR contributions). If more bits needed, set the lowest unset bits.

---

## Approach: Greedy Bit Matching — O(30) ✅

```
FUNCTION minimizeXor(num1, num2):
    targetBits ← POPCOUNT(num2)
    result ← 0

    // Phase 1: Match num1's set bits from MSB down
    FOR bit ← 30 DOWN TO 0 DO
        IF targetBits = 0 THEN BREAK
        IF num1 AND (1 << bit) THEN
            result ← result OR (1 << bit)
            targetBits ← targetBits - 1

    // Phase 2: Fill remaining bits from LSB up
    FOR bit ← 0 TO 30 DO
        IF targetBits = 0 THEN BREAK
        IF NOT (result AND (1 << bit)) THEN
            result ← result OR (1 << bit)
            targetBits ← targetBits - 1

    RETURN result
```

---

## Walkthrough

```
num1 = 25 (11001), num2 = 72 (1001000, 2 set bits)
targetBits = 2

Phase 1 (match num1's bits from MSB):
  bit 4: num1 has 1 → set. result=10000. targetBits=1
  bit 3: num1 has 1 → set. result=11000. targetBits=0

Phase 2: not needed.

result = 24 (11000). XOR = 25 ^ 24 = 1 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy bit matching | **O(30)** | **O(1)** |

---

## Key Takeaway

> **Greedy bit alignment** — to minimize XOR, match the target's set bits with the source's set bits from MSB down (cancels largest contributions), then fill remaining from LSB up (adds smallest contributions).

---
